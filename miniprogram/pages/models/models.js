Page({
  data: {
    hintAnimation: null,
    startY: 0,
    startYTime: 0,
    showHelpModal: false
  },

  onLoad() {
    this.createHintAnimation()
  },

  // ========== 使用说明 ==========
  showHelp() {
    this.setData({
      showHelpModal: true
    })
  },

  hideHelp() {
    this.setData({
      showHelpModal: false
    })
  },

  stopBubble() {},

  // ========== 返回按钮 ==========
  goBack() {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack()
    } else {
      // 如果是首页，不做操作或提示
      wx.showToast({
        title: '已是首页',
        icon: 'none'
      })
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.createHintAnimation()
  },

  createHintAnimation() {
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.setData({
      hintAnimation: animation.export()
    })
  },

  handleTouchStart(e) {
    this.setData({
      startY: e.touches[0].clientY,
      startYTime: Date.now()
    })
  },

  handleTouchMove(e) {
    const currentY = e.touches[0].clientY
    const deltaY = currentY - this.data.startY

    if (deltaY < -50) {
      const animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      animation.opacity(0).translateY(-50).step()
      this.setData({
        hintAnimation: animation.export()
      })
    }
  },

  handleTouchEnd(e) {
    const endY = e.changedTouches[0].clientY
    const deltaY = endY - this.data.startY
    const endTime = Date.now()
    const deltaTime = endTime - this.data.startYTime

    if (deltaY < -80 && deltaTime < 500) {
      wx.switchTab({
        url: '/pages/home/home'
      })
    } else {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      })
      animation.opacity(1).translateY(0).step()
      this.setData({
        hintAnimation: animation.export()
      })
    }
  }
})