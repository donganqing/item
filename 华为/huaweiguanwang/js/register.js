$(function() {
	//选择国家     点击事件
	$("#subcontent .nation .show").click(function() {
		$("#subcontent .nation .hide").toggle();
	});
	$("#subcontent .nation .hide").click(function() {
		$(this).toggle();
	});

	//点击input按钮  里面的内容消失  键盘事件    键盘被按下时  字体消失
	$("#subcontent input").keydown(function() {
		$(this).next().html("");
	});

	/*------------------------------------正则验证手机号的正确性---------------------------------*/
	
	$("#subcontent #user_name").blur(function() {
		var user = $("#subcontent #user_name").val();
		var reg = /^[1]\d{10}$/;
		if(reg.test(user)) {
			var str_tel = $.cookie("user_name"); //得到cookie;
			if(str_tel) {
				var arr_tel = str_tel.split("||");
				for(var i = 0; i < arr_tel.length; i++) {
					if(arr_tel[i] == user) {
						alert("该手机号已被注册！")
					}
				}
			}
		} else {
			$("#subcontent .number").css("borderColor", "red");
			$(this).css("color", "red");
			$("#subcontent .node_input .error").show();
			close("#subcontent .node_input .error", "#subcontent .number", "#subcontent #user_name");
		}
	});
	//延时4秒消失
	function close(name, element, attr) {
		setTimeout(function() {
			$(name).hide();
			$(attr).css("color", "#AAAAAA");
			$(element).css("borderColor", "#c5c5c5")
		}, 3000)
	}

	/*----------------------------------正则验证短信验证码-------------------------------*/

	$("#user_name1").blur(function() {
		var message = $("#user_name1").val();
		var reg = /^\d{4}$/
		if(reg.test(message)) {

		} else {
			$("#user_name1").val("请输入正确的验证码！");
			$(this).css("color", "red");
		}
	})
	$("#user_name1").focus(function() {
		$("#user_name1").val("");
		$(this).css("color", "#AAAAAA");
	})

	/*------------------------------------正则验证密码--------------------------------------*/

	$("#pw_txt").blur(function() {
		var password = $(".password .pw_top #pw_txt").val();
		//需至少包含一个大写字母、一个小写字母和一个数字，建议不与其他密码相同
		var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,32}$/
		//var reg = /(?=.*[a-z])(?=.*\d)|(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,32}/i
		if(password.length >= 8) {
			if(reg.test(password)) {} else {
				$(".password .pw_top2").css("borderColor", "red");
				$(this).css("color", "red");
				$(".hide_two").show();
				close(".hide_two", ".password .pw_top2", "#pw_txt");
			}
		} else {
			$(".password .pw_top2").css("borderColor", "red");
			$(this).css("color", "red");
			$(".hide_one").show();
			close(".hide_one", ".password .pw_top2", "#pw_txt");
		}
	});
	
	/*-----------------------------------------密码强度改变-------------------------------------*/
	
			//键盘按下事件   密码强度跟着变化  只有1中 弱，2种 中 3种强
			$("#pw_txt").keyup(function(){
				var password = $(".password .pw_top #pw_txt").val();
				if(password.length >= 8 && password.length <= 32){
					if(/[a-z]+/.test(password) && /[0-9]+/.test(password) && /[A-Z]+/.test(password)){
						$(".pw_letter span").eq(2).css({"background": "green","color": "#fff"}).prevAll().css({"background": "green","color": "green"});
					}else if(/[a-z]+/.test(password) || /[A-Z]+/.test(password) || /[0-9]+/.test(password)){
						if(/[a-z]+/.test(password) && /[A-Z]+/.test(password)){
						$(".pw_letter span").eq(1).css({"background": "yellow","color": "#fff"}).prev().css({"background": "yellow","color": "yellow"});
						}else if(/[a-z]+/.test(password) && /[0-9]+/.test(password)){
							$(".pw_letter span").eq(1).css({"background": "yellow","color": "#fff"}).prev().css({"background": "yellow","color": "yellow"});
						}else if(/[A-Z]+/.test(password) && /[0-9]+/.test(password)){
							$(".pw_letter span").eq(1).css({"background": "yellow","color": "#fff"}).prev().css({"background": "yellow","color": "yellow"});
						}else{
						$(".pw_letter span").eq(0).css({"background": "red","color": "#fff"}).siblings().css({"background": "#EEEEEE","color": "#aaa"});
						}
					}
				}else{
					$(".pw_letter span").eq(0).css({
						"background": "#eee",
						"color": "#aaa"
					}).siblings().css({
						"background": "#EEEEEE",
						"color": "#aaa"
					});
				}
			})
	/*-----确认密码-------*/
	$(".pw_top1 #sure_pw_txt").blur(function() {
		var surePwd = $("#sure_pw_txt").val();
		var password = $(".password .pw_top #pw_txt").val();
		if(surePwd == password) {

		} else {
			$(" .pw_top1").css("borderColor", "red");
			$(this).css("color", "red");
			$(".hide_three").show();
			close(".hide_three");
		}
	});

	/*-------------------------------立即注册点击事件----------------------------------*/
	
	//保存手机号  密码
	$("#bnt_bottom").click(function() {
		var tel = $("#user_name").val();
		var pwd = $("#pw_txt").val();
		var message = $("#user_name1").val();
		var sure_pwd = $("#sure_pw_txt").val();
		var html = $("#hide").html();
		if(tel != "" && pwd != "" && message != "" && sure_pwd != "") {
			//--------------
			var str_tel = $.cookie("user_name"); //得到cookie
			//判断cookie中是否有手机号
			if(str_tel) {
				str_tel = str_tel + "||" + tel;
				//alert(str_tel);
				$.cookie("user_name", str_tel, {
					expires: 100,
					path: '/'
				});
			} else {
				//存cookie  手机号
				$.cookie("user_name", tel, {
					expires: 100,
					path: '/'
				});
			}
			var pwd_mm = $.cookie("pw_txt");//得到密码；
			//判断cookie中是否有密码；
			if(pwd_mm){
				pwd_mm = pwd_mm + "||" + pwd;
				//alert(pwd_mm);
				$.cookie("pw_txt", pwd_mm ,{
					expires: 100,
					path: '/'
				});
			}else{
				$.cookie("pw_txt",pwd,{expires:100,path:'/'});
			}
			$("#subcontent").css("display", "none");
			$("#hide").css("display", "block");
			setTimeout(function() {
				window.location.replace("firstPage.html");
			}, 3000)
		} else {
			alert("请完善内容！")
		}
	})
})