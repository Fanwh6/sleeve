import { Fence } from "./fence"
import { Matrix } from "./matrix"

class FenceGroup {
    // 这个商品
    spu
    // 商品的 包含 规格组合
    skuList = []
    // fences:[fence,fence,fence]
    // fence:[cells,...]
    // cells:[cell,cell,cell]
    // cell: 一个规格值 cells: 一组规格值  fence: 一个规格属性 fences: 一组规格属性
    fences = []
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }
    // 遍历数组 初始化
    initFences1() {
        // 创建 二维数组
        // 颜色1 图案1 尺码1
        // 颜色2 图案1 尺码2
        // 颜色2 图案2 尺码3
        // 颜色3 图案3 尺码4
        const matrix = this._createMatrix(this.skuList)
        // 存放 规格值 数组
        const fences = []
        // 对比遍历列
        let currentJ = -1
        // 遍历处理二维数组
        matrix.each((element, i, j) => {
            // 判断遍历列是否改变
            // 改变，说明开始遍历一个新的规格
            // 不改变，说明目前遍历还是同一规格下的规格值
            // console.log(element,i,j);
            if (currentJ !== j) {
                // 改变
                // 创建一个新的fance，即规格
                currentJ = j
                fences[currentJ] = this._createFence(element)
            }
            // 规格值处理
            fences[currentJ].pushValueTitle(element.value)

        })
        this.fences = fences
        // console.log(this.fences);

    }
    // 转置 初始化
    initFences() {
        // 创建二维数组
        const matrix = this._createMatrix(this.skuList)
        // 存放 所有规格
        const fences = []
        // 处理二维数组(转置)
        const AT = matrix.transpose()
        // console.log(AT);
        // 按行遍历，就是一个规格的规格值集合
        AT.forEach(r => {
            // 一个规格的规格值集合
            const fence = new Fence(r)
            // 规格值 去重
            // 初始化 cell
            fence.init()
            // 查找 可视规格 对应 规格项
            if (this._hasSketchFence() && this._isSketchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
        console.log(this.fences);
    }
    // 重新遍历(刷新) cell
    eachCell(callback) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                callback(cell, i, j)
            }
        }
    }
    // 获取默认sku
    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) {
            return
        }
        return this.skuList.find(s => s.id === defaultSkuId)
    }
    // 根据id修改状态
    setCellStatusById(cellId, status) {
        // 遍历 cell
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }
    // 根据xy修改状态
    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
    }
    // 根据 skucode 获取 sku 信息
    getSku(skuCode) {
        const fullSpuCode = this.spu.id + '$' + skuCode
        const sku = this.spu.sku_list.find(s => s.code === fullSpuCode)
        return sku ? sku : null
    }
    // 当前 spu 是否包含 可视规格
    _hasSketchFence() {
        return this.spu.sketch_spec_id ? true : false
    }
    // 判断 当前遍历的 fence id 和 可视规格 id
    _isSketchFence(fenceId) {
        return this.spu.sketch_spec_id === fenceId ? true : false
    }
    // 创建一个新的规格
    _createFence(element) {
        // 创建一个新的实例对象 存放规格值
        // 遍历每换一列，创建一个新的
        const fence = new Fence()
        return fence
    }
    // 创建二维数组 规格信息
    _createMatrix(skuList) {
        // 存放二维数组
        const m = []
        // 遍历 创建
        // sku 表示 遍历的每个数组
        skuList.forEach(sku => {
            // 将数组中的规格信息push到m
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
}

export {
    FenceGroup
}