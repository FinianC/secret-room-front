// pages/group/group.js
<<<<<<< HEAD
import {
  getGroupMsgContent
} from '../../api/group'
=======
import {chatList} from "../../api/groupApi"
>>>>>>> b4d4cb39702fdfc882ab7e21bda5c64faf6612ae
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList:[],
    baseUrl:""
  },

  handleGroupTap:function(e){
    wx.navigateTo({
      url: '/pages/group/groupICQ?id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad: async function (options) {
    const res = await getGroupMsgContent()
    console.log(res);
=======
  onLoad: function (options) {
    
>>>>>>> b4d4cb39702fdfc882ab7e21bda5c64faf6612ae
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    wx.setNavigationBarTitle({
      title: "车队群聊"
  })
    const res = await chatList();
    this.setData({
      chatList:res.data,
      baseUrl:res.baseUrl
    })
    console.log(res);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})