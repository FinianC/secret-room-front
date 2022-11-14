// pages/home/home.js

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
    ],
    currentIndex:-1,
    //0表示未播放，1表示正在播放，2表示播放暂停
    playState:0,
    currentExpandIndex:-1//当前展开的Index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    backgroundAudioManager.onPlay(()=>{
      wx.hideLoading()
      that.setData({
        currentIndex: currentIndex,
        playState:1
      })
    })

    backgroundAudioManager.onEnded(() => {
      wx.hideLoading()
      that.setData({
        currentIndex: -1,
        playState:0,
      })
    })

    backgroundAudioManager.onPause(() => {
      wx.hideLoading()
      that.setData({
        playState: 2
      })
    })

    backgroundAudioManager.onError(() => {
      wx.hideLoading()
      that.setData({
        currentIndex: -1,
        playState: 0
      })
    })

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

  playVoice:function(event){
    console.log(event)
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.playState==0){
      currentIndex = event.currentTarget.dataset.index
      let currentVoiceUrl = this.data.articles[currentIndex].voiceUrl
      console.log(currentIndex + '/' + currentVoiceUrl)
      backgroundAudioManager.title = '密逃'
      backgroundAudioManager.src = currentVoiceUrl
      backgroundAudioManager.play()
    } else if (this.data.playState == 1){
      backgroundAudioManager.pause()
    } else if (this.data.playState == 2) {
      if (currentIndex == event.currentTarget.dataset.index) {
        backgroundAudioManager.play()
      }else{
        currentIndex = event.currentTarget.dataset.index
        let currentVoiceUrl = this.data.articles[currentIndex].voiceUrl
        console.log(currentIndex + '/' + currentVoiceUrl)
        backgroundAudioManager.title = '难眠'
        backgroundAudioManager.src = currentVoiceUrl
        backgroundAudioManager.play()
      }
    }
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