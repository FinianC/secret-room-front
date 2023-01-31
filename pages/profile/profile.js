// pages/profile/profile.js
import { getAppUser} from '../../utils/token'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar:'',
    userName:'密逃',
    user:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得当前登录用户
    // wx.showLoading({
    //   title: '获取登录状态',
    // })
  },
  async onShow(){
    let user = await getAppUser();
    let baseUrl = wx.getStorageSync('baseUrl')
    // 调用小程序 API，得到用户信息
    user.headerImg = user.headerImg.indexOf('http') != -1 ?user.headerImg : baseUrl+user.headerImg;
    console.log(user)
    this.setData({
      user,
      baseUrl
    })
  },
  // 跳转编辑页面
  handleEdit:function(){
    wx.navigateTo({
      url: '/pages/profile/edit',
    })
  }
})