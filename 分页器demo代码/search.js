// window.onload = futetemnction(){
// 	//一共多少条新闻
// 	var maxmes = 19;
// 	//一共多少页
// 	var pageMax = 4;
// 	//当前所在的页码
// 	var pageNum = 1;
// 	//每页的数量
// 	var pagesize = 5;
// 	//请求接口地址
// 	var queryUrl = '';

// }
function getLocalTime(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
function as() {
//	console.log(!$("#searchword").val());console.log(!($("#searchword").val() === 0));
	if(!$("#searchword").val() && !($("#searchword").val() === 0)){return false;}
	ajaxfun();
}
function initTable() {
	if (pageMax <= pageNum) {
		$("#next").addClass('disabled');
		$("#previous").removeClass('disabled');
	}
	if (pageNum <= 0) {
		$("#previous").addClass('disabled');
		$("#next").removeClass('disabled');
	}
	$(".pagebtn").removeClass('current_page');
	$(".pagebtn").each(function(index,item){
//		console.log($(item));
//		console.log(item);

		if(item.innerHTML == pageNum){
//			console.log(item.innerHTML); 
			$(item).addClass('current_page');
		}
	})
//	$(".pagebtn").eq(pageNum - 1).addClass('current_page');
}
// function QueryDriverList() {
// 	driverphone = $("#driverphone").val();
// 	console.log(driverphone)
// 	queryUrl = baseUrl + '/web/driver/getByMobile.do?token=' + token + '&mobile=' + driverphone;
// 	initTable();
// };
function thenext() {
	if (pageMax > pageNum) {
		pageNum++;
		ajaxfun();
	} else {
		return false;
	}

}
function theprevious() {
	if (pageNum > 1) {
		pageNum--;
		ajaxfun();
	} else {
		return false;
	}

}
function ajaxfun() {
	var baseUrl = 'http://192.168.0.101:8080/yscm/doc/findContent?';
	var param = "";
	param += "keyWords=" + $("#searchword").val();
	param += "&pageNum=" + pageNum;
	param += "&pageSize=" + pagesize;
	var urlParam = baseUrl + param;
	$.ajax({
		url: urlParam,
		type: 'get',
		cache: false,
		dataType: 'jsonp',
		jsonp: "callback",
		jsonpCallback: "callback",
		success: function (data) {
			var JSONdata = JSON.stringify(data);
			var htmlJSON = '';
			var dataArea = $("#dataArea");
			// console.log(JSONdata);
			// console.log(data);
			// console.log(data.ALL_ROWS);
			var news = data.ALL_ROWS;

			//分页部分js代码
			maxmes = data.ROW_NUM;
			pageMax = Math.ceil(maxmes / pagesize);
			var pageStr = '';
			pageStr += '<a id="previous" onclick="theprevious()">上一页</a>';
			// console.log(pageMax);
			if (pageMax > 9) {
				if (pageNum <= 5) {
					for (var j = 1; j <= 9; j++) {
						pageStr += '<a class="pagebtn">' + j + '</a>';
//						console.log(j+'小于五');
					}
						pageStr += '...';
				} else if (pageNum >= pageMax - 4) {
						pageStr += '...';
					for (var j = pageMax - 8; j <= pageMax; j++) {
						pageStr += '<a class="pagebtn">' + j + '</a>';
//						console.log(j+'最后阶段');
					}
				}else{
						pageStr += '...';
					for (var j = pageNum - 4; j <= Number(pageNum) + 4; j++) {
						pageStr += '<a class="pagebtn">' + j + '</a>';
//						console.log(j+'中间阶段');
					}
						pageStr += '...';
				}
			}else{
			for (var i = 1; i <= pageMax; i++) {
				pageStr += '<a class="pagebtn">' + i + '</a>';
			}
			}

			pageStr += '<a id="next" onclick="thenext()">下一页</a>';
			$(".page").off().on('click', '.pagebtn', function () {

				pageNum = $(this).html();
//				console.log(pageNum);
				ajaxfun();
				initTable();
				// console.log(this);
				// $(".pagebtn").removeClass('current_page');
				// $(this).addClass('current_page');
			});
			$(".page").html(pageStr);
			initTable();

			//设置搜索头部内容
			$('#keyword').html($("#searchword").val());
			$("#newlength").html(maxmes);
			$('.gailan_search_top').show();
			$.each(news, function (index, item) {
				// console.log(index + ':');
				// console.log(item.docTitle);
				htmlJSON += '<div class="gailan_search_block"><div class="search_img"><a ><img src="./images/video12345678.png"/></a></div><span><a class="search_tit">' + item.docTitle + '</a></span><span class="search_abs">' + item.docAbstract + '</span><span class="search_date">' + getLocalTime(item.docPubtime / 1000) + '</span></div>';
				// console.log(htmlJSON);
			})
			dataArea.html(htmlJSON);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			// console.log(XMLHttpRequest.status);
			// console.log(XMLHttpRequest.readyState);
			// console.log(textStatus);
		},
		complete: function (XMLHttpRequest, textStatus) {
			this;
		}
	});
}