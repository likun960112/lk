<?php 
	//设置编码格式，让当前页面支持中文
	header('content-type:text/html;charset="utf-8"');

	$responseData = array("code" => 0, "message" => "");

	$email = $_POST['email'];
	$username = $_POST["username"];
	$password = $_POST["password"];
	$confirmPassWord = $_POST["confirmPassWord"];
	$phone = $_POST["phone"];

	if($password != $confirmPassWord){
		$responseData["code"] = 1;
		$responseData["message"] = "两次密码输入不一致";

		echo json_encode($responseData);
		exit;
	}

	$link = mysql_connect("localhost", "root", "123456");

	if(!$link){
		echo "链接数据库失败";
		exit;
	}

	mysql_set_charset("utf8");

	mysql_select_db("qd1901");

	$password = md5(md5($password)."likun");

	$sql = "SELECT * FROM vancl WHERE username = '${username}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);

	if($row){
		$responseData["message"] = "该用户已存在";
		$responseData["code"] = 3;

		echo json_encode($responseData);
		exit;
	}

	$sql = "INSERT INTO vancl (email, username, password, phone) VALUES ('${email}', '${username}', '${password}', '${phone}')";

	$res = mysql_query($sql);

	if($res){
		$responseData["message"] = "注册成功";
	}else{
		$responseData["message"] = "注册失败";
		$responseData["code"] = 2;
	}

	echo json_encode($responseData);

	mysql_close($link);

 ?>