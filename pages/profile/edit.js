// pages/profile/edit.js
import {updateUserInfo} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      phone:'',
      wechatNumber:'',
      sex:1,
    }
  },

  // 单选框性别修改
  handleRadioChange:async function(e){
    this.setData({
      [`${e.currentTarget.dataset.gater}`]: parseInt(e.detail.value)
    })
    const res = await updateUserInfo(this.data.form)
  },
    // 输入框失去焦点时保存用户信息
    handleBlur:async function(e){
      this.setData({
        [`${e.currentTarget.dataset.gater}`]: e.detail.value
      })
      const res = await updateUserInfo(this.data.form)
    },
    onShareAppMessage: function (res) {
      return {
        title: '密逃',
      }
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
  onShow: function () {

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