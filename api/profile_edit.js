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

// /**
//  * 已存在 主题列表
//  */
// export function existsList() {
//   return request({
//     url: '/theme/existsList',
//     method: 'GET'
//   })
// }