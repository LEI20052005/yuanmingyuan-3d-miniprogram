/**
 * 导览页面 - pages/home/home.js
 * 功能：全屏展示手绘地图，点击热区直接跳转到对应建筑的3D修复模型
 */

Page({
  /**
   * 页面数据
   * 每个热区配置：name-显示名称, model-对应的3D模型文件名
   */
  data: {
    // 热区配置（相对于图片尺寸的百分比位置）
    // 注意：model 必须与云存储中的实际文件名完全一致
    hotspots: [
      {
        id: 'huanghuazhen',
        name: '黄花阵',
        model: '黄花亭.glb',
        position: { x: 30, y: 35 }
      },
      {
        id: 'fangwaiguan',
        name: '方外观',
        model: '放外观.glb',
        position: { x: 58, y: 43 }
      },
      {
        id: 'huayuanmen',
        name: '花园门北门',
        model: '花园门.glb',
        position: { x: 23, y: 55 }
      },
      {
        id: 'haiyantang',
        name: '海晏堂',
        model: '海晏堂.glb',
        position: { x: 70, y: 63 }
      },
      {
        id: 'xieqiqu',
        name: '谐奇趣',
        model: '谐奇趣.glb',
        position: { x: 30, y: 75 }
      },
      {
        id: 'guanshuifa',
        name: '观水法',
        model: '观水法.glb',
        position: { x: 63, y: 82 }
      }
    ],
    
    // 地图图片地址
    mapImageUrl: 'https://3dmodel-yuanmingyuan.com/云游圆明园.jpg'
  },

  /**
   * 生命周期函数 - 页面加载
   */
  onLoad: function(options) {
    console.log('导览页面加载');
  },

  /**
   * 生命周期函数 - 页面显示
   */
  onShow: function() {
    // 更新tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0  // 导览是第1个tab（索引0）
      });
    }
  },

  /**
   * 地图图片加载完成回调
   */
  onMapLoad: function(e) {
    console.log('地图图片加载完成');
  },

  /**
   * 热区点击事件处理
   * 点击后直接跳转到对应建筑的3D修复模型页面
   */
  onHotspotTap: function(e) {
    const hotspotId = e.currentTarget.dataset.id;
    
    // 在热区列表中查找对应的热区数据
    const hotspot = this.data.hotspots.find(h => h.id === hotspotId);
    
    if (!hotspot) {
      console.error('未找到热区数据:', hotspotId);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
      return;
    }
    
    console.log('点击热区:', hotspot.name, '-> 模型:', hotspot.model);
    

    
    // 直接跳转到3D模型页面，携带模型文件名和建筑名称
    wx.navigateTo({
      url: `/pages/modelViewer/modelViewer?model=${hotspot.model}&name=${encodeURIComponent(hotspot.name)}`,
      fail: function(err) {
        wx.hideLoading();
        console.error('跳转失败:', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function() {
    return {
      title: '云游圆明园 - 3D导览',
      path: '/pages/home/home'
    };
  }
});
