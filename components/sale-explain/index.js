// components/sale-explain/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    texts: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    _texts: Array
  },
  // 监听
  observers: {
    'texts': function (texts) {
      this.setData({
        _texts: texts
      })
      console.log(this.data._texts);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
