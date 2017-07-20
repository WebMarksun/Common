(function ($) {
    "use strict";

    /**
     * @func wxshare
     * @desc 微信分享初始化
     * @param {object} data 参数对象
     * @param {string} data.title 分享标题
     * @param {string} data.imgUrl 标题图地址
     * @param {string} data.desc 分享描述
     * @param {string} data.audio 音频数据的绝对地址
     * @param {string} data.bdname 百度统计页面名称
     * @param {string} data.bdfunc 百度统计功能
     * @param {string} data.bdvalue 百度统计值
     */
    $.fn.wxshare = function (data) {
        var obj_co = {
                title: data.title,
                link: window.location.href.split("#")[0],
                imgUrl: data.imgUrl,
                success: function (res) {
                    if (data.shareSuccessCall) {
                        data.shareSuccessCall();
                    }
                    if (typeof _hmt !== "undefined") {
                        _hmt.push(["_trackEvent", data.bdname, data.bdfunc, data.bdvalue]);
                    }
                },
                cancel: function (res) {
                    window.console.log(res.errMsg);
                },
                fail: function (res) {
                    window.console.log(res.errMsg);
                }
            },
            obj_co_desc = {
                desc: data.desc
            },
            obj_timeline = $.extend({}, obj_co),
            obj_appmsg = $.extend({
                type: (data.audio.length > 0) ? "music" : "link",
                dataUrl: data.audio
            }, obj_co_desc, obj_co),
            obj_qq = $.extend({}, obj_co_desc, obj_co),
            obj_wb = $.extend({}, obj_co_desc, obj_co),
            obj_qzone = $.extend({}, obj_co_desc, obj_co);
        wx.ready(function () {
            wx.onMenuShareTimeline(obj_timeline);
            wx.onMenuShareAppMessage(obj_appmsg);
            wx.onMenuShareQQ(obj_qq);
            wx.onMenuShareWeibo(obj_wb);
            wx.onMenuShareQZone(obj_qzone);
        });
    };

    /**
     * @func init
     * @desc 微信分享鉴权验证
     */
    function init() {
        //对url进行Base64加密
        var b = new Base64();  
        var weburl = b.encode(window.location.href); 
        $.ajax({
            type: "GET",
            url: "http://assist.qianlong.com/chart/api/cshare",
            dataType: "jsonp",
            data: {
                "weburl":weburl
            },
            success: function (json) {
               
                wx.config({
                    debug: false,
                    appId: json.appId,
                    timestamp: json.timestamp,
                    nonceStr: json.nonceStr,
                    signature: json.signature,
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
                });
            },
            error: function () {
                window.alert("加载失败，请过会儿重试，给您带来不便抱歉。");
            }
        });
        //修改的地方
        $.fn.wxshare({
            title: "兔爷动漫",
            imgUrl: "http://comic.qianlong.com/wx/img/wxshare.jpg",
            desc: "兔爷动漫",
            audio: "",
            bdname: "tuye",
            bdfunc: "share",
            bdvalue: "weixin"
        });
    };
    init();

}(window.jQuery));