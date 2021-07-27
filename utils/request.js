const config = require('../config/config.js')
// const https = config.BASE_URL //请求域名
// {"content-type":"application/x-www-form-urlencoded"} post的请求头
const https = "" //请求域名
export default function requets(url,method,data,reqheaders){
    let header = method == 'POST' ? { "accept": "*/*"}:{'content-type': 'application/json/x-www-form-urlencoded'}
    console.log(`${https}${url}`)
    if(reqheaders){
      header = Object.assign(header,reqheaders)
    }
    return new Promise((resolve,reject)=>{
      wx.request({
        url:`${https}${url}`,
        method: method || 'GET',
        data:data || {},
        header: header,
        success(res) {
          resolve(res)
        },
        fail(msg){
          reject(msg)
          wx.showToast({
            title: msg,
            icon: 'success',
            duration: 2000
          })
        }
      })
    })
}