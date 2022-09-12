import { SpuListType } from "../../core/enum"
import { Categories } from "../../models/categories"
import { getSystemSize } from "../../utils/system"
import { px2rpx } from "../../utils/util"

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultRootId: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.initCategoryData()
    this.setDynamicSegmentHeight()
  },
  async initCategoryData() {
    const categories = new Categories()
    this.data.categories = categories
    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots)
    const currentSubs = categories.getSubs(defaultRoot.id)
    this.setData({
      roots,
      currentSubs,
      currentBannerImg: defaultRoot.img
    })
    // console.log(this.data.currentSubs);
  },
  // 默认分类
  getDefaultRoot(roots) {
    const defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
    if (!defaultRoot) {
      defaultRoot = roots[0]
    }
    return defaultRoot
  },
  // 设置 segment 高度
  async setDynamicSegmentHeight() {
    const res = await getSystemSize()
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 60 - 20 - 2
    this.setData({
      segHeight: h
    })
  },
  // 切换 sku
  onSegChange(event){
    const rootId = event.detail.activeKey
    const currentSubs = this.data.categories.getSubs(rootId)
    // console.log(currentSubs);
    const currentBannerImg = this.data.categories.getRoot(rootId).img
    // console.log(currentBannerImg);
    this.setData({
      currentSubs,
      currentBannerImg
    })
  },
  // 搜索跳转
  onGotoSearch(event) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 商品列表条状
  onJumpToSpuList(event){
    const cid = event.detail.cid
    wx.navigateTo({
      url:`/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
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