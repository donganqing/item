$(function() {
	/*---------------------------------nav 下拉菜单---------------------------------------------*/
	shuaxin()
	$("#subnav #h").mouseenter(function() {
		$("#subnav #hNext").css("display", "block");
		$("#subnav #h #i").css("backgroundPosition", "-230px -24px")
	}).mouseleave(function() {
		$("#subnav #hNext").css("display", "none");
		$("#subnav #h #i").css("backgroundPosition", "-230px -27px")
	})

	/*------------------------------content手机展示 -----------------------------------*/

	/*-------左侧   下面的小图-----------*/

	$(".jqzoom").imagezoom();

	$("#thumblist li a").mouseenter(function() {
		$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
		$(".jqzoom").attr('src', $(this).find("img").attr("mid"));
		$(".jqzoom").attr('rel', $(this).find("img").attr("big"));
	});

	//给小图添加鼠标事件
	//右边的箭头
	$("#content .left_area #i_right").click(function() {
		var right = Math.abs(parseInt($("#content .left_area ul").css("marginLeft")));
		//alert(right);
		if(right <= 95) {
			$("#content .left_area ul").css("marginLeft", "-=95px")
		}

	});
	//左边的箭头
	$("#content .left_area #i_left").click(function() {
		var left = parseInt($("#content .left_area ul").css("marginLeft")); //abs()把得到的负数转化成正数
		//alert(left);
		if(left < 0) {
			$("#content .left_area ul").css("marginLeft", "+=95px")
		}
	});

	/*---右侧手机展示  隐藏的二维码----*/

	$("#content .right_area .buy").mouseenter(function() {
		$("#content .right_area .hide").css("display", "block");
	}).mouseleave(function() {
		$("#content .right_area .hide").css("display", "none");
	});
	/*------右侧手机展示    下拉菜单------*/
	//鼠标事件
	function yanbao(name1, name2, name3) {
		$(name2).mouseenter(function() {
			$(name1).css("display", "block");
			$(name3).css("backgroundPosition", "-93px -100px")
		}).mouseleave(function() {
			$(name1).css("display", "none");
			$(name3).css("backgroundPosition", "-93px -105px")
		})
	}
	yanbao("#content .yb .yb_li ul", "#content .yb .yb_li em", "#content .yb #li1 i")
	yanbao("#content .yb .yb_li2 ul", "#content .yb .yb_li2 em", "#content .yb #li2 i")

	//点击事件
	function yanbao_click(name) {
		$(name).on("click", "li", function() {
			var html = $(this).text();
			$(this).parent().siblings().children().eq(0).find("span").text(html);
			$(this).parent().siblings().children().eq(0).css("border", " 1px solid #e01d20");
			$(this).css("border", " 1px solid #e01d20");
			$(this).parent().siblings().children().eq(0).children("s").addClass("dog");
			$("#content .your_choose .choose3").append(html);
		})
	}
	yanbao_click("#content .yb .yb_li ul");
	yanbao_click("#content .yb .yb_li2 ul");

	//购买数量的点击事件
	//点击-号   商品减少
	$("#content .pro_count .pro_count1").click(function() {
		var html = $("#content .pro_count .txt").val();
		if(html == 1) {
			html = 1;
		} else {
			html--;
		}
		$("#content .pro_count .txt").val(html);
	});
	//点击+商品增加
	$("#content .pro_count .pro_count2").click(function() {
		var html = $("#content .pro_count .txt").val();
		html++;
		$("#content .pro_count .txt").val(html);
	});

	//点击加入购物车   出现的弹框
	$("#content .cart_success dt .error").click(function() {
		$("#content .cart_success dl").hide();
	});
	$("#content .pro_cart .clearing").click(function() {
		$("#content .cart_success dl").show();
	});
	/*------------------------------------用户评价    产品参数  等等-----------------------------------*/
	//手机详情  下面的图片
	$.getJSON("js/details.json", function(data) {
		var html;
		for(var i = 0; i < data.length; i++) {
			html = "";
			html += '<p><img src="' + data[i].src + '"/></p>'
			$("#details .pro_details_bottom").append(html);
		}
	});
	//用户评价   产品参数	
	function show(name, element) {
		$(name).click(function() {
			$(element).show()
			$(element).siblings().hide();
			$(this).addClass("first1").siblings().removeClass("first1");
		})
	}
	show(".details_top .first1", "#details .pro_details_area", "#details .pro_details_area")
	show(".details_top .first2", "#details .user_pj", "#details .user_pj")
	show(".details_top .first3", "#details .pro_normls", "#details .pro_normls")
	show(".details_top .first4", "#details .pro_list", "#details .pro_list")
	show(".details_top .first5", "#details .pro_after_service", "#details .pro_after_service")

	show(".top_title .first1", "#details .qb", "#details .qb")
	show(".top_title .first2", "#details .cj", "#details .cj")
	show(".top_title .first3", "#details .sp", "#details .sp")
	show(".top_title .first4", "#details .zf", "#details .zf")
	show(".top_title .first5", "#details .ps", "#details .ps")
	show(".top_title .first6", "#details .sh", "#details .sh")
		//随滚动条滚动的标题
	$(window).scroll(function() {
		var top = $("#details .details_top");
		var st = document.documentElement.scrollTop || document.body.scrollTop;
		if(st >= 1000) {
			top.addClass("top");
			$("#details .details_top ul .first6 a").css("display", "inline-block");
		}
		if(st <= 999) {
			top.removeClass("top");
			$("#details .details_top ul .first6 a").css("display", "none");
		}
	})
	/*----------------------------点击加入购物车 存cookie- 判断等等---------------------------------*/
		//点击加入购物车
		$(".add_my_cart").click(function(){saveCookie();});
		//点击下面的加入购物车
		$("#cart_big").click(function(){saveCookie()})
			//封装函数存cookie
		function saveCookie(){
			var imgSrc = document.getElementById("cookie_img").src;
			var name = $("#cookie_name").text();
			var color = $("#cookie_color").text();
			var price = $("#cookie_price").text();
			var count = $("#det_count").val();
			//把信息进行拼字符串
			var strValue = imgSrc + "&&" + name + "&&" + color + "&&" + price + "&&" + count; /*+ "&&" +addcount*/
			//从cookie中得到商品信息
			var strOld = $.cookie("cookieshopping");
			if(strOld){
				//strValue = strOld+"||"+strValue;
				var isExist = false;
				var arrProduct = strOld.split("||");
				for(var i=0;i<arrProduct.length;i++){
					var arrItem=arrProduct[i].split("&&");
					//判断一下 每个商品的的名字是否一样 如果一样的话 只增加数量
					if(arrItem[1]==name){
						arrItem[4] = parseInt(arrItem[4])+1;
						var newProduct=arrItem.join("&&");
						arrProduct[i]=newProduct;
						strValue = arrProduct.join("||");
						break;
					}
				}
			}else{
				strValue = strValue;
			}
			//存cookie 有效期为100天
			$.cookie("cookieshopping",strValue,{expires: 100,path:"/"});
		}
		
		/*-------------------------------------弹出框---------------------------------------*/
	function shuaxin(){
		var strShopping = $.cookie("cookieshopping");
		if(strShopping){
			var arrProduct = strShopping.split("||");
			var sum = 0;
			var addPrice = 0;
			for(var i=0;i<arrProduct.length;i++){
				var html = "";
				//分割cookie 分别得到想要的信息
				var arrShopping = arrProduct[i].split("&&");
				var imgSrc = arrShopping[0];
				var name = arrShopping[1];
				var color = arrShopping[2];
				var price = arrShopping[3];
				var count = arrShopping[4];
				var addcount = count*parseInt(price);//单个商品总价
				addPrice = addPrice + addcount//所有商品总的价钱
				sum = sum +parseInt(count) ;
				html += '购物车中共'
				html += '<b id="cart_total">'+sum+'</b> 件商品，金额合计'
				html += '<b id="cart_price">'+addPrice+'</b>(元)'
				$(".total").html(html);
			}
		}
	}
		

})