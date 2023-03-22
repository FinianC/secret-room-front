import request from '../utils/request'
/**
 * 微信支付接口
 */
export function toPay(data) {
  return request({
    url: '/ticket/purchaseTicket',
    method: 'POST',
    data
  })
}
/**
 * 密室详情接口
 */
export function getTopicDetail(id) {
  return request({
    url: `/ticket/detail/${id}`,
    method: 'GET',
  })
}