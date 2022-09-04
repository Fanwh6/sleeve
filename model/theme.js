// 业务
import { config } from "../config/config"
import { Http } from "../utils/http"
class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'
    // 获取全部主题
    // 类的静态方法 static 只能保存数据 不能保存状态
    // static 全局的类 只能有一份（即实例化 new Theme() 只能有一次）
    // static 只能保存当前 locationA-H 数据，如果后续有其他组的状态，无法保存  实例可以实现
    // 实例对象 既可以保存数据 也可以保存状态
    // 实现 themes 的全局获取，需要将和类相关的静态方法改成和实例对象相关的实例方法
    // 实现 调用方 调用过程 简单 
    themes = []
    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }
    // static async getHomeLocationA(){
    //     return await Http.request({
    //         url:`theme/by/names`,
    //         data: {
    //             names: Theme.locationA
    //         }
    //         // // 向封装的request请求发送callback函数参数
    //         // callback:(data) => {
    //         //     // 获取封装request请求到的数据，即res.data
    //         //     callback(data)
    //         // }
    //     })
    //     // wx.request({
    //     //     // ES6 字符串拼接
    //     //     url: `${config.apiBaseUrl}theme/by/names`,
    //     //     method: 'GET',
    //     //     data: {
    //     //         names: 't-1'
    //     //     },
    //     //     header: {
    //     //         appkey: config.appkey
    //     //     },
    //     //     success: (res) => {
    //     //         // console.log("request执行");
    //     //         // console.log(res);
    //     //         callback(res.data)
    //     //     }
    //     // })
    // }
    // 获取 themeA 数据
    // 实例方法
    async getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }
    // 获取 themeE 数据
    // 实例方法
    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }
    // 获取 themeF 数据
    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
    }
    // 获取 themeH 数据
    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
    }
    // 主题内容的展示 一次性的 只需要在首页使用一次 使用 static
    // 直接在该文件下传参
    static async getHomeLocationESpu() {
        // 实例对象的实例方法获取
        // return this.getThemeSpuByName(Theme.locationE)
        // 类方法获取
        return Theme.getThemeSpuByName(Theme.locationE)
    }
    // 获取 主题内容
    static async getThemeSpuByName(name) {
        return await Http.request({
            url: `theme/name/${name}/with_spu`
        })
        // 类的对象
    }

}

export {
    Theme
}