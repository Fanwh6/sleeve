import { Http } from "../utils/http";

class Categories {
    roots = []
    subs = []
    async getAll() {
        const data = await Http.request({
            url: `category/all`
        })
        this.roots = data.roots
        this.subs = data.subs
    }
    getRoots() {
        return this.roots
    }
    getSubs(parentId) {
        // filter 返回 数组
        return this.subs.filter(sub => sub.parent_id == parentId)
    }
    // 根据 id 获取 root
    getRoot(rootId) {
        return this.roots.find(r => r.id == rootId)
    }
}

export {
    Categories
}