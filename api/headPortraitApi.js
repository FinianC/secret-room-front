/**
 * 通用api
 */
import request from '../utils/request'
// 修改用户信息
export function updateUserInfo(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}