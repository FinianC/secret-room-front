// pages/profile/edit.js
import {updateUserInfo} from '../../api/profile_edit'
import { getAppUser,setAppUser} from '../../utils/token'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      phone:'',
      wechatNumber:'',
      sex:1,
    },
    sexShow:false,
    headPortraitShow:false,
    actions: [
      {
        name: '男',
        value:2
      },
      {
        name: '女',
        value:1
      },
    ],
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
  getAppUser:async function(){
    let user = await getAppUser();
    let baseUrl = wx.getStorageSync('baseUrl')
    console.log(baseUrl)
    // 调用小程序 API，得到用户信息
    user.headerImg = user.headerImg.indexOf('http') != -1 ?user.headerImg : baseUrl+user.headerImg;
    console.log(user)
    this.setData({
      user,
      baseUrl
    })
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
    this.getAppUser();
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

  },
/**
 * 点击性别单元格方法
 */
  clickSex:function(){
    this.setData({
      sexShow:true
    })
  },
  /**
   * 选择性别弹框关闭
   */
  sexOnClose() {
    this.setData({ sexShow: false });
  },
  /**
   * 选择性别方法
   * @param {sex} event 
   */
  sexOnSelect(event){
    console.log(event);
    let user = this.data.user;
    user.sex = event.detail.value
    this.setData({
      user
    })
  },
  /**
   * 输入框改变事件
   * @param {input value} e 
   */
  onChange(e){
    let user = this.data.user;
    user[`${e.currentTarget.dataset.gater}`] = e.detail;
    this.setData({
      user
    })
  },
  /**
   * 保存修改
   */
  async toUpdate(){
    let user = this.data.user;
    let oldHeaderImg = user.headerImg
    let arr  = user.headerImg.split(this.data.baseUrl);
    if(arr.length > 1){
      user.headerImg = arr[1];
    }
    const res =  await updateUserInfo(user);
    Toast.success(res.message);
    if(res.code == 200 ){
      setAppUser(user)
    }
    user.headerImg = oldHeaderImg;
    this.setData({
      user
    })
  },
})