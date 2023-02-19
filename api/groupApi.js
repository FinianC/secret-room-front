/**
 * 群聊页面 通用api
 */
import request from '../utils/request'
// 查询聊天列表
export function chatList() {
  return request({
    url: '/groupChat/list',
    method: 'GET',
  })
}
/**
 * 查询聊天记录
 * @param {}} data 
 */
export function groupMsgContentPage(data) {
  return request({
    url: '/user/groupMsgContent/page',
    method: 'POST',
    data
  })
}
/**
 * 更新最新消息读取标记
 * @param {*} data 
 */
export function updateReadingRecords(data) {
  return request({
    url: '/user/groupMsgContent/updateReadingRecords',
    method: 'POST',
    data
  })
}