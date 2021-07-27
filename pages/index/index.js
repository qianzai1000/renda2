// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowCollectionTipsDialog:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initNavBar()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  initNavBar() {
    this.systemInfo =  wx.getSystemInfoSync()
    const statusBarHeight = this.systemInfo.statusBarHeight
    const menuBtnPosition = wx.getMenuButtonBoundingClientRect()
    const titleHeight = menuBtnPosition.height
    const titleMarginTop = menuBtnPosition.top - statusBarHeight

    this.setData({
      statusBarHeight,
      titleHeight,
      titleMarginTop,
    })
  },
  hideCollectionTips() {
    this.setData({
      isShowCollectionTipsDialog: false
    })
    wx.setStorageSync('isShowCollectionTipsDialog', false)
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

  }
})