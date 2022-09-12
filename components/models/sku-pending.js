import { Joiner } from "../../utils/joiner"
import { Cell } from "./cell"

class SkuPending {
    // 存放已选cell
    pending = []
    // sku 规格数
    size
    constructor(size) {
        this.size = size
    }
    // 初始化 pending (获取默认的sku信息)
    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
        // console.log(this.pending);
    }
    // 获取 当前已选的规格值
    getCurrentSpecValues() {
        // 返回数组
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
        return values
    }
    // 获取 未选的规格的index
    getMissingSpecKeysIndex() {
        const keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]) {
                // console.log(i);
                keysIndex.push(i)
                // console.log(keysIndex);
            }
        }
        return keysIndex
    }
    // 根据 pending 还原 sku code
    getSkuCode() {
        const joiner = new Joiner('#')
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode(cell.spec)
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }
    // 判断用户是否确认了一个完整的sku
    isIntact() {
        // 未选择完整 sku
        // if (this.size !== this.pending.length) {
        //     return false
        // }
        // 判断pending是否有undefined
        for (let i = 0; i < this.size; i++) {
            // 有 undefined
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }
    // 遍历 pending，查看pending是否有undefined数据
    _isEmptyPart(index) {
        return this.pending[index] ? false : true
    }
    // 用户点击（已选）cell
    // 将已选cell -> pending
    // x 表示行号
    insertCell(cell, x) {
        this.pending[x] = cell
        // console.log(this.pending);
    }
    // 用户 反选 cell （selected -> waiting）
    removeCell(x) {
        //  移除 cell
        this.pending[x] = null
        // console.log(this.pending);
    }

    // 获取当前 行下面的 已选 cell
    findSelectedCellByX(x) {
        return this.pending[x]
    }

    // 判断选中状态
    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        // 当前行不存在已选中元素
        if (!pendingCell) {
            return false
        }
        // 当前行存在已选中元素
        // 判断当前cell是不是选中元素
        // 是 返回 true
        return cell.id === pendingCell.id
    }
}

export {
    SkuPending
}