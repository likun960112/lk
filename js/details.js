$(function(){
	// 头部右上角微信二维码显示
	$(".headerBox").find(".attention").find(".weixin").mouseenter(function(){
		$(this).next().css("display", "inline");
	});
	$(".headerBox").find(".attention").find(".weixin").mouseleave(function(){
		$(this).next().css("display", "none");
	});

	// 购物车显示信息
	$(".logoSearch").find(".active").mouseenter(function(){
		$(".buyCar").css("display", "block");
	});
	$(".logoSearch").find(".active").mouseleave(function(){
		$(".buyCar").css("display", "none");
	});

	//下拉菜单
	$(".navBox ul").on("mouseenter", "li", function(){
		$(this).find(".subNav").stop().animate().slideDown();
	});
	$(".navBox ul").on("mouseleave", "li", function(){
		$(this).find(".subNav").stop().animate().slideUp();
	});

	//鼠标滑过小商品
	$(".imageMenu").find("li").on("mouseenter", function(){
		$(this).attr("id", "onlickImg");
	});
	$(".imageMenu").find("li").on("mouseleave", function(){
		$(this).attr("id", "");
	})

	//下载小商品和大商品数据
	$.ajax({
		method: "get",
		url: "../data/details.json",
		success: function(data){
			for(var i = 0; i < data.length; i++){
				$(`<img id="midImg" src="${data[i].url2}" title="童装卫衣 圆领 熊本熊 S1" alt="">`).appendTo($(".boxCenter .bigImg"));
				$(`<img src="${data[i].url2}" alt="" style="">`).appendTo($(".hiddenBox")).appendTo($(".hiddenBox"));
			}
		},
		error: function(msg){
			alert("错误信息：" + msg);
		}
	})

	//滑过商品切换大图片
	var _this = 0;
	$(".leftBox").find(".smallImg").find(".imageMenu").find("li").on("mouseenter", function(){
		_this = $(this).index();
		$(".boxCenter .bigImg img").css('display',"none")
		.eq(_this).css("display","block")
	});

	// //滑过大图片显示放大镜
	// $(".boxCenter .bigImg").on("mouseenter", function(){
	// 	$(".boxCenter .bigImg #lucencyBox").css("display", "block");

	// });
	// $(".boxCenter .bigImg").on("mouseleave", function(){
	// 	$(".boxCenter .bigImg #lucencyBox").css("display", "none");
	// })


	//拖拽并限制出界
	$(".boxCenter .bigImg").mouseenter(function(ev){
		$(".boxCenter .bigImg #lucencyBox").css("display", "block");
		$(".hiddenBox").css("display", "block");
		$(".hiddenBox img").css("display","none")
		$(".hiddenBox img").eq(_this).css("display","block")
	});

	$(".boxCenter .bigImg").mouseleave(function(){
		$(".boxCenter .bigImg #lucencyBox").css("display", "none");
		$(".hiddenBox").css("display", "none");
	})

	$(".boxCenter .bigImg").mousemove(function(ev){
		var l = ev.clientX - $(this).offset().left - 100;
		var t = ev.pageY - $(this).offset().top - 100;
		if (l <= 0) {
			l = 0;
		}
		if (l >= 200) {
			l = 200;
		}
		if (t <= 0) {
			t = 0;
		}
		if (t >= 200) {
			t = 200;
		}
		$(".boxCenter .bigImg #lucencyBox").css("left", l);
		$(".boxCenter .bigImg #lucencyBox").css("top", t);

		$(".hiddenBox img").css("left", -l * (400 / 400));
		$(".hiddenBox img").css("top", -t * (400 / 400));
	})


})