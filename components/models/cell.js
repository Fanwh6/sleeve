import { CellStatus } from "../../core/enum"

// 一项 规格值
class Cell {
    // 规格值
    title
    // 规格值 id
    id 
    // 选框状态
    status = CellStatus.WAITING
    spec
    // 可视规格图
    skuImg
    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }


}

export {
    Cell
}