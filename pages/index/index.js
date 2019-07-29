// pages/index/index.js
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航
    navCateList: []
  },

  // 页面开始加载触发
  onLoad() {
    this.getSwiperList();
    this.getNavCateList();
  },

  // 获取轮播图数据
  getSwiperList() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result.data);
        // console.log(result);
        this.setData({
          swiperList: result.data.message
        })
      }
    });

  },
  // 获取分类导航
  getNavCateList() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (result) => {
        this.setData({
          navCateList: result.data.message
        })
      }
    });

  }
})