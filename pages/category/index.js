/* 
1 给左侧菜单绑定点击事件 点击
  1 左侧菜单切换选中  
    1 获取到被点击的索引
    2 获取源数组 循环修改 
  2 同时 右侧要显示的内容跟随着改变
    1 获取之前定义 好的全局的接口的返回值
    2 动态的传递被点击的索引即可

 */
import { request } from "../../request/index.js";
Page({
  data: {
    // 左侧的菜单
    leftMenuList:[],
    // 右侧的商品数组
    rightGoodsList:[],
    // 选中的菜单的索引
    currentIndex:0 ,
    // 右侧滚动条的距离顶部的位置
    scrollTop:0
  },
  // 接口的返回值 数组格式
  // 小程序中不建议把没有必要的数据定义在data中，因为内部会把data中的所有的数据都会传递到
  // 视图层 wxml，容易导致页面特别卡 
  Cates:[],
  onLoad(){
    this.getCategoryList();
  },
  // 获取分类页面的接口数据
  getCategoryList(){
    request({url:"/categories"})
    .then(result=>{
      // 把接口的数据 赋值给我们的全局变量
      this.Cates=result;

      // 左侧菜单要的数据
      const leftMenuList=this.Cates.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}));
      // 大家电   result[0].children
      const rightGoodsList=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  },
  // 左侧菜单点击事件
  handleMenuChange(e){
    // 1 获取索引
    const {index}=e.currentTarget.dataset;
    // 2 根据索引来获取右侧内容 要渲染的数据 
    const rightGoodsList=this.Cates[index].children;
    // 3 控制右侧的滚动条的滚动距离
    this.setData({
      currentIndex:index,
      rightGoodsList,
      scrollTop:0
    })

    
  }
})