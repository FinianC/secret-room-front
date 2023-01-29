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
// // 获取车队类型
// export function getFleetType() {
//   return request({
//     url: '/fleetType/list',
//     method: 'GET'
//   })
// }