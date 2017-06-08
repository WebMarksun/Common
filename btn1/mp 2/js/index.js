$(document).ready(function(){
	$('#fullpage').fullpage({
		afterLoad: function (anchorLink, index) {
			if (index == 1) {
				$('._animate').removeClass('index_jinju1').addClass('index_jinju1');
			}; 
			if (index == 2) {
				var _index = $('.first');
				afterFun(_index);
			};
			if (index == 3) {
				var _index =$('.second');
				afterFun(_index);
			};
			if (index == 4) {
				var _index = $('.third');
				afterFun(_index);
			};
			if (index == 5) {
				var _index = $('.fourth');
				afterFun(_index);
			};
			if (index == 6) {
				var _index = $('.fifth');
				afterFun(_index);
			};
			if (index == 7) {
				var _index = $('.sixth');
				afterFun(_index);
			};
			if (index == 8) {
				var _index = $('.seventh');
				afterFun(_index);
			};
		},
		onLeave:function(index,nextIndex){
			if (nextIndex !=1) {
				$('._bg').css({display:'block'});
			}else {
				$('._bg').css({display:'none'});
			};
			if (nextIndex == 9) {
				$('.arrow').find('.index_down').css({display:'none'});
			}else{
				$('.arrow').find('.index_down').css({display:'block'});
			};
			if (index ==1) {
				$('._animate').removeClass('index_jinju1');
			};
			if (index == 2) {
				var _index = $('.first');
				initFun(_index);
			};
			if (index == 3) {
				var _index =$('.second');
				initFun(_index);
			};
			if (index == 4) {
				var _index = $('.third');
				initFun(_index);
			};
			if (index == 5) {
				var _index = $('.fourth');
				initFun(_index);
			};
			if (index == 6) {
				var _index = $('.fifth');
				initFun(_index);
			};
			if (index == 7) {
				var _index = $('.sixth');
				initFun(_index);
			};
			if (index == 8) {
				var _index = $('.seventh');
				initFun(_index);
			};
		}
	});
	// 动画效果
	function afterFun(_index){
		var _icon = _index.find('.mask'); 
		var _center = _index.find('.center1');
		setTimeout(function(){
			_icon.stop().animate({
				left:14.18 + 'rem'
			},410)
		},0);
		setTimeout(function(){
			_center.stop().animate({
				top:100+'%'
			},800);
		},310);
	};


	// 初始化图片 音乐播放
	function initFun(_index){
		var _icon = _index.find('.mask'); 
		var _center = _index.find('.center1');
		_icon.stop().css({left:2.18});
		_center.stop().css({top:3+'rem'});
	};
	var obj={
		index:0,
		audio:function(){
			if (obj.index == 0) {
				$("audio")[0].pause();
				obj.index = 1;
				$("#audio_btn").removeClass('Animate');
			}else{
				$("audio")[0].play();
				obj.index = 0;
				$("#audio_btn").addClass('Animate');
			};
		}
	};
	$('#audio_btn').on('click',function(){
		obj.audio();
	});




});