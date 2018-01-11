/**
 * Created by zkzc-mcy on 2017/9/13.
 */
//同步请求JS文件
function ajaxPage(scriptID, url) {
    var oXmlHttp = null;
    if (window.XMLHttpRequest) // Gecko
        oXmlHttp = new XMLHttpRequest();
    else if (window.ActiveXObject) // IE
        oXmlHttp = new ActiveXObject("MsXml2.XmlHttp");
    oXmlHttp.onreadystatechange = function () {
        if (oXmlHttp.readyState == 4) {
            if (( scriptID != null ) && ( !document.getElementById(scriptID) )) {
                var oHead = document.getElementsByTagName('HEAD').item(0);
                var oScript = document.createElement("script");
                oScript.type = "text/javascript";
                oScript.id = scriptID;
                oScript.text = oXmlHttp.responseText;
                oHead.appendChild(oScript);
            }
        }
    }
    oXmlHttp.open('GET', url, false);//同步操作
    oXmlHttp.send(null);
}
/****本地存储封装******/
var userStorage = {
    keys: {
        lastLoginTimeKey: "last_login_time" //上次重新登录弹出时间
    },
    //保存key对应的值，支持字符串或JSON对象
    set: function (key, obj) {
        var storage = window.localStorage;
        if (storage) {
            if (typeof obj == "string")
                storage.setItem(key, obj);
            else if (typeof obj == "object")
                storage.setItem(key, JSON.stringify(obj));
            else
                alert("不支持的对象类型");
        }
        else {
            console.log("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
        }
    },
    //获取key对应的值，支持字符串或JSON对象
    get: function (key, isObject) {
        var storage = window.localStorage;
        if (storage) {
            var objStr = storage.getItem(key);
            if (isObject)
                return JSON.parse(objStr);
            else
                return objStr;
        }
        else {
            console.log("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
        }
    },
    //删除key对应的值
    delete: function (key) {
        var storage = window.localStorage;
        if (storage) {
            storage.removeItem(key);
        }
        else {
            console.log("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
        }
    }
};
var Util = {
    jsonParse: function (str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    },
    //请求后台数据之前转换入参
    transformRequest: function (data) {
        var ret = '';
        for (var it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    },
    // 前端日志统一接口
    log: function (msg) {
        if (Config.isDebug) {
            console.log(msg)
        }
    },
    /** 格式化时间对象 yyyy-MM-dd HH:mm:ss */
    formatDateObj: function (date) {
        if (date == null) {
            return '';
        }

        if (date instanceof Date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        } else {
            console.log("非时间对象")
        }
        return date;
    },
    /** 格式化时间戳 */
    formatDateTime: function (inputTime) {
        var date = new Date(inputTime);
        return this.formatDateObj(date);
    },
    /** 格式化element 时间控件datetime字符串 */
    formateElDateTime: function (dateTimeStr) {
        dateTimeStr.replace("T", " ").substring(0, 19);
    },
    /** 根据时间字符串创建时间对象 yyyy-MM-dd HH:mm:ss 或 yyyy/MM/dd HH:mm:ss */
    createDateObj: function (strDateTime) {
        return new Date(Date.parse(strDateTime.replace(/-/g, "/")));
    },
    /** 根据小时数获取前N个小时的时间字符串 yyyyMMddHH0000**/
    getPreHoursDate: function (hours) {
        var now = new Date();
        now.setTime(now.getTime() - hours * 60 * 60 * 1000);
        var s1 = "" + now.getFullYear();

        if (now.getMonth() > 9)
            s1 += now.getMonth() + 1;
        else
            s1 += "0" + now.getMonth();
        if (now.getDate() > 9)
            s1 += now.getDate();
        else
            s1 += "0" + now.getDate();
        if (now.getHours() > 9)
            s1 += now.getHours();
        else
            s1 += "0" + now.getHours();
        s1 += "0000";
        return s1;
    },
    /**
     * @desc   格式化${startTime}距现在的已过时间
     * @param  {Date} startTime
     * @return {String}
     */
    formatPassTime: function (startTime) {
        var currentTime = Date.parse(new Date()),
            time = currentTime - startTime,
            day = parseInt(time / (1000 * 60 * 60 * 24)),
            hour = parseInt(time / (1000 * 60 * 60)),
            min = parseInt(time / (1000 * 60)),
            month = parseInt(day / 30),
            year = parseInt(month / 12);
        if (year) return year + "年前";
        if (month) return month + "个月前";
        if (day) return day + "天前";
        if (hour) return hour + "小时前";
        if (min) return min + "分钟前";
        else return '刚刚';
    },
    /*格式化${startTime}距现在的已过时间
     * time字符串
     * */
    time2ms: function (time) {
        var currentTime = Date.parse(new Date()),
            startTime,
            pasttime,
            timeNum = time.replace(/[^0-9]+/g, ''),
            timeArr = timeNum.split(""),
            year = timeArr.splice(0, 4).join(""),
            mon = timeArr.splice(0, 2).join(""),
            day = timeArr.splice(0, 2).join(""),
            h = timeArr.splice(0, 2).join(""),
            m = timeArr.splice(0, 2).join(""),
            s = timeArr.splice(0, 2).join("");
        startTime = year + "-" + mon + "-" + day;
        if (h) {
            startTime = startTime + "T" + h;
            if (m) {
                startTime = startTime + ":" + m;
                s ? startTime = startTime + ":" + s : startTime = startTime + ":00"
            } else {
                startTime = startTime + ":00";
                s ? startTime = startTime + ":" + s : startTime = startTime + ":00"
            }
        } else {
            startTime = startTime + "T00";
            if (m) {
                startTime = startTime + ":" + m;
                s ? startTime = startTime + ":" + s : startTime = startTime + ":00"
            } else {
                startTime = startTime + ":00";
                s ? startTime = startTime + ":" + s : startTime = startTime + ":00"
            }
        }
        pasttime = currentTime - Date.parse(startTime);
        if (pasttime > 30 * 24 * 60 * 60 * 1000) {
            var startTimeArr = startTime.split("")
            startTime = startTimeArr.splice(0, 10, " ").join("");
            return startTime;
        } else {
            var day = parseInt(pasttime / (1000 * 60 * 60 * 24)),
                hour = parseInt(pasttime / (1000 * 60 * 60)),
                min = parseInt(pasttime / (1000 * 60));
            if (day) return day + "天前";
            if (hour) return hour + "小时前";
            if (min) return min + "分钟前";
            else return '刚刚';
        }
    },
    /**
     *
     * @desc   对象序列化
     * @param  {Object} obj
     * @return {String}
     */
    stringifyQueryString: function (obj) {
        if (!obj) return '';
        var pairs = [];

        for (var key in obj) {
            var value = obj[key];

            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }

            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }

        return pairs.join('&');
    },
    /**
     *
     * @desc   判断是否为手机号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    isPhoneNum: function (str) {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
    },
    /**
     *
     * @desc  判断是否为身份证号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    isIdCard: function (str) {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    },
    /**
     *
     * @desc   判断是否为邮箱地址
     * @param  {String}  str
     * @return {Boolean}
     */
    isEmail: function (str) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    },
    /**
     *
     * @desc   判断`obj`是否为空
     * @param  {Object} obj
     * @return {Boolean}
     */
    isEmptyObject: function (obj) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            return false
        return !Object.keys(obj).length
    },
    /**
     * @desc 深拷贝，支持常见类型
     * @param {Any} values
     */
    deepClone: function (values) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == values || "object" != typeof values) return values;

        // Handle Date
        if (values instanceof Date) {
            copy = new Date();
            copy.setTime(values.getTime());
            return copy;
        }

        // Handle Array
        if (values instanceof Array) {
            copy = [];
            for (var i = 0, len = values.length; i < len; i++) {
                copy[i] = deepClone(values[i]);
            }
            return copy;
        }

        // Handle Object
        if (values instanceof Object) {
            copy = {};
            for (var attr in values) {
                if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy values! Its type isn't supported.");
    },
    /**
     *
     * @desc   格式化现在距${endTime}的剩余时间
     * @param  {Date} endTime
     * @return {String}
     */
    formatRemainTime: function (endTime) {
        var startDate = new Date(); //开始时间
        var endDate = new Date(endTime); //结束时间
        var t = endDate.getTime() - startDate.getTime(); //时间差
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
    },
    /** 居中打开窗口 */
    windowOpenCenter: function (url, width, height, callback) {
        var left = (window.top.innerWidth - width) / 2;
        var top = (window.top.innerHeight - height) / 2;
        this.windowOpen(url, left, top, width, height, callback);
    },
    /** 全屏打开窗口 */
    windowOpenFull: function (url, callback) {
        this.windowOpen(url, 0, 0, window.top.innerWidth, window.top.innerHeight, callback);
    },

    //封装通用的弹出新页面方法，callback为子页面关闭的回调方法
    windowOpen: function (url, left, top, width, height, callback) {
        //创建一个标签用于子页面回调赋值
        var label = "trans-value-label";
        var transLabel = document.getElementById(label);
        if (!transLabel) {
            transLabel = document.createElement("input");
            transLabel.id = label;
            transLabel.style.display = "none";
            document.body.appendChild(transLabel);
        }
        transLabel.value = "";
        var windowFeatures = "";
        windowFeatures += "left=" + (left === null ? 300 : left);
        windowFeatures += ",top=" + (top === null ? 60 : top);
        windowFeatures += ",width=" + (width === null ? 500 : width);
        windowFeatures += ",height=" + (height === null ? 400 : height);
        windowFeatures += ",modal=yes,resizable=yes,scrollbars=yes";
        var wd = window.open(url, "", windowFeatures);
        var winTimer = window.setInterval(function () {
            if (wd && wd.closed) {
                //这里可以做赋值操作
                if (callback) {
                    if (transLabel.value) {
                        callback(JSON.parse(transLabel.value));
                    } else {
                        callback({});
                    }
                }
                transLabel.value = "";
                window.clearInterval(winTimer);
            }
        }, 500);
    },
    //子窗口关闭页面方法，与windowOpen对应
    windowClose: function (jsonObj) {
        try {
            var transLabel = window.opener.document.getElementById('trans-value-label');
            if (transLabel) {
                if (jsonObj)
                    transLabel.value = JSON.stringify(jsonObj);
                else
                    transLabel.value = "";
            }
            parent.window.close();
        }
        catch (e) {
            window.close();
        }
    },
    //获取url参数名,如果href为空，则默认取当前页面的url地址
    getUrlParam: function (name, href) {
        if (!href)
            href = window.location.href;
        var reg = new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = href.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    //检查API请求是否需要登录，如果需要登录则跳转到重新登录页面，登录成功后刷新当前页面
    checkHttpLogin: function (response, callback) {
        if (response.request.responseURL && response.request.responseURL.indexOf("main/login.html") > 0) {

            var lastLoginTime = userStorage.get(userStorage.keys.lastLoginTimeKey);
            var now = new Date();
            //重新登录成功后会清除该key
            if (lastLoginTime) {
                var msg = {success: false, message: ""};
                callback(msg);
                return;
            }
            var whiteList = ["/admin/main/cms/user/notices.do"];
            for(var i in whiteList){
                if(response.config.url == whiteList[i]){
                    if (callback) {
                        var msg = {success: false, message: ""};
                        callback(response.data);
                    }
                    return;
                }
            }
            userStorage.set(userStorage.keys.lastLoginTimeKey, now.getTime().toString());
            var url = Config.staticBaseUrl + "main/relogin.html";
            Util.windowOpenCenter(url, 500, 400, function (result) {
                if(result){
                    var msg = {success: false, message: "登录成功，请重新操作一下"};
                    callback(msg);
                }
            });
        } else {
            userStorage.delete(userStorage.keys.lastLoginTimeKey);
            if (callback) {
                callback(response.data);
            }
        }
    },
    /** api get请求封装 */
    httpGet: function () {
        var url, data, callback;
        url = arguments[0];
        if (arguments.length == 3) {
            data = arguments[1];
            callback = arguments[2];
        } else {
            data = {};
            callback = arguments[1]
        }

        axios.get(url, {params: data})
            .then(function (response) {
                Util.checkHttpLogin(response, function (data) {
                    if (callback) callback(data);
                });
            })
            .catch(function (error) {
                if (callback) callback({success:false, message: "网络请求异常."});
                console.log(error);
            });
    },

    /** api post 表单数据请求封装 */
    httpPost: function (url, data, callback) {
        axios.post(url, this.transformRequest(data), Config.formHeader)
            .then(function (response) {
                Util.checkHttpLogin(response, function (result) {
                    if (callback) callback(result, data);
                });
            })
            .catch(function (error) {
                console.log(error);
                callback(error, data);
            });
    },

    /** api post json数据请求封装 */
    httpPostJson: function (url, data, callback) {
        axios.post(url, data)
            .then(function (response) {
                Util.checkHttpLogin(response, function (result) {
                    if (callback) callback(result, data);
                });
            })
            .catch(function (error) {
                console.log(error);
                if (callback) callback({success:false, message: "网络请求异常."}, data);
            });
    },

    /** api post file数据请求封装 */
    httpPostFile: function (url, data, callback) {
        axios.post(url, data)
            .then(function (response) {
                Util.checkHttpLogin(response, function (result) {
                    if (callback) callback(result, data);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    //图片DataURI转Blob
    dataURItoBlob: function (dataURI) {
        var type = dataURI.match(/data:([^;]+)/)[1];
        var base64 = dataURI.replace(/^[^,]+,/, '');
        var byteString = atob(base64);

        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: type});
    },
    //对比两个对象的key，删除多余的key值
    removePlusKey: function (newObj, defaultObj) {
        for (var key in newObj) {
            if (typeof defaultObj[key] == "undefined") {
                delete newObj[key];
            }
        }
        return newObj;
    },
    //本地图片上传时进行压缩处理
    multiCompressImage: function (files, quality, maxWidth, maxHeight, callback) {
        var results = {totalCount: 0, successCount: 0, failedCount: 0, successFiles: []};
        results.totalCount = files.length;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var isJPG = file.type.indexOf('image/') != -1;
            if (!isJPG) {
                callback('上传图片只能是图片格式!', null);
                return;
            }
        }
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            Util.singleCompressImage(file, quality, maxWidth, maxHeight, function (err, result) {
                if (result.success) {
                    results.successCount++;
                    results.successFiles.push(result.data[0]);
                }
                else {
                    results.failedCount++;
                }
                if (results.successCount + results.failedCount == results.totalCount) {
                    if (results.failedCount > 0)
                        callback("上传图片失败。", results);
                    else
                        callback(null, results);
                }
            });
        }
    },
    //单图压缩
    singleCompressImage: function (file, quality, maxWidth, maxHeight, callback) {

        if (!window.FileReader || !window.Blob) {
            return errorHandler('您的浏览器不支持图片压缩')();
        }
        var reader = new FileReader();
        var mimeType = file.type || 'image/jpeg';
        reader.onload = createImage;
        reader.onerror = errorHandler('图片读取失败！');
        reader.readAsDataURL(file);
        function createImage() {
            var dataURL = this.result;
            var image = new Image();
            image.onload = compressImage;
            image.onerror = errorHandler('图片加载失败');
            image.src = dataURL;
        }

        function compressImage() {
            var ratio = this.naturalHeight / this.naturalWidth;
            var canvas = document.createElement('canvas');
            canvas.width = Math.min(this.naturalWidth, maxWidth);
            canvas.height = canvas.width * ratio;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            var dataURI = canvas.toDataURL(mimeType, quality);
            var blob = Util.dataURItoBlob(dataURI);
            var form = document.createElement("form--" + new Date().getTime());
            var myFormData = new FormData(form);
            myFormData.append("file", blob, "cropper-image.jpg");
            var url = Config.apiBaseUrl + "file/upload.do";
            Util.httpPostFile(url, myFormData, function (result) {
                callback(null, result);
            });
        }

        function errorHandler(message) {
            return function () {
                var error = new Error('Compression Error:', message);
                callback(error, null);
            };
        }
    },
    // 灰度化图像数据
    generateGrayImage: function (lastNormalImageData) {
        // console.log(lastNormalImageData);
        var grayData = new ImageData(lastNormalImageData.width, lastNormalImageData.height);

        //chrome浏览器报错，ie浏览器报安全错误信息，原因往下看
        //imagedata读取的像素数据存储在data属性里，是从上到下，从左到右的，每个像素需要占用4位数据，分别是r,g,b,alpha透明通道
        for (var i = 0; i < grayData.height; ++i) {
            for (var j = 0; j < grayData.width; ++j) {
                var x = i * 4 * grayData.width + 4 * j;
                // 原图色彩
                var r = lastNormalImageData.data[x],
                    g = lastNormalImageData.data[x + 1],
                    b = lastNormalImageData.data[x + 2];

                //透明度设置为255,0表示完全透明
                grayData.data[x + 3] = 255;
                //图片灰度化 G ＝ 0.3R + 0.59G + 0.11B
                var grayValue = Math.floor(0.3 * r + 0.59 * g + 0.11 * b);
                grayData.data[x] = grayValue;
                grayData.data[x + 1] = grayValue;
                grayData.data[x + 2] = grayValue;
            }
        }

        // console.log(grayData);
        return grayData;
    },
    // layer对话框工具
    layerDialog: {
        open: function (title, width, height, url, data, callback) {
            //创建一个标签用于子页面回调赋值
            var label = "dialog-trans-value-label";
            var transLabel = document.getElementById(label);
            if (!transLabel) {
                transLabel = document.createElement("input");
                transLabel.id = label;
                transLabel.style.display = "none";
                document.body.appendChild(transLabel);
            }
            if (data) {
                transLabel.value = JSON.stringify(data);
            } else {
                transLabel.value = "";
            }

            var dialog = layer.open({
                title: title ? title : '信息',
                type: 2,
                area: [width + 'px', height + 'px'],
                fixed: false,
                maxmin: false,
                content: url,
                btn: ['确定', '取消'],
                btn1: function (index, layerRef) {
                    // console.log("确定点击")
                    if (callback) {
                        if (transLabel.value) {
                            callback(JSON.parse(transLabel.value));
                        }
                        else {
                            callback({});
                        }
                    }
                    transLabel.vaule = '';
                    layer.close(dialog);
                },
                btn2: function (index, layerRef) {
                    // console.log("取消点击")
                    transLabel.vaule = '';
                }
            })
        },
        // 设置回调值（子窗口调用）
        setData: function (data) {
            var transLabel = parent.window.document.getElementById('dialog-trans-value-label');
            ;
            if (transLabel) {
                if (data)
                    transLabel.value = JSON.stringify(data);
                else
                    transLabel.value = "";
            }
        },
        // 取传递值（子窗口调用）
        getData: function () {
            var transLabel = parent.window.document.getElementById('dialog-trans-value-label');
            ;
            if (transLabel) {
                return JSON.parse(transLabel.value);
            }
        },
        // 关闭layer对话框（在子窗口调用）
        close: function (data) {
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            var transLabel = parent.window.document.getElementById('dialog-trans-value-label');
            ;
            if (transLabel) {
                if (data)
                    transLabel.value = JSON.stringify(data);
                else
                    transLabel.value = "";
            }
            parent.layer.close(index);
        }
    },
    Cookie: {
        // 设置cookie
        setCookie: function (name, value, exdays) {
            var d = new Date();
            if (!exdays) {
                exdays = 30;
            }
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString() + "; ";
            var path = "path=/; ";
            document.cookie = name + "=" + escape(value) + "; " + expires + path;
        },
        // 获得cookie
        getCookie: function (name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name
                + "=([^;]*)(;|$)"));
            if (arr != null)
                return unescape(arr[2]);
            return null;
        }
    },
    //将数字串转换为亿万单位
    number2unit: function (value) {
        var unitIndex;
        var str = "";
        var unit = ["", "万", "亿"];
        if (typeof(value) == 'number') {
            value = String(value);
        }
        var arr = value.split("");
        //数组去空格
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == " ") {
                arr.splice(i, 1);
                i--;
            }
        }
        //去除首位0
        while (arr[0] == 0) {
            arr.splice(0, 1);
        }
        //确定第几个单位
        if (arr.length % 4 == 0) {
            unitIndex = Math.floor(arr.length / 4) - 1;
        } else if (arr.length % 4 != 0) {
            unitIndex = Math.floor(arr.length / 4)
        }
        //进行单位添加
        if (unitIndex >= 0) {
            unitIndex > 2 ? unitIndex = 2 : unitIndex;
            for (var i = 0; i < arr.length - unitIndex * 4; i++) {
                str += arr[i];
            }
            if (unitIndex > 0) {
                str += unit[unitIndex];
                str += "+";
            }
        }
        return str;
    }
};
//用户信息（全局）
var userUtil = {
    base64: new Base64(),
    //菜单权限对象，key为权限ID，value为是否有权限,调用规则 menuPerm.["菜单id_子菜单id"]:true:false
    //登录用户代码信息
    loginUserKey: "login_user",
    //用户信息保存key
    userKey: "default_user_info",
    //菜单权限信息保存key
    menuPermKey: "role_menuPerm",
    //操作权限信息保存key
    operatePermKey: "role_operatePerm",
    //操作栏目权限信息保存key
    columnPermKey: "role_columnPerm",
    //其他权限信息保存key
    otherPermKey: "role_otherPerm",
    //用户信息
    tokenKey: "token",
    //site对象
    siteKey: 'site',
    //返回用户信息对象
    user: function () {
        var storage = window.localStorage;
        var defaultUser = {
            deptId: -1,
            password: "",
            phone: "",
            roleId: -1,
            siteId: -1,
            userCode: "",
            userId: -1,
            userName: "",
            userStatus: 0,
            userType: 0
        };
        if (storage) {
            var userInfo = storage.getItem(this.userKey);
            if (userInfo)
                return JSON.parse(this.base64.decode(userInfo));
            else
                return defaultUser;
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
            return defaultUser;
        }
    },
    //返回扩展字段site对象
    getSite: function () {
        var storage = window.localStorage;
        var defaultSite ={
            siteId: 0,
            teExpandField:{
                portalName: '',
                hgcdcx: '',
                vms: '',
                vmsApi: '',
                vmsPartnerToken: '',
                vmsSystem: '',
                hgphoto: '',
                hgphotoApi: '',
                location: ''
            }
        } ;
        if (storage) {
            var siteInfo = storage.getItem(this.siteKey);
            if (siteInfo)
                return JSON.parse(this.base64.decode(siteInfo));
            else
                return defaultSite;
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
            return defaultSite;
        }
    },
    //判断用户是不是站点管理员
    isAdmin: function () {
        if (this.user().userType == 1 || this.user().userType == 9999)
            return true;
        else
            return false;
    },
    //判断用户是否为超级管理员
    isSuperAdmin: function () {
        if (this.user().userType == 9999)
            return true;
        else
            return false;
    },
    //登录成功后保存用户信息到本地数据库
    save: function (data) {
        var storage = window.localStorage;
        if (storage) {
            if (!data.user.userCode) data.user.userCode = "";
            storage.setItem(this.loginUserKey, data.user.userCode);
            if (!data.user) data.user = "";
            storage.setItem(this.userKey, this.base64.encode(JSON.stringify(data.user)));
            if (!data.role.menuPerm) data.role.menuPerm = "[]";
            storage.setItem(this.menuPermKey, this.base64.encode(data.role.menuPerm));
            if (!data.role.columnPerm) data.role.columnPerm = "[]";
            storage.setItem(this.columnPermKey, this.base64.encode(data.role.columnPerm));
            if (!data.role.operatePerm) data.role.operatePerm = "[]";
            storage.setItem(this.operatePermKey, this.base64.encode(data.role.operatePerm));
            if (!data.role.otherPerm) data.role.otherPerm = "[]";
            storage.setItem(this.otherPermKey, this.base64.encode(data.role.otherPerm));
            if (!data.token) data.token = "";
            storage.setItem(this.tokenKey, data.token);
            if (data.site) {
                storage.setItem(this.siteKey, this.base64.encode(JSON.stringify(data.site)));
            } else {
                storage.setItem(this.site, '');
            }
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
        }
    },
    //通过键取出缓存在本地的信息
    get: function (itemKey) {
        var storage = window.localStorage;
        if (storage) {
            return storage.getItem(itemKey);
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
        }
    },
    //退出清理本地用户缓存信息
    clear: function () {
        var storage = window.localStorage;
        if (storage) {
            storage.removeItem(this.userKey);
            storage.removeItem(this.menuPermKey);
            storage.removeItem(this.columnPermKey);
            storage.removeItem(this.otherPermKey);
            storage.removeItem(this.operatePermKey);
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
        }
    },
    //菜单权限对象，key为菜单ID，value为是否有权限,调用规则 menuPerm.["模块id_操作项id"]:true:false
    menuPerm: function () {
        var storage = window.localStorage;
        if (storage) {
            var menuStr = storage.getItem(this.menuPermKey);
            if (menuStr)
                return this.getPermObject(Config.defaultMenuData, this.base64.decode(menuStr));
            else
                return {};
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
            return {};
        }
    },
    //我的权限范围内菜单项
    myTopMenus: function () {
        //过滤没有权限的菜单模块
        var menuPerm = this.menuPerm();
        var myTopMenus = [];
        var isAdmin = this.isAdmin();
        for (var i in Config.defaultTopMenus) {
            var topMenu = Config.defaultTopMenus[i];
            if (menuPerm[topMenu.id] == true || isAdmin) {
                var tmpTopMenu = topMenu;
                var tmpSubMenu = [];
                for (var j in topMenu.children) {
                    var subMenu = topMenu.children[j];
                    if (menuPerm[subMenu.id] == true || isAdmin) {
                        tmpSubMenu.push(subMenu);
                    }
                }
                tmpTopMenu.children = tmpSubMenu;
                myTopMenus.push(tmpTopMenu);
            }
        }
        return myTopMenus;
    },
    //栏目权限对象
    columnPerm: function () {
        var storage = window.localStorage;
        if (storage) {
            var columnPerms = [];
            try {
                var columnPerm = this.base64.decode(storage.getItem(this.columnPermKey));
                columnPerms = JSON.parse(columnPerm);
            }
            catch (e) {
                columnPerms = [];
            }
            return columnPerms;
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
            return {};
        }
    },
    //其他权限对象
    otherPerm: function () {
        var storage = window.localStorage;
        if (storage) {
            var otherPerm = this.base64.decode(storage.getItem(this.otherPermKey));
            var otherPerms = [];
            try {
                otherPerms = JSON.parse(otherPerm);
            }
            catch (e) {
                otherPerms = [];
            }
            return otherPerms;
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
            return {};
        }
    },
    //操作权限对象，key为权限ID，value为是否有权限,调用规则 operatePerm.["模块id_操作项id"]:true:false
    operatePerm: function () {
        var storage = window.localStorage;
        if (storage) {
            return this.getPermObject(Config.defaultOperateData, this.base64.decode(storage.getItem(this.operatePermKey)));
        }
        else {
            alert("您的浏览器不支持浏览器会话，请下载最新的Chrome浏览器。");
            return {};
        }
    },
    //生成key-value权限对象方法
    getPermObject: function (defaultData, permString) {
        //生成有权限的权限对象，key为权限ID，value为是否有权限
        var menuPerms = [];
        try {
            menuPerms = JSON.parse(permString);
        }
        catch (e) {
            menuPerms = [];
        }
        var hasPermMenus = {};
        for (var i in menuPerms) {
            var subMenus = menuPerms[i].children;
            var isSubMenuPerm = 0;
            for (var j in subMenus) {
                var subMenu = subMenus[j];
                if (subMenu.perm == true) {
                    isSubMenuPerm++;
                    hasPermMenus[menuPerms[i].id + "_" + subMenu.id] = true;
                }
                else {
                    hasPermMenus[menuPerms[i].id + "_" + subMenu.id] = false;
                }
            }
            if (isSubMenuPerm > 0)
                hasPermMenus[menuPerms[i].id] = true;
            else
                hasPermMenus[menuPerms[i].id] = false;
        }
        var isAdmin = this.isAdmin();
        //填充没有权限的菜单key默认值
        for (var i in defaultData) {
            var subMenus = defaultData[i].children;
            for (var j in subMenus) {
                var subMenu = subMenus[j];
                if (hasPermMenus[defaultData[i].id + "_" + subMenu.id] != true) {
                    hasPermMenus[defaultData[i].id + "_" + subMenu.id] = false;
                }
                if (isAdmin) //站点管理员默认具有所有权限
                    hasPermMenus[defaultData[i].id + "_" + subMenu.id] = true;
            }
            if (isAdmin) {//站点管理员默认具有所有权限
                hasPermMenus[defaultData[i].id] = true;
            }
        }
        return hasPermMenus;
    },
    //获取登录用户信息
    getLoginUser: function () {
        var storage = window.localStorage;
        if (storage) {
            var loginUser = storage.getItem(this.loginUserKey);
            if (loginUser)   return loginUser;
            else    return null;
        }
        else {
            return null;
        }
    }
};
/*******Date扩展********/
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/*******Vue方法扩展***************/
Vue.prototype.$success = function (msg) {
    this.$message({message: msg, type: 'success', duration: 1500});
};
Vue.prototype.$error = function (msg) {
    this.$message({message: msg, type: 'error', durations: 1500});
};
Vue.prototype.$showLoading = function (msg, element) {
    return this.$loading({
        lock: true,
        text: msg,
        fullscreen: false,
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
    });
};

/******Base64********/
function Base64() {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}