import { getAppToken, removeAppToken, removeAppUser, getAppKey } from './token'
import ipConfig from './ipConfig'
function request(options) {
  console.log(options);
  var method = options.method || 'GET';
  var Swrh_Token = getAppToken() || ''
  if (options.isLoading) {
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: ipConfig.baseUrl + options.url,
      method,
      data: options.data || {},
      timeout: 900000,
      header: {
        'content-type': 'application/json', // 默认值
        'wx-token': Swrh_Token,
        "openId": getAppKey().openId
      },
      success: res => {
        let pages = getCurrentPages() // 页面信息
        let currPage = pages[pages.length - 1]
        let response = res?.data || {}
        if (response?.code == 0 || response?.code == -1) {
          return resolve(response)
        } else if (response.code == -2) {// token失效
          removeAppToken()
          removeAppUser()
          if (currPage != 'pages/login/index') {
            return wx.reLaunch({
              url: '/pages/login/index',
            })
          }
        }
        else {
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