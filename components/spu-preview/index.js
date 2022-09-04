// components/spu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: Array
  },
  // 监听事件
  observers: {
    'data': function (data) {
      // 判断
      if (!data) {
        return
      }
      if (!data.tags) {
        return
      }
      const tags = data.tags.split('$')
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
    onImgLoad(event) {
      const { width, height } = event.detail
      // console.log(width,height);
      this.setData({
        w: 340,
        h: 340 * height / width
      })
    }
  }
})
