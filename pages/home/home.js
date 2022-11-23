// pages/home/home.js
import {getMotorcadeList} from '../../api/index'
const moment = require('../../utils/moment.js')
const backgroundAudioManager = wx.getBackgroundAudioManager()

let currentIndex;
let that = this;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles:[
      {
        userAvatar:'../../images/icon.png',
        userName:'save',
        text:'这周五晚18:00 5=2',
        imageUrl:'../../images/icon.png',
        createdAt:'2022-11-14 18:00'
      },
      {
        userAvatar:'../../images/icon.png',
        userName:'save',
        text:'这周五晚18:00 5=2',
        imageUrl:'../../images/icon.png',
        createdAt:'2022-11-14 18:00'
      },
      {
        userAvatar:'../../images/icon.png',
        userName:'save',
        text:'这周五晚18:00 5=2',
        imageUrl:'../../images/icon.png',
        createdAt:'2022-11-14 18:00'
      },
      {
        userAvatar:'../../images/icon.png',
        userName:'save',
        text:'这周五晚18:00 5=2',
        imageUrl:'../../images/icon.png',
        createdAt:'2022-11-14 18:00'
      },
    ],
    currentIndex:-1,
    //0表示未播放，1表示正在播放，2表示播放暂停
    playState:0,
    currentExpandIndex:-1,//当前展开的Index
    searchForm:{
      "current": 1,
      "pageSize": 5,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    const res = await getMotorcadeList(this.data.searchForm)
    res.data.records.pictures = JSON.parse(res.data.records.pictures)
    console.log(res);
    this.setData({
      articles:res.data.records
    })
    // that = this;
    // backgroundAudioManager.onPlay(()=>{
    //   that.setData({
    //     currentIndex: currentIndex,
    //     playState:1
    //   })
    // })

    // backgroundAudioManager.onEnded(() => {
    //   that.setData({
    //     currentIndex: -1,
    //     playState:0,
    //   })
    // })

    // backgroundAudioManager.onPause(() => {
    //   that.setData({
    //     playState: 2
    //   })
    // })

    // backgroundAudioManager.onError(() => {
    //   that.setData({
    //     currentIndex: -1,
    //     playState: 0
    //   })
    // })

  },

  onShow: function () {
    // this.getArticleData();
    wx.startPullDownRefresh();
  },

  getArticleData:function(){
    
  },

  jumpToUpload:function(event){
    wx.navigateTo({
      url: '../upload/upload',
    })
  },

  

  jumpToDetailCmt:function(){

  },

  expandText:function(event){
      console.log(event)
      this.setData({
        currentExpandIndex: event.currentTarget.dataset.index
      })
  },

  previewBigImage:function(event){
    console.log(event)
    wx.previewImage({
      urls: [event.currentTarget.id] // 需要预览的图片http链接列表
    })
  },

  onPullDownRefresh:function(event){
    this.getArticleData();
  },

  onShareAppMessage: function (res) {
    return {
      title: '密逃',
    }
  }

})