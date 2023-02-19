//app.js
import request from './utils/request'
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: function(res) {
        var name = res.model
        if (name.indexOf("iPhone X") > -1) {
          that.globalData.isIphoneX = true
        }
      }
    })
  },
  globalData: {
    user: null,
    socketClient: null,
    token: null,
    isIphoneX:false,
    socketReceiver: function (e) {}, //收到消息回调
    refreshCallback: function () {} // 全局变量刷新事件回调
  },
  initSocket: function () {

    var socketOpen = false

    function sendSocketMessage(msg) {
      // console.log('send msg:' + msg)
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }

    var ws = {
      send: sendSocketMessage
    }

    wx.connectSocket({
      url: 'ws://127.0.0.1:9096/secret/webSocketServerMini' ,
      protocols:[this.globalData.token],
    })
    wx.onSocketOpen(function (res) {
      socketOpen = true
      ws.onopen()
    })

    wx.onSocketMessage(function (res) {
      // console.log(res)
      ws.onmessage(res)
    })

    var Stomp = require('./utils/stomp.js').Stomp;
    Stomp.setInterval = function () { }
    Stomp.clearInterval = function () { }
    var client = Stomp.over(ws);
    this.globalData.socketClient = client;

    client.connect({}, function (sessionId) {})
    //send message to fire topic
  },
  //统一发送消息
  sendSocketMessage: function (msg) {
    
  }

})