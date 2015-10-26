<?php
namespace op\merchant;

require_once dirname(dirname(dirname(__FILE__))) . '/member_base.php';
/**
 * 订单
 */
class order extends \member_base {
	/**
	 *
	 */
	public function get_access_rule() {
		$rule_action['rule_type'] = 'black';
		$rule_action['actions'] = array();

		return $rule_action;
	}
	/**
	 *
	 */
	public function index_action($mpid = null, $shop = null, $order = null) {
		\TPL::output('/op/merchant/order');
		exit;
	}
	/**
	 *
	 */
	public function pageGet_action($mpid, $shop) {
		// current visitor
		$user = $this->getUser($mpid);
		// page
		$page = $this->model('app\merchant\page')->byType($shop, 'op.order');
		if (empty($page)) {
			return new \ResponseError('没有获得订单页定义');
		}
		$page = $page[0];

		$params = array(
			'user' => $user,
			'page' => $page,
		);

		return new \ResponseData($params);
	}
	/**
	 * 查看订单
	 */
	public function get_action($mpid, $order) {
		//$fan = $this->getCookieOAuthUser($mpid);
		//if (empty($fan->openid))
		//    return new \ResponseError('无法获得当前用户身份信息');
		//
		$order = $this->model('app\merchant\order')->byId($order);
		$skus = $order->skus;

		/*按分类和商品对sku进行分组*/
		$catelogs = array();
		if (!empty($skus)) {
			$cateSkus = array();
			$modelCate = $this->model('app\merchant\catelog');
			$modelProd = $this->model('app\merchant\product');
			$modelSku = $this->model('app\merchant\sku');
			$cateFields = 'id,sid,name';
			$prodFields = 'id,sid,cate_id,name,main_img,img,detail_text,detail_text,prop_value,buy_limit,sku_info';
			$skuFields = 'id,sid,cate_id,cate_sku_id,icon_url,price,ori_price,quantity,validity_begin_at,validity_end_at,sku_value';
			foreach ($skus as &$sku) {
				if (!isset($catelogs[$sku->cate_id])) {
					/*catelog*/
					$catelog = $modelCate->byId($sku->cate_id, array('fields' => $cateFields, 'cascaded' => 'Y'));
					$catelog->products = array();
					$catelogs[$catelog->id] = &$catelog;
					/*product*/
					$product = $modelProd->byId($sku->prod_id, array('cascaded' => 'N', 'fields' => $prodFields, 'catelog' => $catelog));
					$product->skus = array();
					$catelog->products[$product->id] = &$product;
				} else {
					$catelog = &$catelogs[$sku->cate_id];
					if (!isset($catelog->products[$sku->prod_id])) {
						$product = $modelProd->byId($sku->prod_id, array('cascaded' => 'N', 'fields' => $prodFields, 'catelog' => $catelog));
						$product->skus = array();
						$catelog->products[$product->id] = &$product;
					} else {
						$product = $catelog->products[$sku->prod_id];
					}
				}
				if (isset($cateSkus[$sku->cate_sku_id])) {
					$cateSku = $cateSkus[$sku->cate_sku_id];
				} else {
					$cateSku = $modelCate->skuById($sku->cate_sku_id);
					$cateSkus[$sku->cate_sku_id] = $cateSku;
				}
				$product->skus[] = $modelSku->byId($sku->sku_id, array('cascaded' => 'Y', 'fields' => $skuFields, 'cateSku' => $cateSku));
			}
		}

		return new \ResponseData(array('order' => $order, 'catelogs' => $catelogs));
	}
	/**
	 * 保存订单反馈信息并通知用户
	 */
	public function feedback_action($mpid, $shop, $order) {
		$order = $this->model('app\merchant\order')->byId($order);
		$order->extPropValue = json_decode($order->ext_prop_value);

		$feedback = $this->getPostJson();

		if (empty($feedback)) {
			$pv = '{}';
		} else {
			$pv = new \stdClass;
			foreach ($feedback as $k => $v) {
				$pv->{$k} = urlencode($v);
			}
			$pv = urldecode(json_encode($pv));
		}
		$rst = $this->model()->update(
			'xxt_merchant_order',
			array('feedback' => $pv),
			"id=$order->id"
		);
		/*发通知*/
		$order->feedback = json_decode($pv);
		$this->notify($mpid, $order);

		return new \ResponseData($rst);
	}
	/**
	 * 通知客服有新订单
	 */
	public function notify($mpid, $order) {
		/**/
		$product = $this->model('app\merchant\product')->byId($order->product_id, 'Y');
		$modelTmpl = $this->model('matter\tmplmsg');
		$mapping = $modelTmpl->mappingById($product->catelog->feedback_order_tmplmsg);
		if (false === $mapping) {
			return false;
		}
		/**/
		$tmplmsg = $modelTmpl->byId($mapping->msgid, 'Y');
		if (empty($tmplmsg->params)) {
			return false;
		}
		/*构造消息数据*/
		$data = array();
		foreach ($mapping->mapping as $k => $p) {
			$v = '';
			switch ($p->src) {
			case 'product':
				if ($p->id === '__productName') {
					$v = $product->name;
				} else {
					$v = $product->propValue2->{$p->id}->name;
				}
				break;
			case 'order':
				if ($p->id === '__orderSn') {
					$v = $order->trade_no;
				} else if ($p->id === '__orderState') {
					$v = '未付款';
				} else {
					$v = $order->extPropValue->{$p->id};
				}
				break;
			case 'feedback':
				$v = $order->feedback->{$p->id};
				break;
			case 'text':
				$v = $p->id;
				break;
			}
			$data[$k] = $v;
		}
		/**/
		$url = 'http://' . $_SERVER['HTTP_HOST'] . "/rest/app/merchant/order";
		$url .= "?mpid=" . $mpid;
		$url .= "&shop=" . $order->sid;
		$url .= "&order=" . $order->id;
		/**/
		$this->tmplmsgSendByOpenid($mpid, $tmplmsg->id, $order->buyer_openid, $data, $url);

		return true;
	}
}