

$(document).ready(function () {
	var timer;
	var startdeg = -100;//第一张的起始位置
	var spacedeg = 30;//每张之间的差距度数
	var step = 0;//动画的步伐大小
	var startX,startY,endX,endY,X,Y;
	$(window).on("touchstart", function (e) {
		e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX
	})
	$(window).on("touchend", function (e) {
		e.preventDefault();
        endX = e.originalEvent.changedTouches[0].pageX,
        X = endX - startX
		if(Math.abs(X)>10){//判断是滑动还是点击滑动为进行动画点击为暂停动画
			clearInterval(timer);
			step =step + X/1000;//步伐大小
			if(step>0.2){
				step = 0.2;
			}else if(step < -0.2){
				step = -0.2;
			}
			timer = xunhuan();
		}else{
			clearInterval(timer);//保证暂停后依旧是自己控制快慢
			step = 0;
		}
	})
function xunhuan(){
	var timer  = setInterval(function () {
		//如果要是加图片数量的话要看好css的opacity;
		$.each($(".page"),function(index,item){
			var placedeg = startdeg - index*spacedeg;
			$(item).css({'transform':'rotateY(' + placedeg + 'deg)',"display":"none"});//display多余了（留着以备其他问题）
			startdeg+=step;
			console.log(placedeg);
			if(placedeg<(-100)||placedeg>100){//在不可视区域时display为隐藏
				// alert("hide"+index);
				$(item).css("display","none");
			}
			if(placedeg>(-100)&&placedeg<100){//在可视区域display为显示
				// alert("show"+index);
				$(item).css("display","block");
			}
			if(Math.abs(placedeg)>(spacedeg*$(".page").length+100)){//判断什么时候停止转动，要注意最后一个和第一个之间的差值
				console.log((spacedeg*$(".page").length+100));
				clearInterval(timer);
			}
		})
	}, 20)
	return timer;
}


























	$.ajax({
		type: "get",
		async: true,
		url: "http://partner.qianlong.com/chart/api/cshare",
		dataType: "jsonp",
		data: {
			"weburl": location.href.split("#")[0]
		},
		success: function (json) {
			wx.config({
				debug: false,
				appId: json.appId,
				timestamp: json.timestamp,
				nonceStr: json.nonceStr,
				signature: json.signature,
				jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
			});
		},
		error: function () {
			console.log("share error");
		}
	});
	wx.ready(function () {
		var obj_co = {
			title: "俺们留不住青春，还留不住童心嘛？",
			link: window.location.href,
			imgUrl: "http://comictest.qianlong.com/zt/liuyi/image/share.jpg",
			success: function () {
			},
			cancel: function () { }
		},
			obj_co_desc = {
				desc: "如果你不开心，不妨调侃一下生活中的疲惫，儿童节快乐！"
			},
			obj_timeline = $.extend({}, obj_co),
			obj_appmsg = $.extend({}, obj_co_desc, obj_co),
			obj_qq = $.extend({}, obj_co_desc, obj_co),
			obj_wb = $.extend({}, obj_co_desc, obj_co),
			obj_qzone = $.extend({}, obj_co_desc, obj_co);

		wx.onMenuShareTimeline(obj_timeline);
		wx.onMenuShareAppMessage(obj_appmsg);
		wx.onMenuShareQQ(obj_qq);
		wx.onMenuShareWeibo(obj_wb);
		wx.onMenuShareQZone(obj_qzone);


	});

	wx.error(function (res) {
		alert(res.errMsg);
	});
})

$(function () {
	var obj = {};
	obj.index = 0;
	obj.audio = function () {
		if (obj.index == 0) {
			$("audio")[1].pause();
			obj.index = 1;
			$("#audio_btn").removeClass('_Animate');
		} else {
			$("audio")[1].play();
			obj.index = 0;
			$("#audio_btn").addClass('_Animate');
		};
	};
	$('#audio_btn').on('click', function () {
		obj.audio();
	});


	$(".section").on("touchstart", function () {
		$("#bgagain")[0].play();
	})
});
