const app = getApp()
import {groupMsgContentPage} from "../../api/groupApi"
// 获取数据库
const DB =null
import {
  getAppUser
} from '../../utils/token'
Page({
	// 删除消息
	remove_msg(e) {
		var _this = this;
		var id = e.currentTarget.dataset.id
		DB.doc(id).remove({
			success(res) {
				console.log("删除成功", res)
				_this.onLoad()
			}
		})
	},

	// 修改数据函数模板
	xiugai() {
		DB.doc(id).update({
			data: {
				name: '小明',
				age: 12
			},
			success(res) {
				console.log(res)
			}
		})
	},
	/**
	 * 页面的初始数据
	 */
	data: {
		isTabs: '',
		isOn: false,
		scrollTop: 0,
		isIphoneX: '',
		into: '',
		Height: '',
    info: {}, //自己的openid
    page:{
      current:0,
      pageSize:10
    },
    user_value: '',
    user:null,
		info_list: [],
		emoji_list: [{
			name: '[微笑]',
			imgSrc: '../../images/emoji/1.png'
		}, {
			name: '[大哭]',
			imgSrc: '../../images/emoji/2.png'
		}, {
			name: '[开心]',
			imgSrc: '../../images/emoji/3.png'
		}, {
			name: '[可爱]',
			imgSrc: '../../images/emoji/4.png'
		}, {
			name: '[面无表情]',
			imgSrc: '../../images/emoji/5.png'
		}, {
			name: '[难过]',
			imgSrc: '../../images/emoji/6.png'
		}, {
			name: '[蛇]',
			imgSrc: '../../images/emoji/7.png'
		}, {
			name: '[狐狸]',
			imgSrc: '../../images/emoji/8.png'
		}, {
			name: '[老虎]',
			imgSrc: '../../images/emoji/9.png'
		}, {
			name: '[蜜蜂]',
			imgSrc: '../../images/emoji/10.png'
		}, {
			name: '[狮子]',
			imgSrc: '../../images/emoji/11.png'
		}, {
			name: '[长颈鹿]',
			imgSrc: '../../images/emoji/12.png'
		}, {
			name: '[树叶]',
			imgSrc: '../../images/emoji/13.png'
		}, {
			name: '[植物]',
			imgSrc: '../../images/emoji/14.png'
		}, ]
	},
	// 输入事件
	input_value(e) {
		// console.log(e.detail.value)
		this.setData({
			user_value: e.detail.value
		})
	},
	// 发送事件
	sned111() {
		var _this = this;
		if (!this.data.user_value) {
			return false;
		}
		// 拿缓存数据
		var userInfo = wx.getStorageSync('userInfo');
		DB.add({
			data: {
				avatarUrl: userInfo.avatarUrl, //头像
				nickName: userInfo.nickName, //昵称
				value: _this.data.user_value, //消息内容
			},
			success(res) {
				console.log(res)
				_this.setData({
					user_value: ''
				})
			}
		})
  },
  /**
   * 获取聊天内容
   */
  async getChatMsg(){
   const  res = await groupMsgContentPage({'groupChatId':this.data.chatId ,...this.data.page})
   this.setData({
    info_list:res.data.records,
    baseUrl:res.baseUrl
   })
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
    let user = await getAppUser();
    this.setData({
      chatId:options.id,
      user
    })
   // 设置标题文字
   wx.setNavigationBarTitle({
     title: options.name,
   })
   this.getChatMsg();
		//适配iPhoneX
		let isIphoneX = app.globalData.isIphoneX;
		this.setData({
			isIphoneX: isIphoneX
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
   
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	// 发送表情包
	sendEmoji(e) {
		// sconsole.log(e)
		var src = e.currentTarget.dataset.src;
		var _this = this;
		// 拿缓存数据
		var userInfo = wx.getStorageSync('userInfo');
		DB.add({
			data: {
				avatarUrl: userInfo.avatarUrl, //头像
				nickName: userInfo.nickName, //昵称
				emoji: src, //消息内容
			},
			success(res) {

			}
		})

	},
	// 关闭所有tab框
	offEmoji() {
		if (this.data.isOn == true) {
			this.setData({
				isOn: false,
				Height: this.data.Height + 130
			})
			this.onReady()
		}
	},



	// 点击表情包区域
	onEmoji() {
		if (this.data.isOn == false) {
			this.setData({
				isTabs: 'emoji',
				isOn: true,
				Height: this.data.Height - 130
			})
			this.onReady()
		} else if (this.data.isOn) {
			if (this.data.isTabs == "features") {
				this.setData({
					isTabs: 'emoji',
				})
				this.onReady()
			} else {
				this.setData({
					isOn: false,
					Height: this.data.Height + 130
				})
				this.onReady()
			}
		}

	},

	// 打开+号功能框
	onFeatures() {
		if (this.data.isOn == false) {
			this.setData({
				isTabs: "features",
				isOn: true,
				Height: this.data.Height - 130
			})
			this.onReady()

		} else if (this.data.isOn) {
			if (this.data.isTabs == 'emoji') {
				this.setData({
					isTabs: 'features',
				})
				this.onReady()
			} else {
				this.setData({
					isOn: false,
					Height: this.data.Height + 130
				})
				this.onReady()
			}

		}
	},

	// 查看用户
	toAddUser() {
		wx.navigateTo({
			url: '../userList/index',
		})
	}

})