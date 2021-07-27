const config = require('../config/config.js')

export default {
  BASE_URL: config.BASE_URL,
  DANTU_SOURCE: '1',
  DUOTU_SOURCE: '4',
  BATCH_SOURCE: '5',
  canvasBaseLength: 1000,
  canvas2dBaseLength: 1000,
  // canvas2dBaseLength: 800,
  ossBaseUrl: '',
  cdnBaseUrl: '',
  windowWidth: wx.getSystemInfoSync().windowWidth,
  dpr: wx.getSystemInfoSync().pixelRatio,
  shareTitle: 'yue-tv',
  signDefaultImg: ''
}
