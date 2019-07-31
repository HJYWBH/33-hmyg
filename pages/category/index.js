/* 
1 给左侧菜单绑定点击事件 点击
  1 左侧菜单切换选中  
    1 获取到被点击的索引
    2 获取源数组 循环修改 
  2 同时 右侧要显示的内容跟随着改变
    1 获取之前定义 好的全局的接口的返回值
    2 动态的传递被点击的索引即可
2 给分类页面添加一个缓存效果 
  0 h5中的 本地存储技术  localStorage 
    localStorage.setItem  存入不同类型的数据 
    1 普通的数据 数字 字符串 bool
    2 对象格式     先转成json字符串再存进去     
  1 微信小程序中 本地存储技术 
    1 不管什么类型的数据 直接存 可以直接获取  比以前的h5的本地存储更简单 
  2 再分析缓存的逻辑 
    1 发送请求之前 先判断一下有没有缓存数据
    2 假如 没有数据 (a. 直接发送新请求 获取数据 (b. 把新输入存入到缓存中 
        要存入的数据的格式  key="cates",: {time:存入的时间,data:接口返回值}
    3 有缓存数据 
      判断数据是否过期
      1 数据已经过期了  重新发送新请求去拿新的数据
      2 数据没有过期   此时 才使用缓存数据！！！
 */
import { request } from "../../request/index.js";
Page({
  data: {
    // 左侧的菜单
    leftMenuList: [],
    // 右侧的商品数组
    rightGoodsList: [],
    // 选中的菜单的索引
    currentIndex: 0,
    // 右侧滚动条的距离顶部的位置
    scrollTop: 0
  },
  // 接口的返回值 数组格式
  // 小程序中不建议把没有必要的数据定义在data中，因为内部会把data中的所有的数据都会传递到
  // 视图层 wxml，容易导致页面特别卡 
  Cates: [],
  onLoad() {
    // 1 获取缓存的数据 用来判断有没有缓存数据
    const cates = wx.getStorageSync("cates");
    // 2 判断有没有缓存数据
    if (!cates) {
      // 没有数据 1 发送请求 2 存入到缓存 
      this.getCategoryList();
    } else {
      // 有缓冲数据 
      // 判断数据是否过期 假设过期时间是10s
      if (Date.now() - cates.time > 1000 * 10) {
        // 过期了  
        this.getCategoryList();
      } else {
        // 获取缓存的数据
        const catesData = cates.data;

        // 给全局数据进行赋值
        this.Cates=catesData;
        // 左侧菜单要的数据
        const leftMenuList = this.Cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }));
        // 大家电   result[0].children
        const rightGoodsList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      }
    }


  },
  // 获取分类页面的接口数据
  getCategoryList() {
    request({ url: "/categories" })
      .then(result => {
        // 把接口的数据 赋值给我们的全局变量
        this.Cates = result;
        // 把我们的数据存入到缓存中 
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


        // 左侧菜单要的数据
        const leftMenuList = this.Cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }));
        // 大家电   result[0].children
        const rightGoodsList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      })
  },
  // 左侧菜单点击事件
  handleMenuChange(e) {
    // 1 获取索引
    const { index } = e.currentTarget.dataset;
    // 2 根据索引来获取右侧内容 要渲染的数据 
    const rightGoodsList = this.Cates[index].children;
    // 3 控制右侧的滚动条的滚动距离
    this.setData({
      currentIndex: index,
      rightGoodsList,
      scrollTop: 0
    })
  }
})