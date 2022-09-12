import { combination } from "../../utils/util"

class SkuCode {
    code
    spuId
    // 一个 sku 的 所有规格值组合
    totalSegments = []
    constructor(code) {
        this.code = code
        this.splitToSegments()
    }
    // 处理 sku 的 code
    // 2$1-45#3-9#4-14
    // 截取片段
    splitToSegments() {
        const spuAndSpec = this.code.split('$')
        // 商品id
        this.spuId = spuAndSpec

        // 截取规格信息
        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length

        // 组合算法处理规格信息
        for (let i = 1; i <= length; i++) {
            const segments = combination(specCodeArray, i)
            // 将 规格值 # 拼接
            // 注：map 参数 回调函数 返回值需要 return
            const newSegments = segments.map(segs => {
                return segs.join('#')
            })
            // 将 目前 sku 的 规格值组合 合并
            this.totalSegments = this.totalSegments.concat(newSegments)
            // console.log(this.totalSegments);
        }
    }
}
export {
    SkuCode
}