import { promisic } from "./util";

const getSystemSize = async function () {
    const res = await promisic(wx.getSystemInfo)()
    return {
        screenHeight: res.screenHeight,
        screenWidth: res.screenWidth,
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth
    }
}
export {
    getSystemSize
}