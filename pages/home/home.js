// pages/home/home.js
import {
  getMotorcadeList
} from '../../api/index'
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
import {
  join,
  leave,
  existsList,
  complete
} from '../../api/home'
const moment = require('../../utils/moment.js')
import {
  getAppUser
} from '../../utils/token'
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
    articles: [],
    currentIndex: -1,
    //0表示未播放，1表示正在播放，2表示播放暂停
    playState: 0,
    currentExpandIndex: -1, //当前展开的Index
    searchForm: {
      current: 1,
      pageSize: 5,
      title: "",
      themeId: ''
    },
    flag: true,
    synchronizationLock: true,
    userInfo: {},
    showToast: false,
    enablePullDownRefresh: true,
    option1: [{
        text: '全部商品',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },
      {
        text: '活动商品',
        value: 2
      },
    ],
    value1: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onReachBottom: async function () {

    if (!this.data.flag) return
    if (!this.data.synchronizationLock) return
    this.setData({
      synchronizationLock: false
    })
    let current = this.data.searchForm.current;
    current++;
    this.setData({
      searchForm: {
        current: current,
        pageSize: 5,
        title: this.data.searchForm.title,
        themeId: this.data.searchForm.themeId
      }
    })
    await this.getQueryPageList();
    this.setData({
      synchronizationLock: true
    })
  },
  onLoad: async function (options) {
    // let userInfo = await getAppUser();
    // this.setData({
    //   userInfo
    // })
    // console.log(userInfo)
    //  this.getQueryPageList()
    // this.existsList()
  },
  // 查询分页列表
  getQueryPageList: async function () {
    let lastList = this.data.articles //获取上次请求的数据
    wx.showLoading({
      title: '加载中',
    })
    const res = await getMotorcadeList(this.data.searchForm)
    wx.hideLoading();
    res.data.records.forEach((el) => {
      el.pictures = JSON.parse(el.pictures)
    })
    if (res.data.records.length <= 0) {
      this.setData({
        showToast: true,
        flag: false
      })
      return;
    }
    let newList = lastList.concat(res.data.records)
    this.setData({
      articles: newList,
      baseUrl: res.baseUrl,
      flag: res.data.records.length == res.data.size
    })
  },

  onShow: async function () {
    let userInfo = await getAppUser();
    this.setData({
      userInfo
    })
    // this.getArticleData();
    wx.startPullDownRefresh();
    this.existsList()
    await this.getQueryPageList();
    console.log(this.data)

  },

  /**
   * 获取已存在的主题
   */
  existsList: async function () {
    const res = await existsList();
    let records = res.data;
    let newArray = records.map(i => {
      let item = {
        'text': i.name,
        'value': i.id
      }
      return item;
    })
    newArray.unshift({
      'text': '全部主题',
      'value': ''
    })
    this.setData({
      option1: newArray
    })
  },

  getArticleData: function () {},
  /**
   * 主题改变回调
   * @param {value} e 
   */
  changTheme: function (e) {
    if (e.detail == this.data.value1) return
    this.setQueryUp()
    let searchForm = this.data.searchForm;
    searchForm.themeId = e.detail
    this.setData({
      searchForm
    })
    this.getQueryPageList()
  },
  /**
   * 跳转发布车队
   * @param {*} event 
   */
  jumpToUpload: function (event) {
    wx.navigateTo({
      url: '../upload/upload',
    })
  },
  /**
   * 加入车队
   * @param {车队id} e 
   */
  handleJoinCar: async function (e) {

    Dialog.confirm({
        title: '加入车队',
        message: '是否确认加入车队',
      })
      .then(async () => {
        const res = await join({
          'motorcadeId': e.currentTarget.dataset.motorcadeid
        })
        this.updateFleetInfo(res.data)
        Toast.success('加入成功');
      })
      .catch(() => {
        // on cancel
      });
  },
  /** 
   * 更新车队信息
   * @param {车队信息} fleet 
   */
  updateFleetInfo: function (fleet) {
    let newList = this.data.articles;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].id == fleet.id) {
        newList[i] = fleet
        newList[i].pictures = JSON.parse(fleet.pictures)
        break;
      }
    }
    this.setData({
      articles: newList
    })
  },
  /**
   * 退出车队
   * @param {车队id} e 
   */
  handleLeaveCar: async function (e) {

    Dialog.confirm({
        title: '退出车队',
        message: '是否确认退出车队',
      })
      .then(async () => {
        const res = await leave({
          'motorcadeId': e.currentTarget.dataset.motorcadeid
        })
        this.updateFleetInfo(res.data)
        Toast.success(res.message);
      })
      .catch(() => {
        // on cancel
      });


  },
  /**
   * 搜索框查询车队
   * @param {key word} e 
   */
  onSearch: function (e) {
    let searchForm = this.data.searchForm;
    searchForm.title = e.detail;
    this.setData({
      searchForm
    })
    this.setQueryUp()
    this.getQueryPageList();
  },
  /**
   * 取消搜索
   * @param {key word} e 
   */
  onCancel: function (e) {
    let searchForm = this.data.searchForm;
    searchForm.title = e.detail;
    this.setData({
      searchForm
    })
    this.setQueryUp()
    this.getQueryPageList();
  },


  /**
   * 跳转详情
   */
  jumpToDetailCmt: function () {
    wx.navigateTo({
      url: './detail',
    })
  },
  /**
   * 拼车完成
   * @param {车队id} e 
   */
  async handleCompleteCar(e) {

    Dialog.confirm({
        title: '拼车完成',
        message: '是否确认拼车完成',
      })
      .then(async () => {
        let motorcadeid = e.currentTarget.dataset.motorcadeid;
        const res = await complete({
          id: motorcadeid
        })
        if (res.code == 200) {
          let articles = this.data.articles
          let newArr = articles.filter((it) => {
            return it.id != motorcadeid
          })
          this.setData({
            articles: newArr
          })
          Toast.success(res.message);
        }
      })
      .catch(() => {
        // on cancel
      });
  },

  expandText: function (event) {
    console.log(event)
    this.setData({
      currentExpandIndex: event.currentTarget.dataset.index
    })
  },

  previewBigImage: function (event) {
    console.log(event)
    wx.previewImage({
      urls: [event.currentTarget.id] // 需要预览的图片http链接列表
    })
  },
  /**
   * 下拉刷新
   * @param {} event 
   */
  onPullDownRefresh: function (event) {
    this.setQueryUp();
    this.getQueryPageList();
  },
  /**
   * 查询参数初始化
   */
  setQueryUp: function () {
    this.setData({
      searchForm: {
        current: 1,
        pageSize: 5,
        title: this.data.searchForm.title,
        themeId: this.data.searchForm.themeId
      },
      flag: true,
      synchronizationLock: true,
      articles: []
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: '密逃',
    }
  }

})