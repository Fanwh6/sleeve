import { Cell } from "./cell"

// 一组 规格信息处理
class Fence {
    // 一组 规格值
    cells = []
    // 一个规格的所有规格值
    specs
    // 规格名
    title
    // 规格名 id
    id
    // 此处 传递过来的 specs 是 转置后 数组的一行 即 一种规格的所有规格值对象
    constructor(specs) {
        this.specs = specs
        // 获取 规格对象的 规格名
        this.title = specs[0].key
        // 获取 规格对象的 规格名id
        this.id = specs[0].key_id
    }
    init() {
        this._initCells()
    }
    // 处理 可视规格
    setFenceSketch() {

    }
    // 初始化 cell
    _initCells() {
        // 遍历 每个规格值
        this.specs.forEach(s => {
            // 去重(重复的规格值)
            // some：数组中有有个满足就返回true
            // every：数组中所有都满足，返回true
            const existed = this.cells.some(c => {
                // 通过 id 判断是否有重复的规格值
                return c.id === s.value_id
            })
            if (existed) {
                return
            }
            // this.pushValueTitle(s.value)
            // 创建 cell 每个规格值 单元格
            const cell = new Cell(s)
            // 将 每个规格值 push 到规格组内
            this.cells.push(cell)
        })
    }
    // 将 sku(图片img) 和 cell(规格值) 进行对应和关联（操作可视规格信息）
    setFenceSketch(skuList) {
        this.cells.forEach(c => {
            this._setCellSkuImg(c, skuList)
        })
    }
    // 
    _setCellSkuImg(cell, skuList) {
        // 根据 code 确定 赋值 img
        const specCode = cell.getCellCode()
        // console.log(specCode);
        // 对比 code 查找 可视规格 对应 规格值
        // 即 sku.img 和 cell 进行关联 
        const matchedSku = skuList.find(s => s.code.includes(specCode))
        if (matchedSku) {
            cell.skuImg = matchedSku.img
        }
    }
    // pushValueTitle(title) {
    //     this.valueTitles.push(title)
    // }
}

export {
    Fence
}