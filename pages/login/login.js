// pages/login/login.js
import { getOpenId } from '../../api/index'
import { setAppToken ,setAppUser} from '../../utils/token'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerUrl : '',
    nickName : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let a = wx.getStorageSync('headerUrl')
    let b = wx.getStorageSync('nickName')
    this.setData({
      headerUrl:a,
      nickName:b
    })
  },

  onGotUserInfo:function(event){
    wx.login({
      success: function(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          try{
           
            wx.getUserInfo({
              success:async function(returned) {
                console.log(returned);
                const respones = await getOpenId({code : res.code,headerImg:returned.userInfo.avatarUrl,nickname:returned.userInfo.nickName})
                console.log(respones);
                await wx.setStorageSync('headerUrl', returned.userInfo.avatarUrl)
                await wx.setStorageSync('nickName', returned.userInfo.nickName)
                await wx.setStorageSync('baseUrl', respones.baseUrl)
                await setAppToken(respones?.data?.token || {})
                await setAppUser(respones?.data?.user || {})
                let token = respones?.data?.token;
                app.globalData.token = token
                app.initSocket(token)
                wx.switchTab({
                  url: '../home/home',
                })
              }
            })
          }catch(e){
            console.log(e);
          }
      

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      
      }
    });
  
  }

})