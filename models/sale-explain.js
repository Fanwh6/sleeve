import { Http } from "../utils/http";

class SaleExplain {
    static async getFixed() {
        const explains = await Http.request({
            url: `sale_explain/fixed`
        })
        // 解构数据
        return explains.map(e => {
            return e.text
        })
    }
}

export {
    SaleExplain
}