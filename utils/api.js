// ===============================================ES6的promise来优化异步回调黑洞的问题=============
const request = (params) => {
    // 定义公共的url
    const baseUrl = "https://wx.iyuetv.com";

    // 加载中效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    return new Promise((resolve, reject) => {
        wx.request({
            ...params, //解构出来
            url: baseUrl + params.url, //拼接路径
            success: (result) => {
                resolve(result.data);
            },
            fail: (err) => {
                reject(err);
                wx.showToast({
                    title: err
                });
            },
            complete: () => {
                // 关闭正在等待（加载中）的图标
                wx.hideLoading();
            }
        });
    })
};

const requestAja = (params) => {
    // 定义公共的url
    // const baseUrl = "http://111.230.227.69:6060/ucenter"; //测试
    const baseUrl = "https://ucenter.iyuetv.com/ucenter"; //正式

    return new Promise((resolve, reject) => {
        wx.request({
            ...params, //解构出来
            url: baseUrl + params.url, //拼接路径
            success: (result) => {
                resolve(result.data);
            },
            fail: (err) => {
                reject(err);
                wx.showToast({
                    title: err
                });
            }
        });
    })
};

module.exports = {
    request,
    requestAja
};