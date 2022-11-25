// pages/profile/profile.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar:'',
    userName:'密逃',
  
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

  // 跳转编辑页面
  handleEdit:function(){
    wx.navigateTo({
      url: '/pages/profile/edit',
    })
  }
})