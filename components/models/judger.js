import { CellStatus } from "../../core/enum"
import { Joiner } from "../../utils/joiner"
import { SkuCode } from "./sku-code"
import { SkuPending } from "./sku-pending"

class Judger {
    fenceGroup
    // 商品 的 所有规格组合
    // 规格字典
    pathDict = []
    skuPending
    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        // 先初始化 路径字典
        this._initPathDict()
        // 再初始化默认skuPending
        // 然后才能根据路径字典去显示更新状态
        this._initSkuPending()

    }
    // 判断 是否有完整sku（目的：调用skuPending方法，使realm可以调用）
    isSkuIntact() {
        return this.skuPending.isIntact()
    }
    // 获取 与 spucode 对应的 sku 信息
    getDeterminateSku() {
        const code = this.skuPending.getSkuCode()
        // console.log(code);
        // fencesGroup中 getSku 方法 获取 sku 信息
        const sku = this.fenceGroup.getSku(code)
        return sku
    }
    // 获取 已选 规格值
    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }
    // 获取 未选 规格对应的规格名
    getMissingKeys() {
        // console.log(this.skuPending);
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        // console.log(missingKeysIndex);
        // console.log(missingKeysIndex);
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title
        })
    }
    // 初始化 已选cell pending
    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        // 获取默认sku > specs > cell
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        // 初始化pending，将默认sku添加到pending
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        // 刷新所有 cell的 状态
        this.judge(null, null, null, true)
        // console.log(this.skuPending);
    }
    // 初始化默认选择的cell
    _initSelectedCell() {
        // 遍历所有的cell，根据id查找对应fences中的cell修改状态为已选状态
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }
    // 初始化路径字典(根据已存在规格码code找到所有规格值组合)
    _initPathDict() {
        // 遍历 规格列表 
        this.fenceGroup.spu.sku_list.forEach(s => {
            // 处理每个sku的code 即规格组合状态
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)

        })
        // console.log(this.pathDict);

    }
    // 点击 修改 cell 状态
    judge(cell, x, y, isInit = false) {
        // 负责cell是否是可选状态
        // 初始化 因为无法确定 y 所以在初始化的时候不执行
        if (!isInit) {
            // 修改 点击 cell 的状态
            this._changeCurrentCellStatus(cell, x, y)
        }

        // 负责修改状态主要代码
        // this._changeCurrentCellStatus 作为回调函数
        // 刷新 所有的cell 状态 同时 返回值寻找潜在路径
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            // console.log(path);
            // 如果path为空，表示当前cell已选中，不需要判断
            if (!path) {
                return
            }
            // 与 路径字典 做对比 查看是否在 路径字典中
            const isIn = this._isInDict(path)
            if (isIn) {
                // 存在 则刷新 cell 状态 为 waiting
                // this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            } else {
                // this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })

    }
    // 查找 路径字典
    _isInDict(path) {
        return this.pathDict.includes(path)
    }

    // 查找潜在路径
    _findPotentialPath(cell, x, y) {
        // 字符串拼接
        const joiner = new Joiner('#')
        // 遍历 行 即所有规格属性，一行代表一个规格属性
        // fences[fence(颜色),fence(图案),fence(尺码)] 
        // 每个fence代表一个规格属性
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            // 获取当前遍历行 已选 cell
            // ptnding:[cell,cell,cell]
            const selected = this.skuPending.findSelectedCellByX(i)
            // 当前行(当前遍历cell)
            if (x === i) {
                // 当前行已选元素不需要计入潜在路径
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                // 获取 cell 的 id信息(key_id+value_id)(1-45)
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
                // 
            } else {
                // 其他行(x !== i) 即当前 i 是其他规格属性行
                if (selected) {
                    // 获取 cellCode
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }
    // 获取在潜在路径中获取当前点击cell的编码
    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    // 修改状态
    // 点击 反选
    // 改变当前(点击)cell状态
    _changeCurrentCellStatus(cell, x, y) {
        // waiting -> selected
        if (cell.status === CellStatus.WAITING) {
            // cell.status = CellStatus.SELECTED
            // 修改 fenceGroup 中的状态
            // this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
            return
        }
        // selected -> waiting
        if (cell.status === CellStatus.SELECTED) {
            // cell.status = CellStatus.WAITING
            // this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }

    }
}

export {
    Judger
}