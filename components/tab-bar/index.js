// components/tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    // 首页
    onGoToHome(event){
      this.triggerEvent('gotohome',{
        
      })
    },
    // 购物车
    onGoToCart(event) {
      this.triggerEvent('gotocart', {

      })
    },
    // 加入购物车
    onAddToCart(event) {
      this.triggerEvent('addtocart', {

      })
    },
    // 立即购买
    onBuy(event) {
      this.triggerEvent('buy', {

      })
    },
  }
})
