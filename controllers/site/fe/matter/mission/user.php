<?php
namespace site\fe\matter\mission;

include_once dirname(dirname(__FILE__)) . '/base.php';
/**
 * 项目用户
 */
class user extends \site\fe\matter\base {
	/**
	 * 获得指定项目的用户排行
	 *
	 * @param int $mission
	 */
	public function rank_action($mission, $page = 1, $size = 36) {
		$oMission = $this->model('matter\mission')->byId($mission, ['fields' => 'id,entry_rule']);
		if (false === $oMission) {
			return new \ObjectNotFoundError();
		}

		/* 如果项目用户名单是分组活动，获得分组信息 */
		if (!empty($oMission->entry_rule->group->id)) {
			$oMisUsrGrpApp = (object) ['id' => $oMission->entry_rule->group->id];
			$modelGrpUsr = $this->model('matter\group\player');
		}

		$modelMisUsr = $this->model('matter\mission\user');

		$fields = 'userid,group_id,nickname,user_total_coin';
		$q = [
			$fields,
			'xxt_mission_user',
			['mission_id' => $oMission->id],
		];
		$q2 = [
			'o' => 'user_total_coin desc',
			'r' => ['o' => ($page - 1) * $size, 'l' => $size],
		];

		$oResult = new \stdClass;
		$oResult->users = $modelMisUsr->query_objs_ss($q, $q2);
		if (count($oResult->users)) {
			$modelGrpRnd = $this->model('matter\group\round');
			$modelSiteAct = $this->model('site\user\account');
			foreach ($oResult->users as $oUser) {
				/* user */
				$oSiteUsr = $modelSiteAct->byId($oUser->userid, ['fields' => 'headimgurl']);
				if ($oSiteUsr) {
					$oUser->headimgurl = $oSiteUsr->headimgurl;
				}
				/* group */
				if (!empty($oUser->group_id)) {
					$oGrpRnd = $modelGrpRnd->byId($oUser->group_id, ['fields' => 'round_title']);
					if ($oGrpRnd) {
						$oUser->group = (object) ['id' => $oEnlUser->group_id, 'title' => $oGrpRnd->round_title];
					}
				} else if (isset($oMisUsrGrpApp)) {
					$oGrpUsr = $modelGrpUsr->byUser($oMisUsrGrpApp, $oUser->userid, ['fields' => 'round_id,round_title', 'onlyOne' => true]);
					if ($oGrpUsr) {
						$oUser->group = (object) ['id' => $oGrpUsr->round_id, 'title' => $oGrpUsr->round_title];
					}
				}
				unset($oUser->group_id);
			}
		}
		$q[0] = 'count(*)';
		$oResult->total = $modelMisUsr->query_val_ss($q);

		return new \ResponseData($oResult);
	}
}