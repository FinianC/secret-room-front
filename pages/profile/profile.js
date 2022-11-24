// pages/profile/profile.js
import {updateUserInfo} from '../../api/index'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar:'',
    userName:'密逃',
    form:{
      phone:'',
      wechatNumber:'',
      sex:1,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得当前登录用户
    // wx.showLoading({
    //   title: '获取登录状态',
    // })
    let headUrl = wx.getStorageSync('headerUrl')
    let nickName = wx.getStorageSync('nickName')
    // 调用小程序 API，得到用户信息
    this.setData({
      userAvatar: headUrl,
      userName : nickName,
    })
  },
 
  // 单选框性别修改
  handleRadioChange:function(e){
    let sex = parseInt(e.detail.value)
    this.setData({
        sex:sex,
    })
  },
  // 输入框失去焦点时保存用户信息
  handleBlur:async function(e){
    debugger
    console.log(this.data.form);
    const res = await updateUserInfo(this.data.form)
  },
  onShareAppMessage: function (res) {
    return {
      title: '密逃',
    }
  }

})