import { getAppToken, removeAppToken, removeAppUser, getAppKey } from './token.js'
import ipConfig from './ipConfig.js'

function request(options) {
 
  var method = options.method || 'GET';
  var app_token = getAppToken() || ''

  return new Promise((resolve, reject) => {
    wx.request({
      url: ipConfig.baseUrl + options.url,
      method,
      data: options.data || {},
      timeout: 900000,
      header: {
        'content-type': 'application/json', // 默认值
        'token': app_token,
        "openId": getAppKey().openId
      },
      success: res => {
        let pages = getCurrentPages() // 页面信息
        let currPage = pages[pages.length - 1]
        let response = res?.data || {}
        if (response?.code == 200 || response?.code == -1) {
          return resolve(response)
        } else if (response.code == 1003 || response.code == 1002) {// token失效
          removeAppToken()
          removeAppUser()
          if (currPage != 'pages/login/login') {
            return wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        }else {
          return wx.showToast({
            title: response.message,
            icon: 'none',
            duration: 4000,
            mask: true
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: err.message,
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return reject(err)
      },
      complete: () => {
        // 调用成功  
        if (options.isLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}
export default request