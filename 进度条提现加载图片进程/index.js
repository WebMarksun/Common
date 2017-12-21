$(function() {
    //创建一个加载
    var loader = new window.PxLoader(),
        baseUrl = "./";

    var fileList = [
        "video/2.mp4",
        "video/3.mp4"
    ];

    for (var i = 0; i < 97; i++) {
        fileList.push("images/" + i + ".png");
    }

    for (var i = 0; i < fileList.length; i++) {
        var pxImage = new PxLoaderImage(baseUrl + fileList[i]);
        pxImage.imageNumber = i + 1;
        loader.add(pxImage);
    }

    //加载的进度...
    loader.addProgressListener(function(e) {
        var num = Math.floor(e.completedCount / e.totalCount * 100);
        $("#loading_p").text(num + "%");
    });
    //加载完成执行...
    loader.addCompletionListener(function() {
        $("#loading_p").css({ display: 'none' });
        $('#play').css('display', 'block');

    });
    //开始加载loader...
    loader.start();

    //去除屏幕长按事件
    window.ontouchstart = function(e) {
        e.preventDefault();
    };

    //横屏竖屏问题
    function set_html_fontsize() {
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        h < w ? $('#scrrol').show() : $('#scrrol').hide();
    }
    window.orientationchange = function() {
        set_html_fontsize()
    };
    window.onresize = function() {
        set_html_fontsize()
    };
    set_html_fontsize();
})