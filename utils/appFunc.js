export default {
  getNavbarInfo() {
    try {
      const { statusBarHeight, platform } = wx.getSystemInfoSync();
      const menuBtnPosition = wx.getMenuButtonBoundingClientRect()
      const titleHeight = 20
      const btnsTop = menuBtnPosition.top - statusBarHeight + 'px'
      const btnsLeft = `calc(100vw - ${menuBtnPosition.right}px)`
      const btnWidth = (menuBtnPosition.right - menuBtnPosition.left) / 2 + 'px'
      const titleTop = menuBtnPosition.top + ((menuBtnPosition.height - titleHeight) / 2) - statusBarHeight + 'px'
      const titleMaxWidth = `calc(100vw - (100vw - ${menuBtnPosition.left}px) * 2 - 10px)`
      const titleBarHeight = 44
      const navigationBarHeight = (top - statusBarHeight) * 2 + menuBtnPosition.height
      return {
        screenHeight, 
        screenWidth, 
        windowHeight, 
        windowWidth, 
        devicePixelRatio,
        statusBarHeight,
        platform,
        btnsTop,
        btnsLeft,
        btnWidth,
        titleTop,
        titleMaxWidth,
        titleBarHeight,
        navigationBarHeight
      }
    } catch(err) {
      console.log(err)
      throw err
    }
  },

}