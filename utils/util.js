
const formatTime = date => {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  //获取当前时间  
  var n = timestamp * 1000;
  var date = new Date(n);
  var date = new Date(n);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day,hour, minute, second].map(formatNumber).join('') 
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')+" "+ [hour, minute, second].map(formatNumber).join(':')
}
const formatDate1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + 7
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')+" "+ [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/***
 *路由跳转 Top
 * wx.switchTab    == 1 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * wx.reLaunch     == 2 关闭所有页面，打开到应用内的某个页面
 * wx.redirectTo   == 3 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
 * wx.navigateTo == 4 保留当前页面，跳转到某个页面。但是不能跳到 tabbar 页面使用wx.navigateBack可以返回到原页面最多十层
 * wx.navigateBack == 5 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层
 * digital ====  1~5
 * jumpurl === 跳转的路径
 */
const Top = (digital,jumpurl)=>{
  switch (digital){
    case 1 :
        wx.switchTab({
          url: jumpurl,
        })
        break
    case 2:
        wx.reLaunch({
          url: jumpurl,
        })
        break
    case 3:
      wx.redirectTo({
        url: jumpurl,
      })
      break
    case 4:
      wx.navigateTo({
        url: jumpurl,
      })
      break
    case 5:
      wx.navigateBack({
        delta: parseInt(jumpurl)
      })
      break
  }
}


module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  formatDate1:formatDate1,
  Top: Top
}
