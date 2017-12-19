var baseW = "375",
    baseH = "630",
    baseR = baseW / baseH;

function checkPlatform() {
    return (/(iPhone|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i.test(navigator.userAgent));
}

function checkVideo() {
    if (!!document.createElement("video").canPlayType) {
        var vidTest = document.createElement("video");
        oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
        if (!oggTest) {
            h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
            if (!h264Test) {
                console.log("h264 not supported ");
                return false
            } else {
                if (h264Test === "probably") {
                    console.log("h264 supported");
                    return true
                } else {
                    console.log("h264 not supported ");
                    return false
                }
            }
        } else {
            if (oggTest === "probably") {
                console.log("ogg supported");
                return true
            } else {
                console.log("ogg not supported ");
                return false
            }
        }
    } else {
        return false
    }
}
if (!checkVideo()) {
    alert("请升级浏览器，告别历史尘埃~")
}

function resizeIt() {
    console.log($(window).height());
    $("body,html").css({
        width: $(window).height() * baseR,
        margin: "0 auto",
        overflow: "hidden"
    })
};
if (!checkPlatform()) {
    $(window).resize(function() {
        setTimeout(function() {
            resizeIt()
        }, 200)
    });
    resizeIt();
};