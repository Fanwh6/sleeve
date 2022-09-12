import { Spu } from "../../models/spu";

class Test {
    subList = spu.sku_list
    // 初始化 规格信息
    initFences() {
        // 创建 二维数组
        const matrix = this._createMatrix(this.subList)
        // 创建 存放规格值
        const fences = []
        // 对比遍历列
        const currentJ = -1
        // 处理二位数组
        Matrix.forEach((element, i, j) => {
            if (currentJ !== j) {
                currentJ = j
                // 改变 遍历的列 即新的规格
                // 创建一个新的规格组
                fences[currentJ] = this._createFence(element)
            }
            // 设置 规格值
            fences[currentJ].pushValueTitles(element.value)
        })
    }
    // 初始化 （转置）
    initFences1() {
        // 创建二维数组
        const matrix = this._createMatrix(this.subList)
        // 所有规格信息
        const fences = []
        // 处理二维数组
        matrix.transpose(r => {
            // 创建新fence对象
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
    }
    // 创建 新的规格组
    _createFence(elment) {
        const fence = new Fence()
        return fence
    }
    // 创建 二维数组
    _createMatrix(subList) {
        // 判断
        if (!subList) {
            return
        }
        // 转化 二维数组
        subList.forEach(sub => {
            const m = []
            m.push(sub.paces)
        })
        return new Matrix(m)
    }
}

// 处理 二维数组
class Matrix {
    m
    constructor(matrix) {
        this.m = matrix
    }
    // 获取二维数组的行列
    get rowsNum() {
        return this.m.length
    }
    get colsNum() {
        return this.m[0].length
    }
    // 遍历 处理 二维数组 （数组遍历方法）
    forEach(callback) {
        for (let j = 0; i < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i, j]
                callback(element, i, j)
            }
        }
    }
    // 转置 数组
    transpose() {
        // 转置后 数组
        const desArr = []
        // 转置
        for (let j = 0; j < this.colsNum; j++) {
            // [[],[],[]]
            desArr[j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }
}
// 规格值处理
class Fence {
    valueTitles = []
    specs
    // 接受 转置数组 的 一行元素 即 一组规格信息
    constructor(specs) {
        this.specs = specs
    }
    // 初始化 遍历 处理规格信息
    init() {
        this.specs.forEach(s => {
            // 处理每一个规格值
            this.pushValueTitles(s.value)
        })
    }
    pushValueTitles(title) {
        this.valueTitles = title
    }
}
