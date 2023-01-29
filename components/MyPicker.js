// compontes/myPicker/myPicker.js
Component({
  options: {
      multipleSlots: true
  },
  properties: {
      // picker数组
      pickerArray:{
          type: Array,
          value: ['恐怖','rpg','1',2,3]
      },
      // 选中的索引
      pickerIndex:{
          type:String,
          value:'0'
      },
      // picker滑中的索引
      pickerSelected:{
          type:String,
          value:'0'
      },
      // picker是否隐藏
      pickerHidden:{
          type:Boolean,
          value:true
      }
  },
  data: {

  },
  methods: {  // 组件方法
      // 选择picker数据
      bindChange: function (e) {
        console.log(e)
          this.setData({
            pickerIndex: e.detail.value[0]
          })
          this.triggerEvent('change', { value: this.data.pickerIndex })
      },
      // picker显示
      pickerShow: function () {
          this.setData({
              pickerHidden: false
          })
      },
      //点击确定
      pickerConfirm: function () {
          this.setData({
              pickerHidden: true,
              pickerSelected: this.data.pickerIndex
          })
          this.triggerEvent('pickerConfirm', { value: this.data.pickerArray[this.data.pickerIndex].id})
      },
      //点击取消
      pickerCancel: function () {
          this.setData({
              pickerHidden: true
          })
      },
      //防止蒙版穿透
      doNotMove: function () {
          return;
      },
      // 点击蒙版关闭
      catchWrap: function () {
          this.setData({
              pickerHidden: true
          })
      },
      // 点击picker区域（白色区域）阻止冒泡
      catchPicker: function () {
          return;
      }
  }
})