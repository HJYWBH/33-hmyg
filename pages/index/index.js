// 1 引入自己封装过的接口的代码
// 2 以前vue node中引入js文件的时候  
// 3 小程序中 不要省略 建议把引入的路径名补充完整 
import { request } from "../../request/index.js";


Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航
    navCateList: [],
    // 楼层数组
    floorList: []
  },

  // 页面开始加载触发
  onLoad() {
    this.getSwiperList();
    this.getNavCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList() {
    /* 回调地狱！！！ */
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          // swiperList: result.data.message
          swiperList: result
        })
      })
  },
  // 获取分类导航
  getNavCateList() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          navCateList: result
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({ url: "/home/floordata" })
    .then(result => {
      this.setData({
        floorList: result
      })
    })
  }
})