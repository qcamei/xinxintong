<?php
namespace matter\group;
/**
 *
 */
class player_model extends \TMS_MODEL {
	/**
	 * 用户登记（不包括登记数据）
	 *
	 * @param object $app
	 * @param object $user
	 * @param array $options
	 *
	 */
	public function enroll($oApp, $oUser, $aOptions = []) {
		if (is_object($aOptions)) {
			$aOptions = (array) $aOptions;
		}

		if (isset($aOptions['enroll_key'])) {
			$ek = $aOptions['enroll_key'];
		} else {
			$ek = $this->genKey($oApp->siteid, $oApp->id);
		}
		$current = time();
		$aNewPlayer = [
			'aid' => $oApp->id,
			'siteid' => $oApp->siteid,
			'enroll_key' => $ek,
			'userid' => $oUser->uid,
			'nickname' => $this->escape($oUser->nickname),
		];
		$aNewPlayer['enroll_at'] = isset($aOptions['enroll_at']) ? $aOptions['enroll_at'] : $current;
		$aNewPlayer['draw_at'] = isset($aOptions['draw_at']) ? $aOptions['draw_at'] : $current;
		isset($aOptions['round_id']) && $aNewPlayer['round_id'] = $aOptions['round_id'];
		isset($aOptions['round_title']) && $aNewPlayer['round_title'] = $this->escape($aOptions['round_title']);
		isset($aOptions['comment']) && $aNewPlayer['comment'] = $this->escape($aOptions['comment']);
		isset($aOptions['tags']) && $aNewPlayer['tags'] = $this->escape($aOptions['tags']);
		isset($aOptions['referrer']) && $aNewPlayer['referrer'] = $aOptions['referrer'];

		$this->insert('xxt_group_player', $aNewPlayer, false);

		return $ek;
	}
	/**
	 * 保存登记的数据
	 */
	public function setData($oApp, $ek, $data) {
		if (empty($data)) {
			return [true];
		}
		// 处理后的登记记录
		$dbData = new \stdClass;

		$schemasById = [];
		foreach ($oApp->dataSchemas as $schema) {
			$schemasById[$schema->id] = $schema;
		}

		/* 已有的登记数据 */
		$fields = $this->query_vals_ss(['name', 'xxt_group_player_data', "aid='{$oApp->id}' and enroll_key='$ek'"]);

		foreach ($data as $n => $v) {
			if ($n === 'member' && is_object($v)) {
				$dbData->{$n} = $v;
				/* 自定义用户信息 */
				$treatedValue = new \stdClass;
				isset($v->name) && $treatedValue->name = urlencode($v->name);
				isset($v->email) && $treatedValue->email = urlencode($v->email);
				isset($v->mobile) && $treatedValue->mobile = urlencode($v->mobile);
				if (!empty($v->extattr)) {
					$extattr = new \stdClass;
					foreach ($v->extattr as $mek => $mev) {
						$extattr->{$mek} = urlencode($mev);
					}
					$treatedValue->extattr = $extattr;
				}
				$treatedValue = urldecode(json_encode($treatedValue));
			} else {
				if (!isset($schemasById[$n])) {
					continue;
				}
				$schema = $schemasById[$n];
				/**
				 * 插入自定义属性
				 */
				if (is_array($v) && (isset($v[0]->serverId) || isset($v[0]->imgSrc))) {
					/* 上传图片 */
					$treatedValue = array();
					$fsuser = $this->model('fs/user', $oApp->siteid);
					foreach ($v as $img) {
						$rst = $fsuser->storeImg($img);
						if (false === $rst[0]) {
							return $rst;
						}
						$treatedValue[] = $rst[1];
					}
					$treatedValue = implode(',', $treatedValue);
					$dbData->{$n} = $treatedValue;
				} else if ($schema->type === 'score') {
					$dbData->{$n} = $v;
					$treatedValue = json_encode($v);
				} else {
					if (is_string($v)) {
						$treatedValue = $this->escape($v);
					} else if (is_object($v) || is_array($v)) {
						$treatedValue = implode(',', array_keys(array_filter((array) $v, function ($i) {return $i;})));
					} else {
						$treatedValue = $v;
					}
					$dbData->{$n} = $treatedValue;
				}
				if (!empty($fields) && in_array($n, $fields)) {
					$this->update(
						'xxt_group_player_data',
						['value' => $treatedValue],
						['aid' => $oApp->id, 'enroll_key' => $ek, 'name' => $n]
					);
					unset($fields[array_search($n, $fields)]);
				} else {
					$ic = [
						'aid' => $oApp->id,
						'enroll_key' => $ek,
						'name' => $n,
						'value' => $treatedValue,
					];
					$this->insert('xxt_group_player_data', $ic, false);
				}
			}
		}
		// 记录数据
		$dbData = $this->escape($this->toJson($dbData));
		$this->update(
			'xxt_group_player',
			['enroll_at' => time(), 'data' => $dbData],
			['enroll_key' => $ek]
		);

		return [true, $dbData];
	}
	/**
	 * 根据ID返回登记记录
	 */
	public function &byId($aid, $ek, $aOptions = array()) {
		$fields = isset($aOptions['fields']) ? $aOptions['fields'] : '*';
		$cascaded = isset($aOptions['cascaded']) ? $aOptions['cascaded'] : 'Y';

		$q = [
			$fields,
			'xxt_group_player',
			"aid='$aid' and enroll_key='$ek' and state=1",
		];
		if (($record = $this->query_obj_ss($q)) && $cascaded === 'Y') {
			if (!empty($record->data)) {
				$record->data = json_decode($record->data);
			}
			if (!empty($record->role_rounds)) {
				$record->role_rounds = json_decode($record->role_rounds);
			} else {
				$record->role_rounds = [];
			}
		}

		return $record;
	}
	/**
	 * 根据ID返回登记记录
	 *
	 * @param string $ek 因为分组活动的用户有可能是从其他活动导入的，使用的是导入记录的ek，因为有可能一个ek导入到多个分组活动中
	 * @param string $aid 分组活动的id。如果指定只返回单条记录，如果不指定返回数据
	 *
	 */
	public function byEnrollKey($ek, $aid = null, $aOptions = []) {
		$fields = isset($aOptions['fields']) ? $aOptions['fields'] : '*';
		$cascaded = isset($aOptions['cascaded']) ? $aOptions['cascaded'] : 'Y';

		$q = [
			$fields,
			'xxt_group_player',
			["enroll_key" => $ek, "state" => 1],
		];
		if (empty($aid)) {
			$records = $this->query_objs_ss($q);
			if (count($records) && $cascaded === 'Y') {
				if ($fields === '*' || false !== strpos($fields, 'data') || false !== strpos($fields, 'role_rounds')) {
					foreach ($records as &$record) {
						if (!empty($record->data)) {
							$record->data = json_decode($record->data);
						}
						if (!empty($record->role_rounds)) {
							$record->role_rounds = json_decode($record->role_rounds);
						} else {
							$record->role_rounds = [];
						}
					}
				}
			}
			return $records;
		} else {
			$q[2]['aid'] = $aid;
			if (($record = $this->query_obj_ss($q)) && $cascaded === 'Y') {
				if ($fields === '*' || false !== strpos($fields, 'data') || false !== strpos($fields, 'role_rounds')) {
					if (!empty($record->data)) {
						$record->data = json_decode($record->data);
					}
					if (!empty($record->role_rounds)) {
						$record->role_rounds = json_decode($record->role_rounds);
					} else {
						$record->role_rounds = [];
					}
				}
			}
			return $record;
		}

	}
	/**
	 * 获得指定项目下的登记记录
	 *
	 * @param int $missionId
	 */
	public function &byMission($missionId, $aOptions) {
		$fields = isset($aOptions['fields']) ? $aOptions['fields'] : '*';
		$q = [
			$fields,
			'xxt_group_player r',
		];
		$missionId = $this->escape($missionId);
		$where = "state=1 and exists(select 1 from xxt_group g where r.aid=g.id and g.mission_id={$missionId})";

		if (isset($aOptions['userid'])) {
			$where .= " and userid='" . $this->escape($aOptions['userid']) . "'";
		}
		$q[2] = $where;

		$list = $this->query_objs_ss($q);
		if (count($list)) {
			if ($fields === '*' || strpos($fields, 'data') !== false || strpos($fields, 'role_rounds') !== false) {
				foreach ($list as &$record) {
					if (!empty($record->data)) {
						$record->data = json_decode($record->data);
					}
					if (!empty($record->role_rounds)) {
						$record->role_rounds = json_decode($record->role_rounds);
					} else {
						$record->role_rounds = [];
					}
				}
			}
		}

		return $list;
	}
	/**
	 * 根据指定的数据查找匹配的记录
	 */
	public function byData($oApp, $data, $aOptions = []) {
		$fields = isset($aOptions['fields']) ? $aOptions['fields'] : '*';
		$records = false;

		// 查找条件
		$whereByData = '';
		foreach ($data as $k => $v) {
			if ($k === '_round_id') {
				$whereByData .= ' and (';
				$whereByData .= 'round_id="' . $v . '"';
				$whereByData .= ')';
			} else {
				if (!empty($v)) {
					/* 通讯录字段简化处理 */
					if (strpos($k, 'member.') === 0) {
						$k = str_replace('member.', '', $k);
					}
					$whereByData .= ' and (';
					$whereByData .= 'data like \'%"' . $k . '":"' . $v . '"%\'';
					$whereByData .= ' or data like \'%"' . $k . '":"%,' . $v . '"%\'';
					$whereByData .= ' or data like \'%"' . $k . '":"%,' . $v . ',%"%\'';
					$whereByData .= ' or data like \'%"' . $k . '":"' . $v . ',%"%\'';
					$whereByData .= ')';
				}
			}
		}

		// 没有指定条件时就认为没有符合条件的记录
		if (empty($whereByData)) {
			return $records;
		}

		// 查找匹配条件的数据
		$q = [
			$fields,
			'xxt_group_player',
			"state=1 and aid='{$oApp->id}' $whereByData",
		];
		$records = $this->query_objs_ss($q);
		foreach ($records as &$record) {
			if (empty($record->data)) {
				$record->data = new \stdClass;
			} else {
				$data = json_decode($record->data);
				if ($data === null) {
					$record->data = 'json error(' . json_last_error() . '):' . $r->data;
				} else {
					$record->data = $data;
				}
			}
			if (empty($record->role_rounds)) {
				$record->role_rounds = [];
			} else {
				$record->role_rounds = json_decode($record->role_rounds);
			}
		}

		return $records;
	}
	/**
	 * 用户清单
	 *
	 * return
	 * [0] 数据列表
	 * [1] 数据总条数
	 */
	public function byApp($oApp, $oOptions = null) {
		if (is_string($oApp)) {
			$oApp = (object) ['id' => $oApp];
		}
		if ($oOptions) {
			is_array($oOptions) && $oOptions = (object) $oOptions;
			$orderby = isset($oOptions->orderby) ? $oOptions->orderby : '';
			$page = isset($oOptions->page) ? $oOptions->page : null;
			$size = isset($oOptions->size) ? $oOptions->size : null;
			$kw = isset($oOptions->kw) ? $oOptions->kw : null;
			$by = isset($oOptions->by) ? $oOptions->by : null;
		}
		$fields = isset($oOptions->fields) ? $oOptions->fields : 'enroll_key,enroll_at,comment,tags,data,userid,nickname,is_leader,round_id,round_title,role_rounds';

		$oResult = new \stdClass; // 返回的结果
		$oResult->total = 0;
		/* 数据过滤条件 */
		$w = "state=1 and aid='{$oApp->id}'";
		/*tags*/
		if (!empty($oOptions->tags)) {
			$aTags = explode(',', $oOptions->tags);
			foreach ($aTags as $tag) {
				$w .= " and concat(',',tags,',') like '%,$tag,%'";
			}
		}
		if (isset($oOptions->roleRoundId) && ($oOptions->roleRoundId == '' || $oOptions->roleRoundId == 'pending')) {
			$w .= " and role_rounds = ''";
		} else if (isset($oOptions->roleRoundId) && (strcasecmp($oOptions->roleRoundId, 'all') !== 0)) {
			$w .= " and role_rounds like '%\"" . $oOptions->roleRoundId . "\"%' and userid <> ''";
		}
		if (isset($oOptions->roundId) && ($oOptions->roundId == '' || $oOptions->roundId == 'pending')) {
			$w .= " and round_id = ''";
		} else if (isset($oOptions->roundId) && (strcasecmp($oOptions->roundId, 'all') !== 0)) {
			$w .= " and round_id = '" . $oOptions->roundId . "' and userid <> ''";
		}
		$q = [
			$fields,
			'xxt_group_player',
			$w,
		];
		/* 分页参数 */
		if (isset($page)) {
			$q2 = [
				'r' => ['o' => ($page - 1) * $size, 'l' => $size],
			];
		}
		/* 排序 */
		$q2['o'] = 'round_id asc,enroll_at desc';
		if ($players = $this->query_objs_ss($q, $q2)) {
			/* record data */
			if ($fields === '*' || false !== strpos($fields, 'data') || false !== strpos($fields, 'role_rounds')) {
				foreach ($players as &$player) {
					if (!empty($player->data)) {
						$player->data = json_decode($player->data);
					}
					if (!empty($player->role_rounds)) {
						$player->role_rounds = json_decode($player->role_rounds);
					} else {
						$player->role_rounds = [];
					}
				}
			}

			$oResult->players = $players;
			/* total */
			$q[0] = 'count(*)';
			$total = (int) $this->query_val_ss($q);
			$oResult->total = $total;
		}

		return $oResult;
	}
	/**
	 * 获得用户的登记
	 */
	public function byUser($oApp, $userid, $aOptions = []) {
		if (empty($userid)) {
			return false;
		}

		$fields = isset($aOptions['fields']) ? $aOptions['fields'] : '*';
		$q = [
			$fields,
			'xxt_group_player',
			['state' => 1, 'aid' => $oApp->id, 'userid' => $userid],
		];
		$q2 = ['o' => 'enroll_at desc'];

		$list = $this->query_objs_ss($q, $q2);
		if (count($list)) {
			if ($fields === '*' || false !== strpos($fields, 'role_rounds')) {
				foreach ($list as &$player) {
					if (!empty($player->role_rounds)) {
						$player->role_rounds = json_decode($player->role_rounds);
					} else {
						$player->role_rounds = [];
					}
				}
			}
		}
		if (isset($aOptions['onlyOne']) && $aOptions['onlyOne'] === true) {
			if (count($list)) {
				return $list[0];
			} else {
				return false;
			}
		}

		return $list;
	}
	/**
	 * 生成活动登记的key
	 */
	public function genKey($siteId, $aid) {
		return md5(uniqid() . $siteId . $aid);
	}
	/**
	 *
	 */
	public function modify($ek, $data) {
		$rst = $this->update(
			'xxt_group_player',
			$data,
			"enroll_key='$ek'"
		);
		return $rst;
	}
	/**
	 * 删除一个分组用户
	 *
	 * @param string $appId
	 * @param string $ek
	 */
	public function remove($appId, $ek, $byDelete = false) {
		if ($byDelete) {
			$rst = $this->delete(
				'xxt_group_player_data',
				"aid='$appId' and enroll_key='$ek'"
			);
			$rst = $this->delete(
				'xxt_group_player',
				"aid='$appId' and enroll_key='$ek'"
			);
		} else {
			$rst = $this->update(
				'xxt_group_player_data',
				array('state' => 100),
				"aid='$appId' and enroll_key='$ek'"
			);
			$rst = $this->update(
				'xxt_group_player',
				array('state' => 100),
				"aid='$appId' and enroll_key='$ek'"
			);
		}

		return $rst;
	}
	/**
	 * 清除所有登记记录
	 *
	 * @param string $appId
	 */
	public function clean($appId, $byDelete = false) {
		if ($byDelete) {
			$rst = $this->delete(
				'xxt_group_player_data',
				"aid='$appId'"
			);
			$rst = $this->delete(
				'xxt_group_player',
				"aid='$appId'"
			);
		} else {
			$rst = $this->update(
				'xxt_group_player_data',
				array('state' => 0),
				"aid='$appId'"
			);
			$rst = $this->update(
				'xxt_group_player',
				array('state' => 0),
				"aid='$appId'"
			);
		}

		return $rst;
	}
	/**
	 * 移出分组 （团队分组）
	 */
	public function quitGroup($appId, $ek) {
		$rst = $this->update(
			'xxt_group_player',
			[
				'round_id' => 0,
				'round_title' => '',
			],
			["aid" => $appId, "enroll_key" => $ek]
		);

		return $rst;
	}
	/**
	 * 移入分组 （团队分组）
	 */
	public function joinGroup($appId, $oRound, $ek) {
		$rst = 0;
		switch ($oRound->round_type) {
		case 'T':
			$rst = $this->update(
				'xxt_group_player',
				[
					'round_id' => $oRound->round_id,
					'round_title' => $oRound->title,
				],
				["aid" => $appId, "enroll_key" => $ek]
			);
			break;
		case 'R':
			$oUser = $this->byEnrollKey($ek, $appId, ['fields' => 'role_rounds']);
			if ($oUser && !in_array($oRound->round_id, $oUser->role_rounds)) {
				$oUser->role_rounds[] = $oRound->round_id;
				$rst = $this->update(
					'xxt_group_player',
					[
						'role_rounds' => json_encode($oUser->role_rounds),
					],
					["aid" => $appId, "enroll_key" => $ek]
				);
			}
			break;
		}

		return $rst;
	}
	/**
	 * 有资格参加指定轮次分组的用户(团队分组)
	 */
	public function &pendings($appId) {
		/* 没有抽中过的用户 */
		$q = [
			'id,enroll_key,nickname,userid,enroll_at,data,tags,comment,role_rounds',
			'xxt_group_player',
			"aid='$appId' and state=1 and round_id=0",
		];
		$q2['o'] = 'enroll_at desc';
		/* 获得用户的登记数据 */
		if (($players = $this->query_objs_ss($q, $q2)) && !empty($players)) {
			foreach ($players as &$player) {
				if (!empty($player->data)) {
					$player->data = json_decode($player->data);
				}
				if (!empty($player->role_rounds)) {
					$player->role_rounds = json_decode($player->role_rounds);
				} else {
					$player->role_rounds = [];
				}
			}
		}

		return $players;
	}
	/**
	 * 没有参加角色分组的用户(角色分组)
	 */
	public function &pendingsRole($appId) {
		/* 没有抽中过的用户 */
		$q = [
			'id,enroll_key,nickname,userid,enroll_at,data,tags,comment,role_rounds',
			'xxt_group_player',
			"aid='$appId' and state=1 and (role_rounds = '' or role_rounds = '[]')",
		];
		$q2['o'] = 'enroll_at desc';
		/* 获得用户的登记数据 */
		if (($players = $this->query_objs_ss($q, $q2)) && !empty($players)) {
			foreach ($players as &$player) {
				if (!empty($player->data)) {
					$player->data = json_decode($player->data);
				}
				if (!empty($player->role_rounds)) {
					$player->role_rounds = json_decode($player->role_rounds);
				} else {
					$player->role_rounds = [];
				}
			}
		}

		return $players;
	}
	/**
	 * 指定分组内的用户(团队分组)
	 */
	public function &byRound($appId, $rid = null, $aOptions = []) {
		$fields = isset($aOptions['fields']) ? $aOptions['fields'] : '*';
		$q = [
			$fields,
			'xxt_group_player',
			"aid='$appId' and state=1",
		];
		if (empty($rid)) {
			$q[2] .= " and round_id<>''";
		} else {
			$q[2] .= " and round_id='$rid'";
		}
		$q2 = ['o' => 'round_id,draw_at'];

		if ($players = $this->query_objs_ss($q, $q2)) {
			if ($fields === '*' || false !== strpos($fields, 'data') || false !== strpos($fields, 'role_rounds')) {
				foreach ($players as $oPlayer) {
					if (!empty($oPlayer->data)) {
						$oPlayer->data = json_decode($oPlayer->data);
					}
					if (!empty($oPlayer->role_rounds)) {
						$oPlayer->role_rounds = json_decode($oPlayer->role_rounds);
					} else {
						$oPlayer->role_rounds = [];
					}
				}
			}
		}

		return $players;
	}
	/**
	 * 指定角色分组内的用户(角色分组)
	 */
	public function &byRoleRound($appId, $rid = null, $aOptions = []) {
		$fields = isset($aOptions['fields']) ? $aOptions['fields'] : '*';
		$q = [
			$fields,
			'xxt_group_player',
			"aid='$appId' and state=1",
		];
		if (!empty($rid)) {
			$q[2] .= " and role_rounds like '%\"" . $rid . "\"%'";
		} else {
			$q[2] .= " and (role_rounds <> '' or role_rounds <> '[]'";
		}
		$q2 = ['o' => 'round_id,draw_at'];

		if ($players = $this->query_objs_ss($q, $q2)) {
			if ($fields === '*' || false !== strpos($fields, 'data') || false !== strpos($fields, 'role_rounds')) {
				foreach ($players as $oPlayer) {
					if (!empty($oPlayer->data)) {
						$oPlayer->data = json_decode($oPlayer->data);
					}
					if (!empty($oPlayer->role_rounds)) {
						$oPlayer->role_rounds = json_decode($oPlayer->role_rounds);
					} else {
						$oPlayer->role_rounds = [];
					}
				}
			}
		}

		return $players;
	}
	/**
	 * 获得分组内用户的数量（团队分组）
	 */
	public function countByRound($appId, $rid) {
		$q = [
			'count(*)',
			'xxt_group_player',
			['aid' => $appId, 'round_id' => $rid, 'state' => 1],
		];
		$cnt = (int) $this->query_val_ss($q);

		return $cnt;
	}
	/**
	 * 获得角色分组内用户的数量（角色分组）
	 */
	public function countByRoleRound($appId, $rid) {
		$q = [
			'count(*)',
			'xxt_group_player',
			"aid = '{$appId}' and state = 1 and role_rounds like '%\"" . $rid . "\"%'",
		];
		$cnt = (int) $this->query_val_ss($q);

		return $cnt;
	}
	/**
	 * 从通讯录中导入数据
	 */
	public function assocWithMschema($oGrpApp, $mschemaId, $sync = 'N') {
		$modelMsc = $this->model('site\user\memberschema');

		$oMschema = $modelMsc->byId($mschemaId);
		$dataSchemas = [];
		if ($oMschema->attr_mobile[0] === '0') {
			$dataSchema = new \stdClass;
			$dataSchema->id = 'ms_' . $mschemaId . '_mobile';
			$dataSchema->type = 'shorttext';
			$dataSchema->title = '手机号';
			$dataSchema->format = 'mobile';
			$dataSchemas[] = $dataSchema;
		}
		if ($oMschema->attr_mobile[0] === '0') {
			$dataSchema = new \stdClass;
			$dataSchema->id = 'ms_' . $mschemaId . '_email';
			$dataSchema->type = 'shorttext';
			$dataSchema->title = '电子邮件';
			$dataSchema->format = 'email';
			$dataSchemas[] = $dataSchema;
		}
		if ($oMschema->attr_mobile[0] === '0') {
			$dataSchema = new \stdClass;
			$dataSchema->id = 'ms_' . $mschemaId . '_name';
			$dataSchema->type = 'shorttext';
			$dataSchema->title = '姓名';
			$dataSchema->format = 'name';
			$dataSchemas[] = $dataSchema;
		}
		$extDataSchemas = [];
		if (!empty($oMschema->extAttrs)) {
			foreach ($oMschema->extAttrs as $ea) {
				$dataSchema = new \stdClass;
				foreach ($ea as $key => $val) {
					$dataSchema->{$key} = $val;
				}
				$extDataSchemas[] = $dataSchema;
			}
		}

		$oMschema->data_schemas = array_merge($dataSchemas, $extDataSchemas);

		/* 导入活动定义 */
		$this->update(
			'xxt_group',
			[
				'last_sync_at' => 0,
				'source_app' => '{"id":"' . $mschemaId . '","type":"mschema"}',
				'data_schemas' => $this->toJson($oMschema->data_schemas),
			],
			['id' => $oGrpApp->id]
		);
		/* 清空已有分组数据 */
		$this->clean($oGrpApp->id, true);
		/* 获取所有登记数据 */
		// $modelMem = $this->model('site\user\member');
		// $members = $modelMem->byMschema($mschemaId);
		// /* 导入数据 */
		// if (count($members)) {
		// 	$modelGrp = $this->model('matter\group');
		// 	$objGrp = $modelGrp->byId($oGrpApp->id, ['cascaded' => 'N']);
		// 	$aOptions = ['cascaded' => 'Y'];
		// 	$modelUsr = $this->model('site\user\account');
		// 	foreach ($members as $oMember) {
		// 		$oSiteUser = $modelUsr->byId($oMember->userid);
		// 		$oUser = new \stdClass;
		// 		$oUser->uid = $oMember->userid;
		// 		$oUser->nickname = $modelUsr->escape($oSiteUser->nickname);
		// 		$this->enroll($objGrp, $oUser, ['enroll_key' => $oMember->id, 'enroll_at' => $oMember->create_at]);
		// 		$data = new \stdClass;
		// 		foreach ($dataSchemas as $ds) {
		// 			$data->{$ds->id} = isset($oMember->{$ds->format}) ? $oMember->{$ds->format} : '';
		// 		}
		// 		if (count($extDataSchemas) && !empty($oMember->extattr)) {
		// 			$oExtData = json_decode($oMember->extattr);
		// 			foreach ($extDataSchemas as $ds) {
		// 				$data->{$ds->id} = isset($oExtData->{$ds->id}) ? $oExtData->{$ds->id} : '';
		// 			}
		// 		}
		// 		$this->setData($objGrp, $oMember->id, $data);
		// 	}
		// }

		return $oMschema;
	}
	/**
	 * 关联报名活动数据
	 */
	public function assocWithEnroll($oGrpApp, $byApp) {
		$modelEnl = $this->model('matter\enroll');

		$oSourceApp = $modelEnl->byId($byApp, ['fields' => 'id,data_schemas,assigned_nickname', 'cascaded' => 'N']);
		$aDataSchemas = $oSourceApp->dataSchemas;

		/* 移除题目中和其他活动、通讯录的关联信息 */
		$modelEnl->replaceAssocSchema($aDataSchemas);
		$modelEnl->replaceMemberSchema($aDataSchemas, null, true);

		/* 导入活动定义 */
		$this->update(
			'xxt_group',
			[
				'last_sync_at' => 0,
				'source_app' => '{"id":"' . $byApp . '","type":"enroll"}',
				'data_schemas' => $this->escape($this->toJson($aDataSchemas)),
				'assigned_nickname' => $oSourceApp->assignedNickname,
			],
			['id' => $oGrpApp->id]
		);
		$oGrpApp->dataSchemas = $oSourceApp->dataSchemas;
		/* 清空已有分组数据 */
		$this->clean($oGrpApp->id, true);

		/* 获取所有登记数据 */
		// $q = [
		// 	'enroll_key',
		// 	'xxt_enroll_record',
		// 	['aid' => $byApp, 'state' => 1],
		// ];
		// $eks = $this->query_vals_ss($q);
		// /* 导入数据 */
		// if (!empty($eks)) {
		// 	$modelRec = $this->model('matter\enroll\record');
		// 	$aOptions = ['cascaded' => 'Y'];
		// 	foreach ($eks as $ek) {
		// 		$oRecord = $modelRec->byId($ek, $aOptions);
		// 		$oUser = new \stdClass;
		// 		$oUser->uid = $oRecord->userid;
		// 		$oUser->nickname = $oRecord->nickname;
		// 		$this->enroll($oGrpApp, $oUser, ['enroll_key' => $ek, 'enroll_at' => $oRecord->enroll_at]);
		// 		$this->setData($oGrpApp, $ek, $oRecord->data);
		// 	}
		// }

		return $oSourceApp;
	}
	/**
	 * 从签到活动导入数据
	 * 如果指定了包括报名数据，只需要从报名活动中导入登记项的定义，签到时已经自动包含了报名数据
	 */
	public function assocWithSignin($oGrpApp, $byApp, $includeEnroll = 'Y') {
		$modelSignin = $this->model('matter\signin');
		$oSourceApp = $modelSignin->byId($byApp, ['fields' => 'entry_rule,data_schemas,assigned_nickname', 'cascaded' => 'N']);
		$aSourceDataSchemas = $oSourceApp->dataSchemas;
		/**
		 * 导入报名数据，需要合并签到和报名的登记项
		 */
		if ($includeEnroll === 'Y') {
			if (!empty($oSourceApp->entryRule->enroll->id)) {
				$modelEnl = $this->model('matter\enroll');
				$enrollApp = $modelEnl->byId($oSourceApp->entryRule->enroll->id, ['fields' => 'data_schemas', 'cascaded' => 'N']);
				$diff = array_udiff($enrollApp->dataSchemas, $aSourceDataSchemas, create_function('$a,$b', 'return strcmp($a->id,$b->id);'));
				$aSourceDataSchemas = array_merge($aSourceDataSchemas, $diff);
			}
		}

		/* 移除题目中和其他活动、通讯录的关联信息 */
		$modelSignin->replaceAssocSchema($aSourceDataSchemas);
		$modelSignin->replaceMemberSchema($aSourceDataSchemas, null, true);

		/* 导入活动定义 */
		$this->update(
			'xxt_group',
			[
				'last_sync_at' => 0,
				'source_app' => '{"id":"' . $byApp . '","type":"signin"}',
				'data_schemas' => $this->escape($this->toJson($aSourceDataSchemas)),
				'assigned_nickname' => $oSourceApp->assigned_nickname,
			],
			['id' => $oGrpApp->id]
		);
		$oGrpApp->dataSchemas = $aSourceDataSchemas;

		/* 清空已有数据 */
		$this->clean($oGrpApp->id, true);

		return $oSourceApp;
	}
	/**
	 * 从信息墙导入数据
	 * $onlySpeaker 是否为发言的用户
	 */
	public function assocWithWall($oGrpApp, $byApp, $onlySpeaker) {
		$modelWall = $this->model('matter\wall');
		$oSourceApp = $modelWall->byId($byApp, ['fields' => 'data_schemas']);
		$aSourceDataSchemas = $oSourceApp->dataSchemas;

		/* 移除题目中和其他活动、通讯录的关联信息 */
		$modelWall->replaceAssocSchema($aSourceDataSchemas);
		$modelWall->replaceMemberSchema($aSourceDataSchemas, null, true);

		/* 导入活动定义 */
		$this->update(
			'xxt_group',
			[
				'last_sync_at' => 0,
				'source_app' => '{"id":"' . $byApp . '","type":"wall"}',
				'data_schemas' => $this->escape($this->toJson($aSourceDataSchemas)),
			],
			['id' => $oGrpApp->id]
		);
		$oGrpApp->dataSchemas = $aSourceDataSchemas;

		/* 清空已有分组数据 */
		$this->clean($oGrpApp->id, true);

		//获取所有用户数据
		// $u = [
		// 	'*',
		// 	'xxt_wall_enroll',
		// 	"wid = '{$byApp}' and siteid = '{$oGrpApp->siteid}'",
		// ];
		// if ($onlySpeaker === 'Y') {
		// 	$u[2] .= " and last_msg_at>0";
		// }
		// $wallUsers = $this->query_objs_ss($u);
		// /* 导入数据 */
		// if (!empty($wallUsers)) {
		// 	foreach ($wallUsers as $oWallUser) {
		// 		$oWallUser->data = empty($oWallUser->data) ? '' : $this->toJson($oWallUser->data);
		// 		$oUser = new \stdClass;
		// 		$oUser->uid = $oWallUser->userid;
		// 		$oUser->nickname = $oWallUser->nickname;
		// 		$oUser->wx_openid = $oWallUser->wx_openid;
		// 		$oUser->yx_openid = $oWallUser->yx_openid;
		// 		$oUser->qy_openid = $oWallUser->qy_openid;
		// 		$oUser->headimgurl = $oWallUser->headimgurl;
		// 		if (empty($oWallUser->enroll_key)) {
		// 			$ek = $this->genKey($oGrpApp->siteid, $oGrpApp->id);
		// 			$oWallUser->enroll_key = $ek;
		// 		}
		// 		$this->enroll($oGrpApp, $oUser, ['enroll_key' => $oWallUser->enroll_key, 'enroll_at' => $oWallUser->join_at]);
		// 		$this->setData($oGrpApp, $oWallUser->enroll_key, $oWallUser->data);
		// 	}
		// }

		// $oSourceApp->onlySpeaker = $onlySpeaker;

		return $oSourceApp;
	}
	/**
	 * 同步数据
	 */
	public function _syncRecord($siteId, &$objGrp, &$records, &$modelRec, $type = '', $assignRound = '') {
		$this->setOnlyWriteDbConn(true);
		$cnt = 0;
		if (!empty($records)) {
			$aOptions = ['cascaded' => 'Y'];
			foreach ($records as $record) {
				if ($record->state === '1' || $record->state === 'N') {
					if ($type === 'mschema') {
						$record = $this->_getMschData($objGrp, $record->enroll_key);
					} else {
						$record = $modelRec->byId($record->enroll_key, $aOptions);
					}
					$oUser = new \stdClass;
					$oUser->uid = $record->userid;
					$oUser->nickname = $record->nickname;
					if ($oldPlayer = $this->byId($objGrp->id, $record->enroll_key, ['cascaded' => 'N'])) {
						$updata = [];
						if (!empty($assignRound) && is_object($assignRound)) {
							$updata['round_id'] = $assignRound->round_id;
							$updata['round_title'] = $assignRound->title;
						}
						if ($oldPlayer->nickname !== $oUser->nickname) {
							$updata['nickname'] = $oUser->nickname;
						}
						if (!empty($updata)) {
							$this->modify($record->enroll_key, $updata);
						}
						// 已经同步过的用户
						$this->setData($objGrp, $record->enroll_key, $record->data);
					} else {
						// 新用户
						$aOptions2 = ['enroll_key' => $record->enroll_key, 'enroll_at' => $record->enroll_at];
						if (!empty($assignRound) && is_object($assignRound)) {
							$aOptions2['round_id'] = $assignRound->round_id;
							$aOptions2['round_title'] = $assignRound->title;
						}
						$this->enroll($objGrp, $oUser, $aOptions2);
						$this->setData($objGrp, $record->enroll_key, $record->data);
					}
					$cnt++;
				} else {
					// 删除用户
					if ($this->remove($objGrp->id, $record->enroll_key, true)) {
						$cnt++;
					}
				}
			}
		}

		return $cnt;
	}
	/**
	 * 获取通讯录用户的data
	 *
	 */
	public function _getMschData($objGrp, $id) {
		/* 获取变化的登记数据 */
		$modelRec = $this->model('site\user\member');
		$q = [
			'm.id enroll_key,m.modify_at enroll_at,m.name nickname,m.name,m.mobile,m.email,m.extattr,m.forbidden,m.userid,a.wx_openid,a.yx_openid,a.qy_openid,a.headimgurl',
			'xxt_site_member m,xxt_site_account a',
			"m.id = $id and a.uid = m.userid",
		];
		$record = $modelRec->query_obj_ss($q);
		if ($record === false) {
			return new \ResponseError('用户数据未查到');
		}
		if (!empty($record->extattr)) {
			$extattr = json_decode($record->extattr);
			foreach ($extattr as $k => $e) {
				$record->{$k} = $e;
			}
		}

		$dataSchemas = $objGrp->dataSchemas;
		$data = new \stdClass;
		foreach ($dataSchemas as $ds) {
			$data->{$ds->id} = !empty($ds->format) ? $record->{$ds->format} : (!empty($record->{$ds->id}) ? $record->{$ds->id} : '');
		}
		$record->data = $data;
		return $record;
	}
}