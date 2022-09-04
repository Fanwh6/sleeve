// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object

  },
  // 使用监听器处理 banner 中 items的内容  
  observers: {
    // 监听函数
    // '函数名'：function(监听参数){}
    'banner': function (banner) {
      // 判断banner
      if (!banner) {
        return
      }
      // 判断banner.items
      if (banner.items.length === 0) {
        return
      }
      // console.log(banner);
      const left = banner.items.find(i => i.name === 'left')
      // console.log(left);
      const rightTop = banner.items.find(i => i.name === 'right-top')
      // console.log(rightTop);
      const rightBottom = banner.items.find(i => i.name === 'right-bottom')
      // console.log(rightBottom);
      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
