// pages/topic/detail.js
import {toPay, getTopicDetail} from "../../api/topic.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicDetail:{},
    show:false,
    phone:'19121714880',
    value: 1,
    allPrice:'',
    productIntroduction:'',
    indexList:["商品介绍","购买须知"],
    active:1,
    purchaseInstructions:''
  },
  /**
   * 切换tabs
   */
  handleChange(event) {
  
  },

  onChange(value) {
    var sumPrice = parseInt(this.data.topicDetail.price)*parseInt(value.detail)
    this.setData({ 
      value:value.detail,
      allPrice:parseInt(sumPrice)
    });
    console.log(this.data.value);
  },
  // 打开订单详情
  handleShow: function(){
    this.setData({ show: true });
  },
  // 微信支付
  pay: async function(){
    var ticketId = this.data.topicDetail.id
    const res = await toPay({	ticketId : ticketId,quantity:this.data.value, phone:this.data.phone})
    console.log(res);
    wx.requestPayment({
      timeStamp: res.data.timeStamp,
      nonceStr: res.data.nonceStr,
      package: res.data.packageValue,
      signType: res.data.signType,
      paySign: res.data.paySign,
      success (res) { },
      fail (res) { }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(options);
    const res = await getTopicDetail(options.id)
    this.setData({
      topicDetail:res.data,
      allPrice:res.data.price,
      productIntroduction:res.data.introduce,
      purchaseInstructions:res.data.purchaseInstructions
    })
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
  onClose() {
    this.setData({ show: false });
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