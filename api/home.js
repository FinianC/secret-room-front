/**
 * 通用api
 */
import request from '../utils/request'
// 加入车队
export function join(data) {
  return request({
    url: '/user/joinedMotorcade/join',
    method: 'POST',
    data
  })
}
/**
 * 离开车队
 * @param {*} data 
 */
export function leave(data) {
  return request({
    url: '/user/joinedMotorcade/leave',
    method: 'POST',
    data
  })
}
/**
 * 拼车完成
 * @param {*} data 
 */
export function complete(data) {
  return request({
    url: '/motorcade/user/complete',
    method: 'POST',
    data
  })
}
/**
 * 已存在 主题列表
 */
export function existsList() {
  return request({
    url: '/theme/existsList',
    method: 'GET'
  })
}