//index.js
const moment = require('../../utils/moment.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    topics:[]
  },
  onLoad: function () {
    wx.startPullDownRefresh();
  },

  getTopicData:function(){
  },

  //点击事件
  jumpToDetail: function (event) {
    console.log(event)
    var topicId = event.currentTarget.dataset.topicid
    var imageUrl = event.currentTarget.dataset.imageurl
    var cardTitle = event.currentTarget.dataset.cardTitle
    wx.navigateTo({
      url: '../detail/detail?topicId=' + topicId + '&imageurl=' + imageUrl + '&cardTitle=' + cardTitle,
    })
  },

  onPullDownRefresh: function (event) {
    this.getTopicData();
  },

  onShareAppMessage: function (res) {
    return {
      title: '密逃',
    }
  }

})
