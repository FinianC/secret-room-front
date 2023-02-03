// pages/profile/headPortrait.js
import { getAppUser,setAppUser} from '../../utils/token'
import ipConfig from '../../utils/ipConfig'
import {updateUserInfo} from '../../api/headPortraitApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow() {
    this.getAppUser()
  },
  /**
   * 获取用户头像
   */
  getAppUser:async function(){
    let user = await getAppUser();
    let baseUrl = wx.getStorageSync('baseUrl')
    console.log(user)
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
   * 选择相册图片
   */
  selectPicture(){
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.chooseMedia({
        count:1,
        mediaType:['image'],
        sourceType:['album', 'camera'],
        sizeType:[ 'compressed'],
        success: (e)=>{
          console.log(e)
          this.uploadFile(e.tempFiles[0].tempFilePath);
        },
        fail:(e)=> {
          console.log(e)
        },
        complete:(e)=> {
          console.log(e)
        }
      })
  },

   /**
    * 上传图片到服务器
    * @param {file} tempFilePath 
    */
   uploadFile(tempFilePath) {
    wx.showLoading();
    console.log(ipConfig)
    wx.uploadFile({
      filePath: tempFilePath,
      name: 'file',
      url: ipConfig.baseUrl + '/file/upload',
      success: async (res) => {
        wx.hideLoading();
        const data = JSON.parse(res.data).data; //把数据字符串转变成对象
        let id = data.id ; 
        let user = this.data.user;
        user.headerImg = ''+id;
        await setAppUser(user)
        user.headerImg = data.url;
        this.setData({
          user
        });
        updateUserInfo({id:user.id,headerImg:id});
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})