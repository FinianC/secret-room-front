// pages/upload/upload.js
import UploadImg from '../../components/UploadImg'

import {releaseMotorcade,getThemeList} from '../../api/index'
const recorderManager = wx.getRecorderManager();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    title: '',
    hasChooseImage: false,
    //0表示未录制，1表示正在录制，2表示录制暂停，3表示录制结束
    recorderState: 0,
    recorderPath: '',
    //0表示未播放，1表示正在播放，2表示播放暂停
    playerState: 0,
    fleetType:[],
    pickerIndex:0,
    index:1,
    starTime:'',
    form:{
      
    }
  },

  hourChange: function (e) {
    console.log(e)
    this.setData({
      [`${e.currentTarget.dataset.gater}`]: e.detail.value+':00'
    })
  },

  typeIdChange:function(e){
    console.log(e)
    // this.setData({
    //   [`${e.currentTarget.dataset.gater}`]: parseInt(e.detail.value)
    // })
  },

  pickerConfirm:function(e){
    console.log(e)
    this.setData({
      [`${e.currentTarget.dataset.gater}`]: parseInt(e.detail.value)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const res = await getThemeList()
    this.setData({
      fleetType: res.data,
      form:{
        themeId: res.data[0].id
      }
    })
  },

  chooseImage: function(event) {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res);
        that.setData({
          hasChooseImage: true,
          imagePath: res.tempFilePaths[0]
        })
      },
    })
  },

  getUploaderList:function(e){
    console.log(e);
    this.setData({
      [`${e.currentTarget.dataset.gater}`]:JSON.stringify(e.detail.uploaderListId) 
    })
  },

  bindTextArea: function(e) {
    this.setData({
      [`${e.currentTarget.dataset.gater}`]: e.detail.value
    })
  },
  bindInput: function(e) {
    this.setData({
      [`${e.currentTarget.dataset.gater}`]: parseInt(e.detail.value)
    })
  },

  submitData:async function(event) {
    await releaseMotorcade(this.data.form)
    wx.showToast({
      title: '发布成功',
      icon:'success',
      duration:1000
    })
    wx.switchTab({
      url: '../home/home'
    })
  }

})