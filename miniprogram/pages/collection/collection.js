// 藏品列表页逻辑 - pages/collection/collection.js

Page({
  data: {
    // ========== 藏品数据数组 - 在此新增/修改藏品 ==========
    // 字段说明：
    // id: 藏品唯一标识
    // name: 藏品名称
    // image: 图片路径（建议放在 /images 目录下）
    // location: 地点信息（如 "陕西・西安碑林博物馆"）
    // intro: 历史简介
    // discovery: 发现信息
    collectionList: [
      {
        id: 1,
        name: '十二生肖铜兽首',
        image: '/images/collection/北海.jpg',  // 修改为你的图片路径
        location: '北京・圆明园',
        intro: '圆明园海晏堂前的喷水池装饰，生肖兽首会按时喷水...',
        discovery: '1860年英法联军火烧圆明园后流失海外...'
      },
      {
        id: 2,
        name: '大水法遗址',
        image: '/images/collection/大水法.jpg',
        location: '北京・圆明园',
        intro: '圆明园最壮观的欧式喷泉景观之一，现为遗址保留...',
        discovery: '乾隆时期建造，欧式风格...'
      },
      {
        id: 3,
        name: '青花瓷器',
        image: '/images/collection/故宫.jpg',
        location: '江西・景德镇',
        intro: '清代宫廷御用瓷器，精美绝伦，工艺精湛...',
        discovery: '清代官窑烧制...'
      },
      {
        id: 4,
        name: '皇家典籍',
        image: '/images/collection/黄花.jpg',
        location: '北京・故宫',
        intro: '四库全书等珍贵文献的存放地，承载着中华文化...',
        discovery: '清代编纂...'
      },
      {
        id: 5,
        name: '玉雕摆件',
        image: '/images/collection/颐和园.jpg',
        location: '江苏・苏州',
        intro: '精雕细琢的玉雕艺术品，展现中国传统工艺...',
        discovery: '清代苏州工匠制作...'
      },
      {
        id: 6,
        name: '景泰蓝瓶',
        image: '/images/collection/古建筑.jpg',
        location: '北京・宫廷造办处',
        intro: '明代景泰年间制作的宫廷御用工艺品...',
        discovery: '明清时期皇家御用...'
      }
    ]
  },

  onLoad() {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '藏品'
    })
  },

  // ========== 跳转详情页 ==========
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    // 使用 wx.navigateTo 跳转到详情页
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // ========== 导航栏跳转其他页面 ==========
  goToPage(e) {
    const page = e.currentTarget.dataset.page
    // 跳转到其他已完成的页面
    switch(page) {
      case 'home':
        wx.switchTab({
          url: '/pages/models/models'
        })
        break
      case 'guide':
        wx.switchTab({
          url: '/pages/home/home'
        })
        break
      case 'my':
        wx.switchTab({
          url: '/pages/settings/settings'
        })
        break
    }
  }
})