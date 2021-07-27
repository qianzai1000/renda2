//全局统一的变量，在此单独配置
const app_code = 'mobile_app_003'
const device_id = wx.getStorageSync('openId')
const device_type = 'smart_phone'
const secret = 9856785768;

//服务器地址配置
const env = __wxConfig.envVersion
console.log(env)
let host = {} //生产
if (env === 'develop') {  //开发版
  host.hostOnline = 'https://online.iyuetv.com'
  host.hostH5 = 'https://h5.iyuetv.com'
  host.hostTest180705 = 'https://test180705.chances.com.cn'
  host.hostUcenter = 'https://ucenter.iyuetv.com'
  host.hostVas2 = 'https://vas2.yst.aisee.tv'
  host.hostWx = 'https://wx.iyuetv.com'
} else if (env === 'trial') {  //体验版
  host.hostOnline = 'https://online.iyuetv.com'
  host.hostH5 = 'https://h5.iyuetv.com'
  host.hostTest180705 = 'https://test180705.chances.com.cn'
  host.hostUcenter = 'https://ucenter.iyuetv.com'
  host.hostVas2 = 'https://vas2.yst.aisee.tv'
  host.hostWx = 'https://wx.iyuetv.com'
}
let baseUrl = host 
let baseImgUrl = host 

module.exports = {
  APP_CODE: app_code,
  DEVICE_ID: device_id,
  DEVICE_TYPE: device_type,
  SECRET: secret,
  BASE_URL: baseUrl,
  BASE_IMG_URL: baseImgUrl
}