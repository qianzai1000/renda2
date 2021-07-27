import { login } from '../api/wechatApi.js'
import { formatTime } from '../utils/util'
import bus from './eventBus.js'

let loginErrCount = 0
let loginErrCountMax = 5
let isLoginLock = false

const logFail = () => {
  common.isLogin = false
  isLoginLock = false
  loginErrCount++
  if (loginErrCount < loginErrCountMax) {
    wx.showToast({
      title: '登录失败, 重新登录中',
      icon: 'none'
    })
    setTimeout(() => {
      common.handleLogin()
    }, 2000)
  } else {
    loginErrCount = 0
    wx.showToast({
      title: '登录失败',
      icon: 'none'
    })
  }
}

const common = {
  isLogin: false,
  version: 'v3.7.2',
  getNowTime() {
    return formatTime(new Date())
  },
  handleLogin(channelSn='') {
    if (isLoginLock) {
      return
    }
    isLoginLock = true
    const isIos = wx.getSystemInfoSync().platform === 'ios'
    wx.login({
      success: (options) => {
        login({
          code: options.code,
          isIOS: isIos ? 1 : 0,
          channelSn
        }).then(res => {
          isLoginLock = false
          res.data.userInfo.nickName = res.data.userInfo.nickname
          res.data.userInfo.headImgUrl = res.data.userInfo.headimgurl
          wx.setStorageSync('usertoken', res.data.userToken)
          wx.setStorageSync('userInfo', res.data.userInfo)
          this.isLogin = true
          bus.emit && bus.emit('login')
        }).catch((err) => {
          logFail()
        })
      },
      fail: (err) => {
        logFail()
        wx.reportAnalytics('error_log', {
          title: '微信登录失败',
          time: common.getNowTime(),
          version: common.version,
          rid: '',
          usersn: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').userSn : '',
          openid: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').openid : '',
          params: '',
          url: '',
          usertoken: wx.getStorageSync('usertoken'),
          msg: JSON.stringify(err),
        });
      }
    })
  }
}

export default common
