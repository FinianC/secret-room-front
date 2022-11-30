Component({
  /**
   * 组件的属性列表
   */
  properties: {
    holderText: {
      type: String,
      value: "请输入内容"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputVal: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearInput: function () {
      this.setData({
        inputVal: "",
      });
      this.triggerEvent("searchVal", this.data.inputVal);
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    searchBtn: function () {
      this.triggerEvent("searchVal", this.data.inputVal);
    }
  }
})