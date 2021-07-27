import bus from '../utils/eventBus.js'
import common from '../utils/common.js'
import { getRandomNum } from '../utils/util'

const rq = (resolve, reject, params, header) => {
  console.log( params, header)
  wx.request({
    url: params.url,
    method: params.method || 'GET',
    data: params.data || {},
    header: header?header:{},
    success(res) {
      resolve(res)
      // if (res.code == 200) {
      //   resolve(res)
      // } else {
      //   reject(res)
      // }
    },
    fail(err) {
      let title = '请求异常'
      // wx.reportAnalytics('error_log', {
      //   title: title,
      //   time: common.getNowTime(),
      //   version: common.version,
      //   rid,
      //   usersn: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').userSn : '',
      //   openid: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').openid : '',
      //   params: JSON.stringify(params.data),
      //   url: params.url,
      //   usertoken: wx.getStorageSync('usertoken'),
      //   msg: JSON.stringify(err),
      // });
      // reject(err)
    }
  })
}

export default function wxRequest(params, header) {
  return new Promise((resolve, reject) => {
    rq(resolve, reject, params ,header)

    // if (!common.isLogin && params.unNeedLogin !== true) {
    //   const f_rq = () => {
    //     rq(resolve, reject, config, params)
    //   }
    //   bus.on('login', f_rq, params.url)
    // } else {
    //   rq(resolve, reject, config, params)
    // }
  })
}
