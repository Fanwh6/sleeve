import { Cart } from "../../models/cart";

// components/counter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    min: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    max: {
      type: Number,
      value: Cart.SKU_MAX_COUNT
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
    // 数量 不符合 事件
    onOverStep(event){
      console.log(event);
      const minOrMaxOut = event.detail.type
      if (minOrMaxOut === 'overflow_max'){
        // 最大值
        wx.showToast({
          icon:"none",
          duration:3000,
          title: '超出最大购买量',
        })
      }
      if (minOrMaxOut === 'overflow_min'){
        // 最小值
        wx.showToast({
          icon:"none",
          duration:3000,
          title: `购买数量不能少于 ${Cart.SKU_MIN_COUNT} 件`,
        })
      }
    }
  }
})
 