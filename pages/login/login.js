// pages/login/login.js
import { getOpenId } from '../../api/index'
import { setAppToken } from '../../utils/token'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onGotUserInfo:function(event){
    wx.login({
      success: async function(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          try{
            const respones = await getOpenId({code : res.code})
            await setAppToken(respones?.data?.token || {})
            wx.switchTab({
              url: '../home/home',
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