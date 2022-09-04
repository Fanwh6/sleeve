import { Http } from "./http"

class Paging {
    // 需要保存状态
    // 使用实例
    // 请求体(url+data+method)
    req
    count
    start
    // 从req中获取为获取当前数据请求中处理url提供参数
    url
    locker = false
    // 请求结果 更多数据
    moredata = true
    accumulator = []

    // 初始化数据
    constructor(req, count = 10, start = 0) {
        this.req = req
        this.count = count
        this.start = start
        this.url = req.url
    }
    // 获取分页数据（总方法）
    async getMoreData() {
        // 判断 是否有更多数据
        if (!this.moredata){
            return
        }
        // getlocker 请求锁 期间用户无法再次请求
        // 判断 获取 请求锁是否成功
        if (!this._getLocker) {
            return
        }
        // request  请求数据
        const data = await this._getActualData()
        // releaselocker 释放锁  恢复用户请求
        this._releaseLocker()
        return data

    }
    // 请求真实数据 url处理
    async _getActualData() {
        // 获取处理后的req
        const req = this.getCurrentReq()
        // 调用请求方法
        let paging = await Http.request(req)
        // 判断 请求返回数据
        // 服务器请求失败
        if (!paging) {
            return null
        }
        // 服务器请求成功
        // 定义数据结构 处理返回结果
        // return {
        //     // 数据为空
        //     empty:Boolean,
        //     // 
        //     items:[],
        //     // 最后一页
        //     moredata:Boolean,
        //     // 累加
        //     accumulator:[]
        // }

        // 判断返回数据是否为空
        if (paging.total === 0) {
            // 数据为空
            return {
                empty: true,
                items: [],
                moredata: false,
                accumulator: []
            }
        }

        // 判断 有没有更多数据 是否最后一页
        // 此处 moredata 在后续还要使用 不要 临时定义
        this.moredata = this._moreData(paging.total_page, paging.page)
        // 有更多数据
        if (this.moredata) {
            // 更改 start 值
            this.start += this.count
        }
        // 累加
        this._accumulate(paging.items)
        return {
            empty: false,
            items: paging.items,
            moredata: this.moredata,
            accumulator: this.accumulator
        }

    }
    // 累加
    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }
    // 更多数据
    _moreData(totalPage, pageNum) {
        // 还有更多的数据时，返回true
        // 当条件不成立，说明没有更多数据，返回false
        return pageNum < totalPage -1
    }
    // 处理当前请求的 url 值
    getCurrentReq() {
        // 当前请求的url
        // 此时修改 url 不会改变 req.url
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        // 请求url，两种情况
        // 1. 无'?': url = spu/latest + '?' + params
        // 2. 有'?': url = spu/latest/?other=abc + '&' + params
        // indexOf():查找数据，有返回下标值，没有返回-1
        // includes():查找数据,有返回 true
        if (url.includes('?')) {
            // 有 '?'
            url += '&' + params
        } else {
            // 没有 '?'
            url += '?' + params
        }
        // 将修改后的 url 赋值给 req.url
        this.req.url = url
        return this.req
    }
    // 请求锁
    _getLocker() {
        // 判断当前请求锁状态
        if (this.locker) {
            // 上一次请求未完成 跳出本次请求
            return false
        }
        // 目前请求锁为释放状态 执行请求锁
        this.locker = true
        return true
    }
    // 释放请求锁
    _releaseLocker() {
        this.locker = false
    }
}

export {
    Paging
}