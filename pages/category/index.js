import { request } from "../../request/index.js";
Page({
  data: {
    // 左侧的菜单
    leftMenuList:[],
    // 右侧的商品数组
    rightGoodsList:[],
    // 选中的菜单的索引
    currentIndex:0
  },
  onLoad(){
    this.getCategoryList();
  },
  // 获取分类页面的接口数据
  getCategoryList(){
    request({url:"/categories"})
    .then(result=>{
      // 左侧菜单要的数据
      const leftMenuList=result.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}));
      // 大家电   result[0].children
      const rightGoodsList=result[0].children;
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  }
})