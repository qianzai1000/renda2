import r from './request.js'
const config = require('../config/config.js')
export const getOpenId = (data) => {
  return r({
    url: config.BASE_URL.hostWx+'/mucenter/wechat/applet/openId.do?code=' + data.code,
    // url:"https://wx.iyuetv.com/mucenter/wechat/applet/openId.do?code=023DduFa1t25RA0UinJa1TEfmK2DduFK",
    method: 'post',
  })
}