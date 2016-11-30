
	
	/*-------------------------------------head里面的下拉菜单-----------------------------------------------*/

	//左边的下拉菜单
	$(".headLeft ul li").eq(2).mouseenter(function() {
		$(this).find("p").css("display", "block");
		$(this).find("p").eq(0).css("border-top","1px solid #fff");
		$(this).css("background", "#fff");
		$(this).find("i").css("backgroundPosition", "0px 0px");
	}).mouseleave(function() {
		$(this).find("p").css("display", "none");
		$(this).css("background", "#fafafa")
		$(this).find("i").css("backgroundPosition", "-34px 0px");
	});

	//右边的下来菜单
	$(".headRight ul li").eq(4).mouseenter(function() {
		$(this).find("p").css("display", "block");
		$(this).css("background", "#FFF");
		$(this).find("i").css("backgroundPosition", "0px 0px");
	}).mouseleave(function() {
		$(this).find("p").css("display", "none");
		$(this).css("background", "#fafafa")
		$(this).find("i").css("backgroundPosition", "-34px 0px");
	});

	/*------------------------------------------------top logo-------------------------------------------*/

	//search里面的内容
	//提交按钮
	$("#submit").mouseenter(function() {
		$(this).css("background", "#6d6d6d");
		$(this).next().css("backgroundPosition", "0px 0px");
	}).mouseleave(function() {
		$(this).css("background", "#fff");
		$(this).next().css("backgroundPosition", "");
	});
	//搜索框
	$("#bnt").focus(function() {
		$(this).next().next().next().css("display", "none");
	}).blur(function() {
		$(this).next().next().next().css("display", "block");
	});

	//我的商城
	//获得焦点
	$(".tool .imall #a").mouseenter(function() {
		$(this).next().next().next().css("display", "block");
		$(this).next().css("backgroundPosition", "-234px 0px");
	});
	//失去焦点
	$(".tool .imall").mouseleave(function() {
		$(this).children().eq(3).css("display", "none");
		$(this).children().eq(1).css("backgroundPosition", "-234px -2px");
	});
	//我的购物车
	initShopping();
	function initShopping(){
	var strShopping = $.cookie("cookieshopping");//先取出cookie 判断有没有商品
	if(strShopping){
		var arrProduct = strShopping.split("||");
		var html = "";
		var txt = "";
		var addPrice = 0;
		var sum = 0;
		for(var i=0;i<arrProduct.length;i++){
			//分割cookie 分别得到想要的信息
			var arrShopping = arrProduct[i].split("&&");
			var imgSrc = arrShopping[0];
			var name = arrShopping[1];
			var color = arrShopping[2];
			var price = arrShopping[3];
			var count = arrShopping[4];
			var addcount = count*parseInt(price);//单个商品总价
			addPrice = addPrice + addcount//所有商品总的价钱
			sum = sum +parseInt(count);//总的个数
			html += '<div class="have_goods">'
			html += '<ul><li><div><a href="javascript:;"><img src="'+imgSrc+'"/></a></div>'
			html += '<div class="letter"><a href="#" title="'+name+'">'+name+'</a><br/><span>'+price+'</span><b> × '+count+'</b><em>配</em></div>'
			html += '<div><strong class="iconfont icon" title="删除">&#xe63d;</strong></div>'
			html += '</li></ul></div>'
			$("#cart_goods").html(html);
		}
			$(".top_count").text(sum);
			txt += '<div class="end">'
			txt += '<span>共<b>'+sum+'</b>件商品，金额合计<b>￥'+addPrice+'.00</b><a href="cartPage.html" title="去结算">去结算</a></span></div>'
			$("#cart_goods").append(txt);
			
			$("#maincart #myCart").mouseenter(function(){
				$(this).siblings("i").css("backgroundPosition", "-234px 0px");
				$("#cart_goods").css("display","block");
				$("#maincart .no_line_first").css("display","block");
				$("#maincart .center_line").css("display","block");
			})
			$("#maincart").mouseleave(function(){
				$(this).children().eq(1).css("backgroundPosition", "-234px -2px");
				$("#cart_goods").css("display","none");
				$("#maincart .no_line_first").css("display","none");
				$("#maincart .center_line").css("display","none");
			})
	}else{
		$("#maincart #myCart").mouseenter(function(){
			$(this).next().css("backgroundPosition", "-234px 0px");
			$("#cart_empty").css("display","block");
			$("#maincart .no_line_first").css("display","block");
			$("#maincart .center_line").css("display","block");
		})
		$("#maincart").mouseleave(function(){
			$(this).children().eq(1).css("backgroundPosition", "-234px -2px");
			$("#cart_empty").css("display","none");
			$("#maincart .no_line_first").css("display","none");
			$("#maincart .center_line").css("display","none");
			})
		}
	}
	
	/*---------------------------------点击删除 删除对应的商品-----------------------------------*/  
	
	$(".icon").on("click",function(){
			var tab = $(this).parents(".have_goods")
			var tr = $(this).parents("li");
			var mz = tr.children(".letter").children("a").text();
			var strShopping = $.cookie("cookieshopping");
			var arrProducts = strShopping.split("||");
			for(var i = 0; i < arrProducts.length; i++) {
				var arrItem = arrProducts[i].split("&&");
				if(arrItem[1] == mz){
					arrProducts.splice(i,1);
					break;
				}
			}
			var newStr=arrProducts.join("||");
			$.cookie("cookieshopping",newStr,{expires: 100,path:"/"});
			tab.remove();
		})
	
	/*---------------------------------------头部  工具栏    二维码-----------------------------------------*/

	//扫码关注我们
	$("#qrcode #dian #dian1").mouseenter(function() {
		$("#qrcode #li1").fadeToggle(1000);
		$("#qrcode #li2").css("display", "none");
	});
	//周三专场
	$("#qrcode #dian #dian1").mouseleave(function() {
		$("#qrcode #li2").fadeToggle(1000);
		$("#qrcode #li1").css("display", "none");
	});

	/*------------------------------------------nav 隐藏菜单--------------------------------------*/

	$("#hNext ol li").mouseenter(function() {
		$(this).find("div").show().parent().siblings().find("div").hide();
	}).mouseleave(function() {
		$(this).find("div").hide();
	})

	/*--------------------------------------slogan  尾部口号部分-------------------------------*/

	//封装函数 来改变slogan里面的字体颜色   图片颜色
	function slogan(name, count1, count2) {
		$(name).mouseenter(function() {
			$(this).css("color", "#C81118").children("i").css("backgroundPosition", count1);
		}).mouseleave(function() {
			$(this).css("color", "#666").children("i").css("backgroundPosition", count2);
		});
	}
	//使用封装的函数
	//左一图
	slogan("#subslogan ul .s1", "0 0", "-216px 0");
	//左二图
	slogan("#subslogan ul .s2", "-54px 0", "-270px 0");
	//左三图
	slogan("#subslogan ul .s3", "-108px 0", "-324px 0");
	//左四图
	slogan("#subslogan ul .s4", "-162px 0", "-378px 0");

	/*-------------------------------------------最右侧的联系客服 --------------------------------*/

	//鼠标移上  透明度变化
	$("#contact").on("mouseenter", "a,p", function() {
		$(this).css("opacity", ".6");
	})

	$("#contact").on("mouseleave", "a,p", function() {
			$(this).css("opacity", ".3");
		})
	//滚动条 事件	最上面的回到顶部
	$(window).scroll(function() {
		var st = document.documentElement.scrollTop || document.body.scrollTop;
		if(st > 0) {
			$("#contact .to_top").fadeIn(4000);
		}
		if(st <= 0) {
			$("#contact .to_top").fadeOut(4000);
		}
	});

	/*------------------------------------最右侧联系客服 点击意见  里面的div--------------------------------*/

	//input事件
	$("#survery_box #lable input").focus(function() {
		$(this).val("").css("border", "1px solid #000")
	});
	$("#survery_box textarea").focus(function() {
		$(this).text("");
	});
	//点击意见反馈 出现div
	$("#contact .opinion").click(function() {
		$("#survery_box").css("display", "block");
		$("#dbox").css("display", "block");
	});
	//点击X号。div 消失
	$("#survery_box .h p").click(function() {
		$("#survery_box").css("display", "none");
		$("#dbox").css("display", "none");
	});
	
	/*-------------------------------------头部  判断一下 要是有用户----------------------------------*/
	
	var username = $.cookie("user_name");
	if(username){
		$(".user_cookie").css("display","block");
		$(".user_cookie em").text(username);
	}
	

