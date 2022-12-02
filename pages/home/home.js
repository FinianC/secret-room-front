// pages/home/home.js
import {getMotorcadeList} from '../../api/index'
const moment = require('../../utils/moment.js')
const backgroundAudioManager = wx.getBackgroundAudioManager()

let current = 1


Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
    articles:[
    ],
    currentIndex:-1,
    //0表示未播放，1表示正在播放，2表示播放暂停
    playState:0,
    currentExpandIndex:-1,//当前展开的Index
    searchForm:{
      "current": 1,
      "pageSize": 5,
    },
    showToast:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReachBottom: function() {
    current ++ ;
    this.setData({
      searchForm:{
        current:current,
        pageSize:5
      }
    })
    this.getQueryPageList()
  },
  onLoad: function (options) {
    this.getQueryPageList()
  },
  // 查询分页列表
  getQueryPageList:async function(){
    let lastList = this.data.articles //获取上次请求的数据
    wx.showLoading({
      title: '加载中',
    })
    const res = await getMotorcadeList(this.data.searchForm)
    wx.hideLoading();
    res.data.records.forEach((el)=>{
      el.pictures = JSON.parse(el.pictures)
    })
    if(res.data.records.length <= 0){
      this.setData({
        showToast:true
      })
      return
    }
    let newList = lastList.concat(res.data.records)
    this.setData({
      articles:newList,
      baseUrl:res.baseUrl
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