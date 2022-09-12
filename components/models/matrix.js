// 处理二维数组
class Matrix {

    m
    // fence-group 中 m 传入 matrix
    constructor(matrix) {
        this.m = matrix
    }
    // [[1,2,3],[1,2,3],[1,2,3],[1,2,3]]
    // 获取 二维数组的 行数
    get rowsNum() {
        return this.m.length
    }
    get colsNum() {
        return this.m[0].length
    }

    // 遍历 获取每个元素
    each(callback) {
        // 遍历 列
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                // 注：二维数组下标表示 m[行][列]
                const element = this.m[i][j]
                callback(element, i, j)
            }
        }
    }

    // 矩阵转置（将行改为列，列改为行）
    transpose() {
        const desArr = []
        for (let j = 0; j < this.colsNum; j++) {
            // 创建 二维项
            // [[],[],[]]
            desArr[j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                // [[1,2,3,4],[1,2,3,4],[1,2,3,4]]
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }
}
export {
    Matrix
}