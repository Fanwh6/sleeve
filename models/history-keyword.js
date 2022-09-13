// 管理 缓存
class HistoryKeyword {
    // 纯静态
    // 单例模式（全局只有一个例）
    // 目的：向缓存中写入数据（[].push(keyword)）
    // 数组有最大上限  去重（重复关键词）
    static KEY = 'keywords'
    // save get clear
    static MAX_ITEM_COUNT = 10
    // 缓存数组
    keywords = []

    constructor() {
        this.keywords = this._getLocalKeywords()
    }

    save(keyword) {
        // 去重
        const items = this.keywords.filter(k => {
            return k === keyword
        })
        if (items.length !== 0) {
            return
        }
        // 大于上限
        if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
            // 队列（先进先出）
            this.keywords.pop()
        }
        // 数组未满 
        this.keywords.unshift(keyword)
        this._refreshLocal()
    }
    get() {
        return this.keywords
    }
    clear() {
        // 置空
        this.keywords = []
        this._refreshLocal()
    }
    // 操作缓存
    // 小程序缓存只能一组数据缓存 无法执行中途弹出 添加 操作
    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords);
    }
    // 从缓存中读取keyword
    _getLocalKeywords() {
        const keywords = wx.getStorageSync(HistoryKeyword.KEY);
        if (!keywords){
            wx.setStorageSync(HistoryKeyword.KEY, []);
            return []
        }
        return keywords
    }
}

export {
    HistoryKeyword
}