import { HistoryKeyword } from "../../models/history-keyword"
import { Search } from "../../models/search"
import { Tag } from "../../models/tag"
import { showToast } from "../../utils/ui"

// pages/search/search.js
const history = new HistoryKeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const historyTags = history.get()
    // console.log(historyTags);
    const hotTags = await Tag.getSearchTags()
    // console.log(hotTags);
    this.setData({
      historyTags,
      hotTags
    })
  },
  // 搜索
  async onSearch(event) {
    console.log(event);

    const keyword = event.detail.value || event.detail.name
    if (!keyword) {
      showToast('请输入搜索关键字！')
      return
    }
    this.setData({
      search: true,
    })
    history.save(keyword)
    this.setData({
      historyTags: history.get()
    })
    const paging = Search.search(keyword)
    wx.lin.showLoading({
      type: 'flash',
      fullScreen: true,
      color:'#157658'
    })
    const data = await paging.getMoreData()
    wx.lin.hideLoading()
    // console.log(data);
    this.bindItems(data)
  },
  // setData items（商品数据）
  bindItems(data) {
    if (data.accumulator.length !== 0) {
      this.setData({
        items: data.accumulator
      })
    }
    console.log(this.data.items);
  },
  onCancel() {
    this.setData({
      search: false,
      items: []
    })
  },
  onDeleteHistory() {
    history.clear()
    this.setData({
      historyTags: []
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