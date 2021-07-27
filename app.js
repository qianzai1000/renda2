
//app.js
// require("./utils/ald-stat.js")
import appFunc from './utils/appFunc.js'
import appData from './utils/appData.js'
 
App({//在子页面通过 const app = getApp()获取全局变量
    ...appFunc,
    globalData: {
        ...appData,
        versionLimitInfo: {
          renda: 0,
        },
        isIOS: null,
        isWin: null,
        isMac: null,
        isFullScreen: null,
        themeColor: "white",
    },
    onLaunch: function (options) {

        //==========================版本更新==============================
        const systemInfo = wx.getSystemInfoSync()
        console.log(systemInfo)
        this.checkPlatform(systemInfo)
        this.checkFullScreen(systemInfo)
        this.checkUpdateApp()
    },
    checkPlatform(systemInfo) {
        if (systemInfo.platform === 'windows') {
          this.globalData.isWin = true
        } else {
          this.globalData.isWin = false
        }
        if (systemInfo.platform === 'mac') {
          this.globalData.isMac = true
        } else {
          this.globalData.isMac = false
        }
        if (systemInfo.platform == 'devtools') {
          if (systemInfo.system.indexOf('iOS') > -1) {
            this.globalData.isIOS = true
          } else {
            this.globalData.isIOS = false
          }
          if (systemInfo.system.includes('mac')) {
            this.globalData.isMac = true
          } else {
            this.globalData.isMac = false
          }
        } else if (systemInfo.platform == 'ios') {
          this.globalData.isIOS = true
        } else {
          this.globalData.isIOS = false
        }
    },
    checkFullScreen(systemInfo) {
        if (['414896', '375812', '7681024', '8341112', '10241366'].includes(systemInfo.screenWidth + '' + systemInfo.screenHeight)) {
          this.globalData.isFullScreen = true
        } else {
          this.globalData.isFullScreen = false
        }
    },
    checkUpdateApp() {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          wx.showToast({
            title: '发现新版本，正在更新中...',
            icon: 'none'
          })
        }
      })
      updateManager.onUpdateReady(function () {
        updateManager.applyUpdate()
      })
      updateManager.onUpdateFailed(function () {
        wx.showToast({
          title: '新版本下载失败',
          icon: 'none'
        })
      })
    },
    onPageNotFound(res) {
      console.log(res)
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    onError(err) {
      console.log(err)
    },
      
    
})