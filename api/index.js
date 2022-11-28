/**
 * 通用api
 */
import request from '../utils/request'
// 登录获取openId
export function getOpenId(data) {
  return request({
    url: '/user/getOpenId',
    method: 'POST',
    data
  })
}

// 分页查询大厅车队信息
export function getMotorcadeList(data) {
  return request({
    url: '/motorcade/page',
    method: 'POST',
    data
  })
}

// 更新用户信息
export function updateUserInfo(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}

// 发布车队信息
export function releaseMotorcade(data) {
  return request({
    url: '/motorcade/user/add',
    method: 'POST',
    data
  })
}
// 获取车队类型
export function getFleetType() {
  return request({
    url: '/fleetType/list',
    method: 'GET'
  })
}