<?php 
	//设置编码格式，让当前页面支持中文
	header('content-type:text/html;charset="utf-8"');

	$responseData = array("code" => 0, "message" => "");

	$username = $_POST["username"];
	$password = $_POST["password"];

	$password = md5(md5($password)."likun");

	$link = mysql_connect("localhost", "root", "123456");
	if(!$link){
		echo "链接数据库失败";
		exit;
	}

	mysql_set_charset("utf8");

	mysql_select_db("qd1901");

	$sql = "SELECT * FROM vancl WHERE username = '${username}' AND password = '${password}'";

	$res = mysql_query($sql);

	$row = mysql_fetch_assoc($res);

	if(!$row){
		$responseData["code"] = 1;
		$responseData["message"] = "用户名或密码错误";
	}else{
		$responseData["message"] = "登录成功";
	}

	echo json_encode($responseData);

	mysql_close($link);

 ?>