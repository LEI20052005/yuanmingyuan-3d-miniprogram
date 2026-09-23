Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#FF8C00",
    list: [
      {
        pagePath: "/pages/home/home",
        text: "导览",
        icon: "/images/导览.jpg",
        selectedIcon: "/images/导览.jpg"
      },
      {
        pagePath: "/pages/appreciate/appreciate",
        text: "鉴赏",
        icon: "/images/鉴赏.jpg",
        selectedIcon: "/images/鉴赏.jpg"
      },
      {
        pagePath: "/pages/models/models",
        text: "首页",
        icon: "/images/首页.jpg",
        selectedIcon: "/images/首页.jpg"
      },
      {
        pagePath: "/pages/repair/repair",
        text: "修复",
        icon: "/images/修复.jpg",
        selectedIcon: "/images/修复.jpg"
      },
      {
        pagePath: "/pages/settings/settings",
        text: "寻趣",
        icon: "/images/我的.jpg",
        selectedIcon: "/images/我的.jpg"
      }
    ]
  },

  attached() {
    this.updateSelected()
  },

  pageLifetimes: {
    show() {
      this.updateSelected()
    }
  },

  methods: {
    updateSelected() {
      const pages = getCurrentPages()

      // 防御性判断：页面栈为空或当前页面对象不存在时，直接返回
      if (!pages || pages.length === 0) {
        return
      }

      const currentPage = pages[pages.length - 1]
      if (!currentPage || !currentPage.route) {
        return
      }

      const currentRoute = '/' + currentPage.route

      const selected = this.data.list.findIndex(item => item.pagePath === currentRoute)
      if (selected !== -1) {
        this.setData({ selected })
      }
    },

    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path

      if (this.data.selected === data.index) return

      wx.switchTab({
        url,
        fail: () => {
          wx.navigateTo({
            url
          })
        }
      })
    }
  }
})
