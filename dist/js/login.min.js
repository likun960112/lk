$(function(){
	$("#loginBtn").click(function(){
		var str = queryString($("input"));
		$.ajax({
			method: "post",
			url: "../php/login.php",
			data: str,
			success: function(data){
				var obj = JSON.parse(data);

				if (!obj.code) {
					if (window.localStorage) {
						localStorage.setItem("username", $("input").eq(0).val());
						localStorage.setItem("password", $("input").eq(1).val()); 
					}
					alert(obj.message);
				}else{
					$("#_upwd").next().html(obj.message);
					$(".hint").css("visibility", "visible");
					
				}
			},
			error: function(msg){
				alert("错误信息：" + error);
			}
		})
	})

	function queryString(nodes){
		var str = '';
		for(var i = 0; i < nodes.length; i++){
			str += nodes[i].name + "=" + nodes[i].value + "&";
		}
		return str.substring(0, str.length - 1);
	}
})