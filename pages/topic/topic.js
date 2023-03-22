// pages/topic/topic.js
import {getTicketList} from "../../api/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      current : 1,
      pageSize : 5,
      name: "",
      themeId: ''
    },
    // 密室主题列表
    ticketList:[]
  },

  handleDetail: function  (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./detail?id=${id}`,
    })
  },

  /**
   * 获取密室主题分页列表
   */
  handleGetTicketList : async function () {  
    const res = await getTicketList(this.data.form);
    this.setData({
      ticketList:res.data.records
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.handleGetTicketList()
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