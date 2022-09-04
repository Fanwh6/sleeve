import { Http } from "../utils/http";
import { Paging } from "../utils/paging";

class SpuPaging{
    // 仅是一个请求
    static async getLatestPaging(){
        // 返回 Paging 实例对象 包含其中的方法
        return new Paging({
            url:`spu/latest`
        },5)
    }
}

export {
    SpuPaging
}