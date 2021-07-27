// components/tempalteSwiper/tempalteSwiper.js
import { everyGroupList } from '../../api/store.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,//标题
    code:String,//参数传值
    dataList:Object,
    index:Number

  },
  // 可以在 全局显示样式
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },
  ready: function () {
    // console.log(this.properties.dataList)
    
    this.setData({
      dataList:[
        {logourl:"",hz_logo:""},
        {logourl:"",hz_logo:""},
        {logourl:"",hz_logo:""},
        {logourl:"",hz_logo:""}
      ]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
//轮播图防抖事件
    swiperChange(e) {
        let { current, source } = e.detail
        //防止swiper控件卡死
        if (this.data.current == 0 && this.data.currentSwiper > 1) { //卡死时，重置current为正确索引
            this.setData({
                current: this.data.currentSwiper
            });
        } else { //正常轮转时，记录正确页码索引
            this.setData({
                currentSwiper: e.detail.current
            });
        }
    },
    //判断跳转页面
    navTo(e){
      let index = e.currentTarget.dataset.index;
      let tempalte_num = this.properties.index
      let params = {
        n:index,
        m:tempalte_num
      }
      this.triggerEvent('goPages1',params)

    }
  }
})
