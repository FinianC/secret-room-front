/** 分页查询消息分页列表 */
import request from '../utils/request'
export function getGroupMsgContent(data) {
  return request({
    url: '/user/groupMsgContent/page',
    method: 'POST',
    data
  })
}