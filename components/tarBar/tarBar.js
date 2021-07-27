// components/tarBar/tarBar.js
import tabbarList from "../../utils/router.js"
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {
    activeIdx: {
      type: Number,
      value: 0,
    },
    scrollTopCox: {
      type: Number,
      value: 0,
    },
    auth: {
      type: Number,
      value: 0,
      observer: 'onAuthChanged'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarList: tabbarList,
    _auth: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      console.log(e)
      const {
        idx,
        path,

      } = e.currentTarget.dataset;
      let scrollt = e.currentTarget.dataset.scrollt;
      console.log(this.data.activeIdx)
      if (idx === this.data.activeIdx) {
        this.trigger('refresh')
        return
      }
      let footerId = e.currentTarget.dataset.idx
      //判断是否登录 -- 没有就先跳登录
      console.log(footerId)
      if(footerId == 2){
        console.log(wx.getStorageSync('tvSn'))
         if(wx.getStorageSync('tvSn') == null || wx.getStorageSync('tvSn') == ""){
            wx.navigateTo({
              url: '../my/screenProjection/screenProjection',
            })
          }else if((`/${path}?scrollt=scrollt`)=='/pages/tvCtl/tvCtl?scrollt=scrollt'){
            wx.navigateTo({
              url: `/${path}?scrollt=scrollt`,
            })
          }
      }else{
        wx.switchTab({
          url: `/${path}?scrollt=scrollt`,
        })
      }
      this.triggerEvent(scrollt)
    },
    onAuthChanged(newVal) {
      wx.setStorageSync('__com-tabbar-auth', newVal)
      this.setData({
        _auth: newVal
      })
    },
    trigger(eventName, value = {}, info) {
      if (!eventName) {
        throw new TypeError('没有自定义事件名')
      }
      this.triggerEvent(eventName, value)
     
    }
  },
  ready() { },
    /** 权限显示 */
    pageLifetimes: {
      show: function () {
        this.setData({
          _auth: wx.getStorageSync('__com-tabbar-auth')
        })
      }
    },
    ready() {
      // 缓存tabber栏的高度
      const query = wx.createSelectorQuery().in(this)
      query.select('.tabbar').boundingClientRect((rect) => {
          // console.log(rect.height)
          wx.setStorageSync('tabbberHeight', rect.height)
          console.log(rect.height)
      }).exec()
    }  
})