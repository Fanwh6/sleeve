// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: Object,
    x: Number,
    y: Number
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
    onTap(event) {
      // console.log(this.properties.cell);
      // 触发元素事件
      // 父组件中可以使用子组件的事件（子传父）
      // 相当于冒泡
      // element.trigger(type: string, detail ?: Object): Promise < void>  
      // 参考文档：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html
      // 参数一：type - 触发事件类型
      // 参数二：detail - 触发事件传递的值 detail对象，提供给事件监听函数
      // 参数三：可选参数  触发事件的选项
      this.triggerEvent('celltap', {
        // 子组件 向 父组件（realm）传递数据
        cell: this.properties.cell,
        x: this.properties.x,
        y: this.properties.y
      }, {
        // 触发事件的选项
        // 事件是否冒泡
        bubbles: true,
        // 事件是否穿越组件边界（跨组件） 
        composed: true
      })
    }
  }
})
