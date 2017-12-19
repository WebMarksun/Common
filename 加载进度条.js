// pxloader              http://thinkpixellab.com/pxloader/
    
    
    //loading列表
	var basePath = "images/"
	var loader = new window.PxLoader();
	//声明资源文件列表
	var fileList = [
				'pano/p1-1.png',
				'pano/p1-2.png',
				'pano/p2-1.png',
				'pano/p2-2.png',
				'pano/p2-3.png',
				'pano/p3-1.png',
				'pano/p3-2.png',
				'pano/p3-3.png',
				'pano/p3-4.png',
				'pano/p4-1.png',
				'pano/p4-2.png',
				'pano/p4-3.png',
				'pano/p4-4.png',
				'pano/p4-5.png',
				'pano/p5-1.png',
				'pano/p5-2.png'];

	for (var i = 0; i < fileList.length; i++) {
		loader.addImage(basePath + fileList[i]);
	}
	loader.addImage("http://appmusic.qq.com/music/641012099/bgm.mp3");
	loader.addProgressListener(function (e) {
		var percent = Math.round((e.completedCount / e.totalCount) * 100);
		$("#loading_text").html("已加载 " + percent + " %");
		
	});
	loader.addCompletionListener(function () {
		$("#loading_bg").remove();
		ready();
		tl2.play();
		$(".music").show();
	});















//非插件检测是否加载完，可做加载条


	var res = [
        {name:"bird",path:"../res/birds.png"},
        {name:"land",path:"../res/land.png"},
        {name:"pipe1",path:"../res/pipe1.png"},
        {name:"pipe2",path:"../res/pipe2.png"},
        {name:"sky",path:"../res/sky.png"}
	];
	function loadRes(res,callback,barObj){
		var imgs = {};
		var count = 0;
		// 每次有图片完成加载之后都执行这个函数，如果所有图片都加载完成则执行callback函数
		function loadHandler(){
			count++;
			var barNum = count/res.length;
		//增加进度条数字
			if(barObj){
				barNum = barNum.toFixed(4)*100;
				barObj.innerHTML = barNum+"%";   
			}
			if(count>=res.length){
				// 用回调函数来返回数据
				callback(imgs);
			}
		}
		for (var i=0;i<res.length;i++){
			// 遍历资源数组，创建img标签
			var img = new Image();
			img.src = res[i].path;
			img.addEventListener('load',function(){
				loadHandler()
			});
			imgs[res[i].name] = img;
		}
	}