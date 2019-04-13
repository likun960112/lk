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

	//通过ajax加载页面商品信息
	$.ajax({
		method: "get",
		url: "../data/product-list.json",
		success: function(data){
			for(var i = 0; i < data.length; i++){
				$(`<li>
					<a href="${data[i].url1}" target="_blank" title="${data[i].title}">
						<img style="display: block;" src="${data[i].url}" alt="${data[i].title}">
					</a>
					<h3>
						<a href="" target="_blank" title="${data[i].title}">${data[i].title}</a>
					</h3>
					<div class="itPrice" style="display: block; float: none; width: 100%; text-align: center;">
						<span class="itNow" >${data[i].span1}</span>
						<span class="itNow" >${data[i].span2}</span>
					</div>
				</li>`).appendTo($(".contentBox .ylbox ul"));
			}
		},
		error: function(msg){
			alert("错误信息:" + msg);
		}
	})
})