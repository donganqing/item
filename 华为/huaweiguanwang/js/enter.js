/*-----------------------------------手机号/邮箱的失去焦点事件	正则验证正确性---------------------------*/
$(function() {

	//开始的时候  手机号框获得焦点
	$("#tel_email").focus();
	$("#tel_email").blur(function() {
			var reg1 = /^[1]\d{10}$/
				//验证手机号
			var reg2 = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{5,50}$/
			var txt = $("#tel_email").val();
			if(reg1.test(txt) || reg2.test(txt)) {
				var count = 0//定义count 防止alert弹出多次！
				var str_tel = $.cookie("user_name");//取cookie
				if(str_tel){
					var arr_tel = str_tel.split("||");
					for(var i = 0; i < arr_tel.length; i++) {//遍历cookie 检查手机号有没有注册
						if(arr_tel[i] == txt) {
							count++;
						}
					}
					if(count == 0) {
						alert("亲，该手机号还没有注册，请先完成注册！");
					}
				}else{alert("亲，该手机号还没有注册，请先完成注册！")}
					
				
			} else {
				if($("#tel_email").val() == "") {

					$(".tel_hide1").css("display", "block");
					$(this).parent().css("borderColor", "red");
					close(".tel_hide1", ".tel");
				} else {

					$(".tel_hide2").css("display", "block");
					$(this).parent().css("borderColor", "red");
					close(".tel_hide2", ".tel");
				}
			}
		})
		//封装函数   让隐藏的块4秒后消失
	function close(name, element, attr) {
		setTimeout(function() {
			$(name).hide();
			$(attr).css("color", "#AAAAAA");
			$(element).css("borderColor", "#c5c5c5")
		}, 3000)
	}

	/*----------------------------------------密码------------------------------------------*/

	$("#load_pwd").blur(function() {
		var lmm = $("#load_pwd").val();
		//得到cookie 密码
		var pwd_lm = $.cookie("pw_txt");
		//alert(pwd_lm);
		var arr_pwd = pwd_lm.split("||");
		var sum = 0;
		for(var i = 0; i < arr_pwd.length; i++) {
			if(lmm == arr_pwd[i]) {
				sum++;
			}
		}
		if(sum == 0) {
			alert("您输入的密码有误，请重新输入！");
		}
	})

	/*----------------------------------------随机生成验证码------------------------------------*/
	
	//第一个函数：产生随机数
	//n为产生的验证码数
	function dateCode(n) {
		//验证码中可能包含的字符
		var s = "abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789";
		var ret = "";
		//利用for循环，随机产生验证码中的每个字符；
		for(var i = 0; i < n; i++) {
			var index = Math.floor(Math.random() * 62); //相当于字符串的下标
			ret += s.charAt(index); //检索该下标对应的字符，加入ret中
		}
		return ret;
	}
	//第二个函数  显示随机数
	function showRet() {
		var oTxt = $(".code_content");
		oTxt.text(dateCode(4));
	}
	$(document).ready(function() {
		showRet();
	});
	$(".shuaxin").click(function() {
			showRet();
		})
		//判断验证码的正确性
	$("#auth_code").blur(function() {
		var oTxt = $("#auth_code").val();
		var txt = $(".code_content").text();
		if(oTxt.toLowerCase() != txt.toLowerCase()) {
			$(".tel_hide3").css("display", "block");
			$(".no_border").css("borderColor", "red");
			close(".tel_hide3", ".no_border")
			showRet();
		}
	});

	/*-------------------------------------点击  记住账号事件-------------------------------------*/
	
	$("#re_name").click(function() {
		var txt = $("#tel_email").val();
		$.cookie("user_name", txt, {
			expires: 100,
			path: '/'
		})
	});

	/*---------------------------------点击登录按钮---------------------------------------------*/
	
	$("#load").click(function() {
		var txt = $("#tel_email").val();
		var lmm = $("#load_pwd").val();
		var oTxt = $("#auth_code").val();
		if(txt != "" && lmm != "" && oTxt != "") {
			$(".content").css("display", "none");
			$("#load_box").css("display", "block");
			setTimeout(function() {
				window.location.replace("firstPage.html");
			}, 3000)
		} else {
			alert("请完善内容后再尝试登录！");
		}
	})

})