// components/spu-description/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  // 监听事件
  observers: {
    'spu': function (spu) {
      // 判断
      if (!spu) {
        return
      }
      if (!spu.tags) {
        return
      }
      const tags = spu.tags.split('$')
      // console.log(tags);
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
