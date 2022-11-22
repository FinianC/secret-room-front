/**
 * 通用api
 */
import request from '../utils/request'
// 报警统计 - 待处置，处理完成率
export function getOpenId(data) {
  return request({
    url: '/secret/secret/user/getOpenId',
    method: 'POST',
    data
  })
}