// pages/upload/upload.js
import UploadImg from '../../components/UploadImg'

import {releaseMotorcade,getFleetType} from '../../api/index'
const recorderManager = wx.getRecorderManager();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    text: '',
    hasChooseImage: false,
    //0表示未录制，1表示正在录制，2表示录制暂停，3表示录制结束
    recorderState: 0,
    recorderPath: '',
    //0表示未播放，1表示正在播放，2表示播放暂停
    playerState: 0,
    fleetType:[],
    index:1

  },
  bindPickerChange: function(e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const res = await getFleetType()
    this.setData({
      fleetType: res.data
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

  clickRecord: function(event) {
    if (that.data.recorderState == 3) {
      if (that.data.playerState == 0) {
        // 播放录音
        console.log(that.data.recorderPath)
        this.innerAudioContext.src = this.data.recorderPath; // 这里可以是录音的临时路径
        wx.showLoading({
          title: '准备播放',
        })
        this.innerAudioContext.play()
      } else if (that.data.playerState == 1) {
        this.innerAudioContext.pause()
      } else if (that.data.playerState == 2) {
        this.innerAudioContext.play()
      }

      return
    }

    // wx.openSetting({})
    // 先获取录音权限
    wx.authorize({
      scope: 'scope.record',
      fail: (res) => {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '录音权限获取失败，请去(右上角 - 关于 - 右上角 - 设置)界面开启录音权限',
          showCancel: false
        })
      },
      success: () => {
        if (that.data.recorderState == 0) {
          wx.showLoading({
            title: '准备录音',
          })

          const options = {
            format: 'mp3',
            duration:600000,
          }
          recorderManager.start(options)

        } else if (that.data.recorderState == 1) {
          wx.showLoading({
            title: '暂停录音',
          })

          recorderManager.pause()
        } else if (that.data.recorderState == 2) {
          recorderManager.resume()
          that.setData({
            recorderState: 1
          })
        }
      }
    })

  },

  clickLongRecord: function(event) {
    if (that.data.recorderState == 0) {
      return
    } else if (that.data.recorderState == 3) {
      // 重置录音
      wx.showModal({
        title: '提示',
        content: '确定要重新录音吗',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.innerAudioContext.stop();
            wx.showLoading({
              title: '准备录音',
            })

            const options = {
              format: 'mp3',
              duration: 600000,
            }

            recorderManager.start(options)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 结束录音
      wx.showModal({
        title: '提示',
        content: '确定要结束录音吗',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            recorderManager.stop()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },

  bindTextAreaBlur: function(event) {
    console.log('bindTextAreaBlur:' + event.detail.value)
    this.setData({
      text: event.detail.value
    })
  },

  submitData:async function(event) {
    const res = await releaseMotorcade()
  },

  uploadData:function(){
  },

  uploadText:function(){
    wx.showLoading({
      title: '正在上传',
    })
    var article = new Article();
    article.set('imageUrl', imageUrl)
    article.set('voiceUrl', voiceUrl)
    article.set('voiceDuration', voiceDuration)
    article.set('text', that.data.text)
    article.set('userName', app.globalData.userInfo.nickName)
    article.set('userAvatar', app.globalData.userInfo.avatarUrl)
    article.set('userId', app.globalData.userInfo.objectId)
    article.save().then(function (article) {
      // 成功
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '上传成功',
        showCancel: 'false',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({})
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }, function (error) {
      // 失败
      wx.hideLoading()
      wx.showToast({
        title: '上传失败',
      })
    });
  }

})