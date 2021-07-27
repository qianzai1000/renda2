// components/showToast/showToast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowToast: {
      type: Boolean,
      value: true
    },
    iconToast: {
      type: String,
      value: ''
    },
    textToast: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes: {
    show() {
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
