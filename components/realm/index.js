import { Cart } from "../../models/cart"
import { Spu } from "../../models/spu"
import { Cell } from "../models/cell"
import { FenceGroup } from "../models/fence-group"
import { Judger } from "../models/judger"

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    orderWay: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,
    previewImg: String,
    title: String,
    price: Number,
    discountPrice: Number,
    noSpec: Boolean,
    isSkuIntact: Boolean,
    selectCount: Number,
    currentSkuCount: Cart.SKU_MIN_COUNT
  },
  // 处理 spu 结果，返回skuList
  // 也可以使用小程序生命周期，缺点：在执行的时候不一定获取到了所需数据
  // 监听器
  observers: {
    'spu': function (spu) {
      // 先判断 spu 是否存在
      if (!spu) {
        return
      }
      // 判断当前spu是不是无规格数据
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
      this.triggerSpecEvent()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 无规格 spu 处理
    processNoSpec(spu) {

      this.setData({
        noSpec: true
      })
      // 使用默认sku数据
      this.bindSkuData(spu.sku_list[0])
      // console.log(spu.sku_list[0].stock);
      // 设置 库存状态
      this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
    },
    // 有规格 spu 处理
    processHasSpec(spu) {
      // 处理 spu 处理成矩阵
      const fenceGroup = new FenceGroup(spu)
      console.log(fenceGroup);
      // 处理后的 规格组矩阵(包含每项规格的规格值)
      fenceGroup.initFences()
      // fenceGroup.initFences1()
      // 处理规格信息
      // 获取路径字典 + 更新规格状态
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      // 获取默认sku信息
      const defaultSku = fenceGroup.getDefaultSku()
      // console.log(defaultSku);
      // 默认 sku 存在
      if (defaultSku) {
        this.bindSkuData(defaultSku)
        this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
      } else {
        // 默认 sku 不存在
        this.bindSpuData()
      }
      // tip 状态
      this.bindTipData()
      // 刷新 规格值状态
      this.bindFenceGroupData(fenceGroup)
    },
    // 向 detail 传递数据
    triggerSpecEvent(event) {
      // 无规格spu
      const noSpec = Spu.isNoSpec(this.properties.spu)
      if (noSpec){
        this.triggerEvent('specchange',{
          noSpec:noSpec
        })
        return
      } 
      this.triggerEvent('specchange', {
        // 是否有默认sku
        noSpec: Spu.isNoSpec(this.properties.spu),
        // 是否选择了完整的sku
        isSkuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys()
      })
    },
    // 设置 无默认 sku 数据 (页面上部spu信息)
    bindSpuData() {
      const spu = this.properties.spu
      console.log(spu);
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price
      })
    },
    // 设置 有默认 sku 数据  (页面上部spu信息)
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock
      })
    },
    // 选择 tip 状态
    bindTipData() {
      this.setData({
        // 是否选择了完整的sku
        isSkuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys()
      })
    },
    // 初始化 刷新 规格值状态  (页面中部sku规格信息)
    bindFenceGroupData(fenceGroup) {
      // console.log(fenceGroup.fences);
      this.setData({
        fences: fenceGroup.fences
      })
      // console.log(this.data.isSkuIntact);
    },

    setStockStatus(stock, currentCount) {
      this.setData({
        outStock: this.isOutOfStock(stock, currentCount)
      })
    },
    // 判断 购买数量 是否符合
    isOutOfStock(stock, currentCount) {
      return stock < currentCount
    },

    // 点击 购买数量 +- 触发事件
    onSelectCount(event) {
      // console.log(this.data.spu);
      const currentCount = event.detail.count
      this.data.currentSkuCount = currentCount
      // console.log(this.data.judger);
      // 无规格商品
      if (Spu.isNoSpec(this.properties.spu)){
        const sku = this.data.spu.sku_list[0]
        // console.log(sku);
        this.setStockStatus(sku.stock, currentCount)
        return
      } 
      if (this.data.judger.isSkuIntact()) {
        const sku = this.data.judger.getDeterminateSku()
        // console.log(sku);
        this.setStockStatus(sku.stock, currentCount)
      }

    },

    // 触发子组件的点击事件
    // 注：因为是跨组件 所以 子组件一定要开启 冒泡 和 穿越组件边界 (可选参数中)
    onCellTap(event) {
      // event 中包含子组件中detail中传的数据 cell
      // console.log(event.detail);
      const data = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y
      const cell = new Cell(data.spec)

      // 刷新 cell 状态
      cell.status = data.status
      const judger = this.data.judger
      judger.judge(cell, x, y)

      // 判断 选择规格状态是否全选
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        // 根据 pending 还原 spu 的 code 值
        const currentSku = this.data.judger.getDeterminateSku()
        console.log(currentSku);
        this.bindSkuData(currentSku)
        // 更新 库存状态
        this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
      }
      // 更新 tip 状态
      this.bindTipData()
      // 更新全部规格值状态
      this.bindFenceGroupData(judger.fenceGroup)
      // this.setData({
      //   fences: judger.fenceGroup.fences
      // })
      this.triggerSpecEvent()
    }
  }
})
