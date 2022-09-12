import { ShoppingWay } from "../../core/enum"
import { SaleExplain } from "../../models/sale-explain"
import { Spu } from "../../models/spu"
import { getSystemSize } from "../../utils/system"
import { px2rpx } from "../../utils/util"

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false,
    specs: Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // console.log(options);
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    const explain = await SaleExplain.getFixed()
    const res = await getSystemSize()
    console.log(res);
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 100
    console.log(h);
    this.setData({
      spu,
      explain,
      scorllHeight:h
    })
  },
  // 首页
  onGotoHome(event) {
    // 跳转到有 tabbar 的页面
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  // 购物车
  onGotoCart(event) {
    // 跳转到有 tabbar 的页面
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 加入购物车
  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    })
  },
  // 立即加购
  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },
  // 获取 realm 子组件的数据
  onSpecChange(event) {
    this.setData({
      specs: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})