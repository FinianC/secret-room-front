// pages/home/home.js
import {getMotorcadeList} from '../../api/index'

import {join,leave} from '../../api/home'
const moment = require('../../utils/moment.js')
import { getAppUser} from '../../utils/token'
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
    userInfo:{},
    showToast:false,
    enablePullDownRefresh:true
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
    let userInfo = getAppUser();
    this.setData({
      userInfo
    })
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
 /**
  * 加入车队
  * @param {车队id} e 
  */
  handleJoinCar: async function(e){
    const res = await join({'motorcadeId':e.currentTarget.dataset.motorcadeid})
    this.updateFleetInfo(res.data)
    console.log(res)
  },
 /** 
  * 更新车队信息
  * @param {车队信息} fleet 
  */
  updateFleetInfo: function(fleet){
    let newList = this.data.articles;
    for(let i = 0 ;i<newList.length ;i++){
      if(newList[i].id == fleet.id ){
        newList[i] = fleet
        newList[i].pictures = JSON.parse(fleet.pictures)
        break;
      }
    }
    this.setData({
      articles:newList
    })
  },
 /**
  * 退出车队
  * @param {车队id} e 
  */
 handleLeaveCar: async function(e){
  const res = await leave({'motorcadeId':e.currentTarget.dataset.motorcadeid})
  this.updateFleetInfo(res.data)
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
    this.setData({
      searchForm:{
        current:1,
        pageSize:5
      },
      articles:[]
    })
    this.getQueryPageList();
  },

  onShareAppMessage: function (res) {
    return {
      title: '密逃',
    }
  }

})