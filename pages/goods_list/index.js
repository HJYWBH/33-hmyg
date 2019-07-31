/* 
1 页面的动态渲染 
2 上滑页面  滚动条触底 加载下一页数据功能 
  1 页面触底事件  onReachBottom 
  2 先判断 有没有下一页数据
    1 当前的页码 pagenum  和 总页数 比较 
      总页数 = Math.ceil(总条数  / 页容量 )
      总页数 = Math.ceil(21/10)= 3 
        总条数 ：21 
        页容量：10  

      当前的页码 >= 总页数 没有下一页数据 否则就相反
  3 在 onReachBottom 进行判断有没有下一页数据
    1 有数据
      1 页码 pagenum++ 
      2 直接发送请求获取数据
      3 数据回来后 对商品数组进行拼接 而不是全部替换
 */
import { request } from "../../request/index.js";
Page({
  data: {
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false }
    ],
    // 页面要渲染的商品数组
    goodsList: []
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
  // 总页数
  TotalPages:1,

  // 页面开始加载就触发
  // 它的形参可以获取到url上的参数
  onLoad(options) {
    // console.log(options);

    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  getGoodsList() {
    request({ url: "/goods/search", data: this.QueryParams })
      .then(result => {
      //  计算总页数
      this.TotalPages=Math.ceil(result.total/this.QueryParams.pagesize);
        this.setData({
          // 要拼接数组
          goodsList: [...this.data.goodsList,...result.goods]
        })
      })
  },
  // 子组件触发的事件
  handleItemChange(e) {
    // 获取传递过来的索引
    const { index } = e.detail;
    // 获取tabs数组
    let { tabs } = this.data;
    // 循环修改tabs数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs });
  },
  // 页面上拉 滚动条触底事件
  onReachBottom() {
  //  1 判断有没有下一页数据
  if(this.QueryParams.pagenum>=this.TotalPages){
    // 没有下一页数据
    console.log("没有下一页数据");
  }else{
    // 还存在下一页数据
    // console.log("还存在下一页数据");
    this.QueryParams.pagenum++;
    this.getGoodsList();
  }
  }
})