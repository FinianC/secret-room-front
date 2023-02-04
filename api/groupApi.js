/**
 * 通用api
 */
import request from '../utils/request'
// 修改用户信息
export function chatList() {
  return request({
    url: '/groupChat/list',
    method: 'GET',
  })
}

export function groupMsgContentPage(data) {
  return request({
    url: '/user/groupMsgContent/page',
    method: 'POST',
    data
  })
}