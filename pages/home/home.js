// pages/home/home.js
import { Activity } from "../../models/activity"
import { Banner } from "../../models/banner"
import { Category } from "../../models/category"
import { SpuPaging } from "../../models/spu-paging"
import { Theme } from "../../models/theme"
import { Paging } from "../../utils/paging"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    gridC: [],
    activityD: null,
    themeE: null,
    themeESpuList: [],
    themeF: null,
    bannerG: null,
    themeH: null,
    data: null,
    subPaging: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.initAllData()
    this.initBottomSpuList()
  },
  // 获取 底部商品数据
  async initBottomSpuList() {
    // 相当于返回 Paging 实例对象
    const paging = await SpuPaging.getLatestPaging()
    this.data.subPaging = paging
    // 获取更多数据
    const data = await paging.getMoreData()
    if (!data) {
      return
    }
    // console.log(data);
    // 累加
    wx.lin.renderWaterFlow(data.items)
    this.setData({
      data
    })
  },
  // 初始化 获取数据
  async initAllData() {
    // const themeA = await Theme.getHomeLocationA()
    // const themes = await Theme.getThemes()
    // 创建一个实例对象
    const theme = new Theme()
    // 调用实例对象的实例方法
    await theme.getThemes()
    // 获取themeA
    // const themeA = themes.find(t => t.name === "t-1")
    const themeA = await theme.getHomeLocationA()
    // 获取themeE
    const themeE = theme.getHomeLocationE()
    // 通过类方法 获取主题内容
    // let themeESpuList = []
    // 判断主题的online 上线状态
    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu()
      if (data) {
        // 获取 前八个对象
        this.setData({
          themeESpuList: data.spu_list.slice(0, 8)
        })
      }
    }
    // 获取themeF
    const themeF = theme.getHomeLocationF()
    // 获取 themeH
    const themeH = theme.getHomeLocationH()
    const bannerB = await Banner.getHomeLocationB()
    const gridC = await Category.getHomeLicationC()
    const activityD = await Activity.getHomeLocationD()
    const bannerG = await Banner.getHomeLocationG()
    this.setData({
      themeA,
      bannerB,
      gridC,
      activityD,
      themeE,
      themeF,
      bannerG,
      themeH,
      loadingType: 'loading'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(options) {

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
  async onReachBottom() {
    const data = await this.data.subPaging.getMoreData()
    if (!data) {
      return
    }
    // console.log(data);
    this.setData({
      data
    })
    // 重新渲染 瀑布流
    wx.lin.renderWaterFlow(data.items)
    if (!data.moredata) {
      this.setData({
        loadingType: 'end'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})