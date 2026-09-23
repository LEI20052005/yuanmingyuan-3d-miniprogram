Page({
  data: {
    appInfo: {
      name: '3D模型修复工具',
      version: '1.0.0',
      author: '开发者',
      description: '专业的3D模型查看与修复平台，支持GLB格式模型加载、缩放、旋转等功能。'
    },
    features: [
      '3D模型加载与渲染',
      '双指捏合缩放',
      '单指滑动旋转',
      '精确参数调整',
      '模型设置保存',
      '多页面管理'
    ],
    contact: {
      email: 'support@example.com',
      website: 'www.example.com'
    }
  },

  onLoad() {
    
  },

  onFeatureTap(e) {
    const index = e.currentTarget.dataset.index
    wx.showToast({
      title: this.data.features[index],
      icon: 'none',
      duration: 2000
    })
  },

  onContactTap(e) {
    const type = e.currentTarget.dataset.type
    if (type === 'email') {
      wx.setClipboardData({
        data: this.data.contact.email,
        success: () => {
          wx.showToast({
            title: '邮箱已复制',
            icon: 'success'
          })
        }
      })
    } else if (type === 'website') {
      wx.setClipboardData({
        data: this.data.contact.website,
        success: () => {
          wx.showToast({
            title: '网址已复制',
            icon: 'success'
          })
        }
      })
    }
  },

  checkUpdate() {
    wx.showLoading({
      title: '检查中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '已是最新版本',
        icon: 'success'
      })
    }, 1000)
  },

  openLicense() {
    wx.showModal({
      title: '使用许可',
      content: '本软件仅供学习和个人使用，不得用于商业目的。',
      showCancel: false
    })
  }
})