<?php
namespace matter\enroll;

require_once dirname(__FILE__) . '/entity.php';
/**
 * 专题
 */
class topic_model extends entity_model {
	/**
	 * 任务所在的记录活动
	 */
	private $_oApp;

	public function __construct($oApp) {
		$this->_oApp = $oApp;
	}
	/**
	 *
	 */
	public function byId($id, $aOptons = []) {
		$fields = empty($aOptons['fields']) ? '*' : $aOptons['fields'];

		$q = [$fields, 'xxt_enroll_topic', ['id' => $id]];

		$oTopic = $this->query_obj_ss($q);

		return $oTopic;
	}
	/**
	 * 根据任务定义返回任务专题
	 */
	public function byRule($oRule) {
		$oSrcTask = $this->model('matter\enroll\task', $this->_oApp)->byRule($oRule);
		if (false === $oSrcTask) {
			return false;
		}
		$oSrcTopic = $this->byTask($oSrcTask);

		return $oSrcTopic;
	}
	/**
	 * 和活动任务关联的专题
	 */
	public function byTask($oTask, $aOptons = []) {
		$fields = empty($aOptons['fields']) ? '*' : $aOptons['fields'];
		$bCreateIfNone = isset($aOptons['createIfNone']) ? $aOptons['createIfNone'] : true;
		$q = [$fields, 'xxt_enroll_topic', ['task_id' => $oTask->id]];
		$oTopic = $this->query_obj_ss($q);
		if (false === $oTopic && true === $bCreateIfNone) {
			$current = time();
			$oTopic = new \stdClass;
			$oTopic->aid = $this->_oApp->id;
			$oTopic->siteid = $this->_oApp->siteid;
			$oTopic->task_id = $oTask->id;
			$oTopic->create_at = $current;
			$oTopic->userid = '';
			$oTopic->group_id = '';
			$oTopic->title = ['question' => '提问', 'answer' => '回答', 'vote' => '投票', 'score' => '打分'][$oTask->type] . '任务专题（' . date('y年n月d日', $oTask->start_at) . '）';
			//$oTopic->summary = empty($oPosted->summary) ? $oNewTopic->title : $modelEnl->escape($oPosted->summary);
			$oTopic->rec_num = 0;
			$oTopic->id = $this->insert('xxt_enroll_topic', $oTopic, true);
		}

		return $oTopic;
	}
	/**
	 * 返回专题下的记录
	 *
	 * 如果是任务专题，可能需要动态获取任务信息
	 */
	public function records($oTopic) {
		if (!empty($oTopic->task_id)) {
			$oTask = $this->model('matter\enroll\task', $this->_oApp)->byId($oTopic->task_id);
			if ($oTask && $oTask->state === 'IP') {
				/* 任务执行过程中，需要更新任务的专题 */
				$this->_renewByTask($oTopic, $oTask);
			}
		}

		$q = [
			'r.*,tr.assign_at,tr.seq seq_in_topic',
			'xxt_enroll_record r inner join xxt_enroll_topic_record tr on r.id=tr.record_id',
			['tr.topic_id' => $oTopic->id, 'r.state' => 1],
		];
		$q2 = ['o' => 'tr.seq'];

		$records = $this->query_objs_ss($q, $q2);
		if (count($records)) {
			$modelRec = $this->model('matter\enroll\record');
			$modelRec->parse($this->_oApp, $records);
		}

		$oResult = new \stdClass;
		$oResult->records = $records;
		$oResult->total = count($records);

		return $oResult;
	}
	/**
	 * 更新专题中包含的记录
	 */
	private function _renewByTask($oTopic, $oTask) {
		switch ($oTask->config_type) {
		case 'vote':
			$this->_renewByVoteTask($oTopic, $oTask);
			break;
		case 'answer':
			$this->_renewByAnswerTask($oTopic, $oTask);
			break;
		case 'score':
			$this->_renewByScoreTask($oTopic, $oTask);
			break;
		}
	}
	/**
	 * 更新投票任务专题中包含的记录
	 *
	 * @param object $oTopic
	 * @param object $oTask
	 *
	 */
	private function _renewByVoteTask($oTopic, $oTask) {
		if (empty($oTask->rid)) {
			return false;
		}
		if (isset($oTask->source->scope)) {
			/* 指定了数据来源 */
			if (in_array($oTask->source->scope, ['question']) && isset($oTask->source->config)) {
				/* 同轮次中，指定任务专题中的记录 */
				$oRule = (object) ['type' => $oTask->source->scope, 'id' => $oTask->source->config, 'rid' => $oTask->rid];
				$oSrcTopic = $this->byRule($oRule);
				if (false === $oSrcTopic) {
					return false;
				}
				$oTopicRecords = $this->records($oSrcTopic);
				if (!empty($oTopicRecords->records)) {
					$records = $oTopicRecords->records;
				}
			}
		} else {
			/* 任务轮次中的记录 */
			$modelRec = $this->model('matter\enroll\record');
			$records = $modelRec->byRound($oTask->rid, ['fields' => 'id,enroll_at']);
		}
		if (!empty($records)) {
			foreach ($records as $oRecord) {
				$this->assign($oTopic, $oRecord, max($oTask->start_at, $oRecord->enroll_at));
			}
		}

		return true;
	}
	/**
	 * 更新回答任务专题中包含的记录
	 *
	 * @param object $oTopic
	 * @param object $oTask
	 *
	 */
	private function _renewByAnswerTask($oTopic, $oTask) {
		if (empty($oTask->rid)) {
			return false;
		}
		if (isset($oTask->source->scope)) {
			$oTaskSource = $oTask->source;
			/* 指定了数据来源 */
			if (in_array($oTaskSource->scope, ['vote']) && isset($oTaskSource->config)) {
				/* 同轮次中，指定任务专题中的记录 */
				$oSourceRule = $this->model('matter\enroll\task', $this->_oApp)->configById($oTaskSource->scope, $oTaskSource->config);
				if (false === $oSourceRule) {
					return false;
				}
				$oSourceRule->rid = $oTask->rid;
				$oSrcTopic = $this->byRule($oSourceRule);
				if (false === $oSrcTopic) {
					return false;
				}
				if (isset($oTaskSource->limit->mode) && isset($oTaskSource->limit->min) && !empty($oSourceRule->schemas)) {
					switch ($oTaskSource->limit->mode) {
					case 'vote':
						break;
					case 'vote_rank':
						$q = [
							'record_id,vote_num',
							'xxt_enroll_record_data rd',
							['aid' => $this->_oApp->id, 'state' => 1, 'schema_id' => $oSourceRule->schemas],
						];
						$q[2]['enroll_key'] = (object) ['op' => 'exists', 'pat' => 'select 1 from xxt_enroll_topic_record tr where tr.topic_id=' . $oSrcTopic->id . ' and rd.record_id=tr.record_id'];
						$q2 = ['o' => 'vote_num desc'];
						$recdatas = $this->query_objs_ss($q, $q2);
						if (count($recdatas)) {
							$lastRank = 0;
							$lastVoteNum = PHP_INT_MAX;
							$ranked = [];
							foreach ($recdatas as $oRecData) {
								if ($oRecData->vote_num < $lastVoteNum) {
									$lastRank++;
								}
								if ($lastRank > $oTaskSource->limit->min) {
									break;
								}
								$lastVoteNum = $oRecData->vote_num;
								$ranked[] = $oRecData->record_id;
							}
							$modelRec = $this->model('matter\enroll\record');
							$taskRecords = array_map(function ($recId) use ($modelRec) {return $modelRec->byPlainId($recId);}, $ranked);
						}
						break;
					case 'score':
						break;
					case 'score_rank':
						break;
					}
				} else {
					$oTopicRecords = $this->records($oSrcTopic);
					if (!empty($oTopicRecords->records)) {
						$taskRecords = $oTopicRecords->records;
					}
				}
			}
		} else {
			/* 任务轮次中的记录 */
			$modelRec = $this->model('matter\enroll\record');
			$taskRecords = $modelRec->byRound($oTask->rid, ['fields' => 'id,enroll_at']);
		}
		if (!empty($taskRecords)) {
			foreach ($taskRecords as $oRecord) {
				$this->assign($oTopic, $oRecord, max($oTask->start_at, $oRecord->enroll_at));
			}
		}

		return true;
	}
	/**
	 * 更新投票任务专题中包含的记录
	 *
	 * @param object $oTopic
	 * @param object $oTask
	 *
	 */
	private function _renewByScoreTask($oTopic, $oTask) {
		if (isset($oTask->source->scope)) {
			$oTaskSource = $oTask->source;
			/* 指定了数据来源 */
			if (in_array($oTaskSource->scope, ['answer']) && isset($oTaskSource->config)) {
				/* 同轮次中，指定任务专题中的记录 */
				$oSourceRule = $this->model('matter\enroll\task', $this->_oApp)->configById($oTaskSource->scope, $oTaskSource->config);
				if (false === $oSourceRule) {
					return false;
				}
				$oSourceRule->rid = $oTask->rid;
				$oSrcTopic = $this->byRule($oSourceRule);
				if (false === $oSrcTopic) {
					return false;
				}
				$oTopicRecords = $this->records($oSrcTopic);
				if (!empty($oTopicRecords->records)) {
					$taskRecords = $oTopicRecords->records;
				}
			}
		} else {
			/* 任务轮次中的记录 */
			$modelRec = $this->model('matter\enroll\record');
			$taskRecords = $modelRec->byRound($oTask->rid, ['fields' => 'id,enroll_at']);
		}
		if (!empty($taskRecords)) {
			foreach ($taskRecords as $oRecord) {
				$this->assign($oTopic, $oRecord, max($oTask->start_at, $oRecord->enroll_at));
			}
		}

		return true;
	}
	/**
	 * 将记录放入专题
	 *
	 * @param object $oTopic[id]
	 * @param object $oRecord[id]
	 *
	 */
	public function assign($oTopic, $oRecord, $assignAt = null) {
		$q = ['topic_id', 'xxt_enroll_topic_record', ['record_id' => $oRecord->id]];
		$aBeforeTopicIds = $this->query_vals_ss($q);
		if (in_array($oTopic->id, $aBeforeTopicIds)) {
			return [false, '已经在专题中，不能重复添加'];
		}

		$q = ['max(seq)', 'xxt_enroll_topic_record', ['topic_id' => $oTopic->id]];
		$maxSeq = (int) $this->query_val_ss($q);

		/* 新指定的专题 */
		$oNewRel = new \stdClass;
		$oNewRel->aid = $this->_oApp->id;
		$oNewRel->siteid = $this->_oApp->siteid;
		$oNewRel->record_id = $oRecord->id;
		$oNewRel->assign_at = empty($assignAt) ? time() : $assignAt;
		$oNewRel->topic_id = $oTopic->id;
		$oNewRel->seq = $maxSeq + 1;
		$this->insert('xxt_enroll_topic_record', $oNewRel, false);

		$this->update(
			'xxt_enroll_topic',
			['rec_num' => (object) ['op' => '+=', 'pat' => 1]],
			['id' => $oTopic->id]
		);

		return true;
	}
}