$(function(){

	//邮箱
	$("#email").blur(function(){
		var str = $("#email").val();
		$("#email").next().css("display", "block");
		if (/^\w+@\w{2,4}\.\w{2,4}$/.test(str)) {
			$("#email").next().html("邮箱格式正确")
			.css("color", "green");
		}else if(str == ""){
			$("#email").next().html("邮箱格式不能为空")
			.css("color", "red");
		}else{
			$("#email").next().html("邮箱格式不正确")
			.css("color", "red");
		}
	})

	//用户名
	$("#username").blur(function(){
		var str = $("#username").val();
		$("#username").next().css("display", "block");
		if (str == "") {
			$("#username").next().html("用户名不能为空")
			.css("color", "red");
		}else if (str.length < 6 || str.length > 18) {
			$("#username").next().html("用户名长度应为6~18个字符")
			.css("color", "red");
		}else if (/\d/.test(str[0])) {
			$("#username").next().html("不能以数字开头")
			.css("color", "red");
		}else if (/\W+/.test(str)) {
			$("#username").next().html("用户名必须以数字字母下划线组成")
			.css("color", "red");
		}else{
			$("#username").next().html("√用户名正确")
			.css("color", "green");
		}
	})

	//密码
	$("#password").blur(function(){
		var str = $("#password").val();
		$("#password").next().css("display", "block");
		if (str == "") {
			$("#password").next().html("密码不能为空")
			.css("color", "red");
		}else if (str.length < 6 || str.length > 16) {
			$("#password").next().html("密码长度应为6~16个字符")
			.css("color", "red");
		}else{
			$("#password").next().html("密码正确")
			.css("color", "green");
		}
	})
	$("#password").keyup(function(){
		var str = $("#password").val();
		$("#password").next().css("display", "block");
		if (/^\d+$/.test(str) || /^[a-z]+$/.test(str) || /^[A-Z]+$/.test(str)) {
			$("#password").next().html("密码强度： 弱")
			.css("color", "red");
		}else if (/^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%^&]+$)[\da-zA-Z@#$%^&_.]+$/.test(str)) {
			$("#password").next().html("密码强度： 强")
			.css("color", "green");
		}else{
			$("#password").next().html("密码强度： 中")
			.css("color", "gold");
		}
	})

	//再次输入密码
	$("#confirmPassWord").blur(function(){
		var psd = $("#password").val();
		var str = $("#confirmPassWord").val();
		$("#confirmPassWord").next().css("display", "block");
		if (str == psd) {
			$("#confirmPassWord").next().html("√输入正确")
			.css("color", "green");
		}else{
			$("#confirmPassWord").next().html("两次输入密码不一致，请重新输入")
			.css("color", "red");
		}
	})

	//手机号
	$("#phone").blur(function(){
		var str = $("#phone").val();
		$("#phone").next().css("display", "block");
		if (/^[1][3,4,5,7,8][0-9]{9}$/.test(str)) {
			$("#phone").next().html("√手机号格式正确")
			.css("color", "green");
		}else{
			$("#phone").next().html("请输入有效的手机号")
			.css("color", "red");
		}
	})

	$(".submit-box .submitBtn").click(function(){
		var str = queryString($("input"));
		//alert(str);
		if ($(".hint").eq(0).html() != "邮箱格式正确" || $(".hint").eq(1).html() != "√用户名正确" || $(".hint").eq(2).html() != "密码正确" || $(".hint").eq(3).html() != "√输入正确" || $(".hint").eq(4).html() != "√手机号格式正确") {
			alert("请检查信息填写是否正确");
		}else{
			$.ajax({
				method: "post",
				url: "../php/register.php",
				data: str,
				success: function(data){
					//alert(data);
					var obj = JSON.parse(data);
					if (!obj.code) {
						alert(obj.message);
						setTimeout(function(){
							location.assign("login.html");
						}, 500);
					}else{
						alert("错误代码：" + obj.code + "，信息：" + obj.message);
					}
				},
				error: function(msg){
					alert("错误信息" + msg);
				}
			})

		}
		

	})

	function queryString(nodes){
		var str = '';
		for(var i = 0; i < nodes.length; i++){
			str += nodes[i].name + "=" + nodes[i].value + "&";
		}
		return str.substring(0, str.length - 1);
	}


})