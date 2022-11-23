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