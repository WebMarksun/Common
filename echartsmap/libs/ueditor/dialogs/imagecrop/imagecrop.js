/**
 * Created by zkzc-mcy on 2017/10/26.
 */
var app = new Vue({
    el: '#app',
    data: {
        currentImg: null,
    },
    mounted: function () {
        this.currentImg = this.getCurrentImg();
        var picUrl = this.currentImg.src;
        var cropperUrl = Config.staticBaseUrl + "website/article/form/cropper-image.html";
        cropperUrl += picUrl ? "?url=" + picUrl + "&aspectRatio=NaN" : "";
        var ifCropper = document.getElementById('cropper-image');
        var ifHeight = window.innerHeight - 2;
        ifCropper.height = ifHeight;
        ifCropper.src =  cropperUrl;

        // var ifOnline = document.getElementById('online-image-lib');
        // var ifHeight1 = window.innerHeight - 32;
        // ifOnline.height = ifHeight1;
        // ifOnline.src =  Config.staticBaseUrl + "website/article/form/picture-lib.html";
    },
    methods: {
        // 获取当前选择图片标签
        getCurrentImg: function () {
            var __img = editor.selection.getRange().getClosedNode();
            return __img;
        },
        // 插入图片
        insertImage: function (imgObjs) {
            editor.fireEvent('beforeInsertImage', imgObjs);
            editor.execCommand("insertImage", imgObjs);
        },
        //图片裁剪页面iFrame关闭回调
        iFrameCallback: function(data){
            if(data){
                var newImgUrl = data[0].url;
                var imgObj = {};
                imgObj.src = newImgUrl;
                imgObj.data_ue_src = newImgUrl;
                imgObj._src = newImgUrl;
                imgObj.width = '480';
                this.insertImage(imgObj);
            }
            dialog.close();
        },
        //关闭窗口
        closeWindow: function(){
            dialog.close();
        }
    }
});