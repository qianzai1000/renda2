// pages/mine/mine.js
import { memberInformation,checkBoundSTB,unBoundSTB,getnewicon,boundSTB,getwhiteurllist} from '../../api/store.js' 
import { formatTime} from '../../utils/util.js' 
import { MD5} from '../../utils/md5.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIdx:4,
    showModal: false,
    userInfo:false,
    // access_token:wx.getStorageSync('access_token')?wx.getStorageSync('access_token'):"ll0gc0kzDuimDvVmBR40ZIT8vdfklTTL",
    // vipId:wx.getStorageSync('vipId')?wx.getStorageSync('vipId'):'APP786008394709565149',
    // member_id:wx.getStorageSync('member_id')?wx.getStorageSync('member_id'):'m_c50fcbd5',
    access_token:wx.getStorageSync('access_token'),
    vipId:wx.getStorageSync('vipId'),
    member_id:wx.getStorageSync('member_id'),
    memberInfor:{
      mobile:"",
      nickname:"",
      headimgurl:"",
      levelname:"",
    },
    number:'1231231',//设备
    equipmentInfor:{
      tvSn:"未绑定(请绑定)",
      union_id:''
    },
    listingobjects:[],
    showModal1:false
  },

  // 点击领券中心事件
  lingTap(e){
    console.log('领券中心')
    console.log(e)
    var index = e.currentTarget.dataset.value
    console.log(index)
    if(!wx.getStorageSync('member_id')){
      wx.navigateTo({
        url: '../my/login/login',
      })
    }else{
      if (this.data.listingobjects[0].id.indexOf('https://h5.iyuetv.com/iptvh5/test/') != -1) {
        var url = this.data.listingobjects[index].id.replace(/dist/g, "member/applet")
      // if(this.data.listingobjects[0].id.indexOf('https://h5.iyuetv.com/iptvh5/test/member/mobile/')!=-1){
      //   var url = this.data.listingobjects[index].id.replace(/mobile/g, "applet")
        if(index == 6){
          url = 'https://h5.iyuetv.com/iptvh5/test/member/applet/index.html#/addressEdit'
        }
        // console.log('../out/out?link='+url+'?devno='+wx.getStorageSync('vipId'))
        wx.navigateTo({
          // url: '../out/out?link='+url+'?devno='+wx.getStorageSync('vipId')
          url: '../out/out?link='+encodeURIComponent(url+"?devno="+wx.getStorageSync('vipId'))
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '暂未开放此功能',
        })
      }
    }

  },
  //退出登录
  noLogin(){
    // wx.reLaunch({
    //   url: '../../pages/my/login/login',
    // })
    wx.navigateTo({
      url: '../login/login?title=设置',
    })
  },

  // 关闭模态框事件
  colse(){
    this.setData({
      showModal : false
    })
  },
  maskClose1(){
    console.log("okoko")
    this.setData({
      showModal1:false
    })
  },
  //获取会员信息
  getMemberInfo(){
    let that = this
    // devno,requestId,token
    let devno = that.data.vipId
    console.log(devno)
    console.log(wx.getStorageSync('vipId'))
    let requestIdstr = formatTime()
    for (var i = 0; i < 6; i++) {
      requestIdstr += parseInt(Math.random() * (10))
    }
    let requestId = requestIdstr
    // SECRET_APP_CHECK = "SRdU3kfFHoPAwBHQ";
    // SECRET_APP_CHECK_TEST = "U4aX2meC8QSlkXOM";
    let secret = 'SRdU3kfFHoPAwBHQ'
    let token = MD5(this.data.vipId + requestId + secret)
    memberInformation (devno,requestId,token).then(function(data){
      console.log(data.data)
      that.setData({ memberInfor: {
        mobile:data.data.mobile,
        nickname:data.data.nickname,
        headimgurl:data.data.headimgurl,
        levelname:data.data.levelname,
        }
      })
    console.log(that.data.memberInfor)
    })
  },
  getcheckBoundSTB(){
    var that = this
    let reqData = {
      // app_code:'mobile_app_001',
      app_code: 'mobile_app_003',
      // device_id:'device_0001',
      device_id: wx.getStorageSync('openId'),
      device_type: 'smart_phone',
      timestamp: formatTime()
  }
  // let secret = 3412341324
  let secret = 9856785768;
    let checkBoundSTBheader = {
      app_code:reqData.app_code,
      device_id:reqData.device_id,
      device_type:reqData.device_type,
      timestamp:reqData.timestamp,
      signature:MD5(reqData.app_code+'#'+reqData.device_id+'#'+secret+'#'+reqData.timestamp+'#'+'access_token='+that.data.access_token+'&member_id='+that.data.member_id)
    }
    checkBoundSTB(that.data.access_token,that.data.member_id,{},checkBoundSTBheader).then(function(data){
        if(data.data.result_set.length>0){
          that.setData({
            'equipmentInfor.tvSn':data.data.result_set[0].tvSn,
            'equipmentInfor.union_id':data.data.result_set[0].union_id
          })
          try {
            wx.setStorageSync('tpServer',data.data.result_set[0].platformServer.tpServer)
            wx.setStorageSync('tvPlatform', data.data.result_set[0].tvPlatform )
            wx.setStorageSync('tvSn',data.data.result_set[0].tvSn )
            wx.setStorageSync('union_id', data.data.result_set[0].union_id )
          } catch (e) { }
        }
        
        // that.scanCode()
    })
  },
  toUnBoundSTB(){
    let that = this
    let union_id = that.data.equipmentInfor.union_id
    let reqData = {
      // app_code:'mobile_app_001',
      app_code: 'mobile_app_003',
      // device_id:'device_0001',
      device_id: wx.getStorageSync('openId'),
      device_type: 'smart_phone',
      timestamp: formatTime()
  }
  // let secret = 3412341324
  let secret = 9856785768;
    let toUnBoundSTBheader = {
      app_code:reqData.app_code,
      device_id:reqData.device_id,
      device_type:reqData.device_type,
      timestamp:reqData.timestamp,
      signature:MD5(reqData.app_code+'#'+reqData.device_id+'#'+secret+'#'+reqData.timestamp+'#'+'access_token='+that.data.access_token+'&member_id='+that.data.member_id)
    }
    let reqbody = {
      union_id:union_id
    }
    unBoundSTB(that.data.access_token,that.data.member_id,reqbody,toUnBoundSTBheader).then(function(data){
      console.log(data)
      if(data.data.code == 200){
        that.setData({
          'equipmentInfor.tvSn':'解除绑定(未绑定)',
          'equipmentInfor.union_id':''
        })
        wx.removeStorageSync('tpServer')
        wx.removeStorageSync('tvPlatform')
        wx.removeStorageSync('tvSn')
        wx.removeStorageSync('union_id')
      }
    })
  },
  //投屏扫码
  scanCode(e){
    console.log("扫码")
    let that = this
    console.log(e)
    console.log(wx.getStorageSync('member_id'))
    if(wx.getStorageSync('member_id') == null ||　wx.getStorageSync('member_id') ==　""){
      wx.showModal({
        title: '温馨提示',
        content: '请先登录',
        success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../my/login/login',
          })
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
      })
    }else{
      
      let she = e.target.dataset.value;
      console.log(she)
      if(that.data.equipmentInfor.union_id){
        console.log("弹出弹窗")
        wx.showModal({
          title: '温馨提示',
          content: '确定需要解除绑定吗？',
          success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.toUnBoundSTB()
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
        })
      }else{
        wx.navigateTo({
          url: '../my/screenProjection/screenProjection',
        })
        
      }
    }
  },
  maskClose(){
    this.setData({
      showModal : false
    })
  },
 // 轮播图 跳转页面
  onlogin(){
    console.log(wx.getStorageSync('member_id'))
    if(wx.getStorageSync('member_id')){
      wx.navigateTo({
        url: '../personal/personal?title=个人信息',
      })
      this.setData({
        loginNo:true
      })
    }else{
      wx.navigateTo({
        url: '../my/login/login',
      })
      this.setData({
        loginNo:false
      })
    }
  },

  //扫一扫
  sao(){
    console.log("okok")
    let that = this
    if(wx.getStorageSync('member_id') == null ||　wx.getStorageSync('member_id') ==　""){
      wx.showModal({
        title: '温馨提示',
        content: '请先登录',
        success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../my/login/login',
          })
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
      })
    }else{
      wx.scanCode({
        success (res) {
          if(res.result.search("http") != -1){
            let link = res.result
            if(that.getQueryString(link,"tvUserId")){
              that.toBoundSTB(that.getQueryString(link,"tvUserId"),that.getQueryString(link,"tvSn"),that.getQueryString(link,"tvPlatform"))
            }else{
              getwhiteurllist({"url":res.result}).then(function(data){
                if(data.data.resultcode == "0000"){
                  if(res.result.search("https://h5.iyuetv.com/iptvh5/test/qrcode/qrcode.htm")!=-1){
                    wx.navigateTo({
                      url: '../out/out?link='+encodeURIComponent(res.result+"&vipId="+wx.getStorageSync('vipId'))
                    })
                    return
                  }
                  wx.navigateTo({
                    url: '../out/out?link='+encodeURIComponent(res.result),
                  })
                }else{
                  wx.showToast({
                    title: '无效二维码',
                    duration:2000
                  })
                }
              })
              
            }
          }else{
            try {
              that.toBoundSTB(JSON.parse(res.result).tvUserId,JSON.parse(res.result).tvSn,JSON.parse(res.result).tvPlatform)
            } catch (error) {
              wx.showToast({
                title: '二维码不正确',
                duration:2000
              })
            }
          }
        }
      })
    }
  },
  toBoundSTB(tvUserId,tvSn,tvPlatform){
    console.log(tvUserId,tvSn,tvPlatform)
    var that = this
    let reqData = {
      // app_code:'mobile_app_001',
      app_code: 'mobile_app_003',
      // device_id:'device_0001',
      device_id: wx.getStorageSync('openId'),
      device_type: 'smart_phone',
      timestamp: formatTime()
  }
  // let secret = 3412341324
  let secret = 9856785768;
    let toBoundSTBheader = {
      app_code:reqData.app_code,
      device_id:reqData.device_id,
      device_type:reqData.device_type,
      timestamp:reqData.timestamp,
      signature:MD5(reqData.app_code+'#'+reqData.device_id+'#'+secret+'#'+reqData.timestamp+'#'+'member_id='+wx.getStorageSync('member_id')+'&access_token='+wx.getStorageSync('access_token'))
    }
    console.log(toBoundSTBheader)
    console.log(reqData.app_code+'#'+reqData.device_id+'#'+secret+'#'+reqData.timestamp+'#'+'access_token='+wx.getStorageSync('access_token')+'&member_id='+wx.getStorageSync('member_id'))
    let reqbody = {
      tvUserId:tvUserId,
      tvSn:tvSn,
      tvPlatform:tvPlatform
    }
    //判断是否有值
    console.log(reqbody)
    that.setData({
      reqbody:reqbody
    })
    boundSTB(wx.getStorageSync('access_token'),wx.getStorageSync('member_id'),reqbody,toBoundSTBheader).then(function(data){
      console.log(data)
      wx.setStorageSync('tvSn', data.data.result.tvSn)
      console.log(data.data.result.tvSn)
      if(data.data.code == 200){
        try {
          wx.setStorageSync('tvUserId',data.data.result.tvUserId)
          wx.setStorageSync('tvPlatform', tvPlatform )
          wx.setStorageSync('union_id',data.data.result.union_id)
          wx.setStorageSync('tpServer', data.data.result.platformServer.tpServer)
          wx.setStorageSync('tvSn', data.data.result.tvSn)
        } catch (e) { }
      }
      that.setData({
        'equipmentInfor.tvSn':data.data.result.tvSn,
        'equipmentInfor.union_id':data.data.result.union_id
      })
    })
   
  },
  // JS获取URL中参数值的方法
  getQueryString: function (url,name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    // var r = window.location.search.substr(1).match(reg);
    var r = url.substr(url.indexOf('?')*1+1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    console.log(wx.getStorageSync('member_id'))
    getnewicon().then(function(data){
      console.log(data.data.respbody.listingobjects)
      let urlArr = data.data.respbody.listingobjects
      urlArr.push({id:"https://h5.iyuetv.com/iptvh5/test/member/mobile/index.html#/addressEdit"})
      
      that.setData({
        listingobjects:data.data.respbody.listingobjects
      })
    })
    console.log(wx.getStorageSync('member_id'))
    if(wx.getStorageSync('member_id')){
      that.setData({
        access_token:wx.getStorageSync('access_token'),
        vipId:wx.getStorageSync('vipId'),
        member_id:wx.getStorageSync('member_id'),
        loginNo:true,
      })
      console.log(this.data.member_id)
      that.getMemberInfo()
      that.getcheckBoundSTB()
      
    }else{
      that.setData({ memberInfor: {
        mobile:'',
        nickname:'',
        }
      })
      that.setData({ equipmentInfor:{
        tvSn:"未绑定(请绑定)",
        union_id:''
        }
      })
      that.setData({
        loginNo:false,
        titles:true
      })
      
    }
  },
  /**
     * 用户点击右上角分享
    */
   onShareAppMessage: function () {

  }
})