// 将对象转化promise对象
const promisic = function (n) {
    return function (t = {}) {
        return new Promise((c, r) => {
            const s = Object.assign(t, {
                success: n => {
                    c(n)
                },
                fail: n => {
                    r(n)
                }
            });
            n(s)
        })
    }
},
    px2rpx = function (n) {
        const { screenWidth: t } = wx.getSystemInfoSync();
        return 750 / t * n
    };
// 组合算法
function combination(arr, m) {
    let r = [];
    _([], arr, m);
    return r;
    function _(t, a, m) {
        //t:临时数组 a:目标数组 m：多少个数进行组合
        if (m === 0) {
            r[r.length] = t;//相当于push
            return;
        }
        for (let i = 0; i <= a.length - m; i++) {
            //从0开始 到n-m

            let b = t.slice();//将t赋值给b 不能用=赋值，使用slice会形成新的数组赋值
            b.push(a[i])
            _(b, a.slice(i + 1), m - 1);
        }
    }
}

export {
    promisic,
    px2rpx,
    combination
};