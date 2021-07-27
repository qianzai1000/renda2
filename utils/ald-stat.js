import {
  getOpenId
} from '../api/openid.js'
//==========================获取openId==============================
// if (wx.getStorageSync('openId')) {
//   console.log(wx.getStorageSync('openId'))
// } else {
  wx.login({
    success: function (res) {
      getOpenId({
        code: res.code
      }).then((data) => {
        console.log(1)
        if (data.data.openId) {
          wx.setStorageSync('openId', data.data.openId)
        } else {
          wx.setStorageSync('openId', "123455")
        }
        return data
      }).then((data) => {
        // console.log(data)
      }).catch(err => {
        wx.showToast({
          title: '获取openid失败',
          icon: 'none'
        })
      })
    }
  })
// }