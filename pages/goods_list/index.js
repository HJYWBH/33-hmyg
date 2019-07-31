import { request } from "../../request/index.js";
Page({
  data: {
    // 页面要渲染的商品数组
    goodsList:[]
  },
  // 接口用的参数
  QueryParams: {
    // 搜索的关键字 
    query: "",
    // 分类id
    cid: "",
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10
  },

  // 页面开始加载就触发
  // 它的形参可以获取到url上的参数
  onLoad(options) {
    // console.log(options);

    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  getGoodsList() {
    request({ url: "/goods/search" ,data:this.QueryParams})
      .then(result => {
        // console.log(result);
        this.setData({
          goodsList:result.goods
        })
      })
  }
})