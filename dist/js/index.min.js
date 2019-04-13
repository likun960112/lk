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

	// banner图
	var aBtns = $(".bannerTab").find(".rslides_tabs").find("li");
	var aLis = $(".bannerTab").find(".rslides").find("li");

	var iNow = 0; //当前图片的下标
	var timer = null;
	var i = 0;
	//自动轮播
	timer = setInterval(changeRight, 3000);
	
	//点击左右按钮切换
	$(".bannerTab .prev").click(function(){
		changeLeft();
		return false;
	});
	$(".bannerTab .next").click(function(){
		changeRight();
		return false;
	});
	$(".bannerTab .rslides").on({
		mouseenter: function(){
			clearInterval(timer);
		},
		mouseleave: function(){
			clearInterval(timer);
			timer = setInterval(changeRight, 3000);
		}
	})
	//滑过按钮切换图片
	$(".bannerTab .rslides_tabs").on({
		mouseenter: function(){
			clearInterval(timer);
			if (iNow != $(this).index()) {
				iNow = $(this).index();
				i++;
				change();
			}
		},
		mouseleave: function(){
			clearInterval(timer);
			timer = setInterval(changeRight, 3000);
		}
	}, "li");

	function changeRight(){
		iNow++;
		i++;
		if (iNow == 6) {
			iNow = 0;
		}
		change();
		
	}
	function changeLeft(){
		i++;
		iNow--;
		if (iNow == -1) {
			iNow = 5;
		}
		change();
		
	}

	function change(){
		$(".bannerTab .rslides_tabs li").css("backgroundColor", "#dddddd")
		.eq(iNow).css("backgroundColor", "#a10000");
		$(".bannerTab .rslides li").css({
			opacity: 0,
			"z-index": i
		})
		.eq(iNow).stop().animate({
			opacity: 1,

		}, 1000);
	}


/*	aBtns.on("mouseenter", function(){
		iNow = $(this).index();
		aLis.stop().animate({
			opacity: 0
		}, 500);
		aLis.eq(iNow).stop().animate({
			opacity: 1
		}, 500);
		aBtns.css("backgroundColor", "#dddddd");
		aBtns.eq(iNow).css("backgroundColor", "#a10000");
	})

	tab();
	function tab(){
		timer = setInterval(function(){
			iNow++;
			aLis.stop().animate({
				opacity: 0
			}, 500);
			aLis.eq(iNow).stop().animate({
				opacity: 1
			}, 500, function(){
				if (iNow == 5) {	
					iNow = 0;
					setTimeout(function(){
						aLis.eq(0).stop().animate({
							opacity:1
						},500)
						aBtns.css("backgroundColor", "#dddddd");
						aBtns.eq(0).css("backgroundColor", "#a10000");

					}, 3000);
					
				}
			});
			aBtns.css("backgroundColor", "#dddddd");
			aBtns.eq(iNow).css("backgroundColor", "#a10000");

		}, 3000);
	}
	aLis.on("mouseenter", function(){
		clearInterval(timer);
	})
	aLis.on("mouseleave", function(){
		tab();
	})

	var oPrev = $(".bannerTab").find(".prev");
	var oNext = $(".bannerTab").find(".next");
	oPrev.on("click", function(){
		iNow--;
		if (iNow < 0) {
			iNow = 5;
			tab();
		}
		return false;
	})
	oNext.on("click", function(){
		iNow++;
		if (iNow > 5) {
			iNow = 0;
			tab();
			
		}
		return false;
	})*/

})		