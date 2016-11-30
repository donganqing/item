
	/*---------------------------------nav 下拉菜单---------------------------------------------*/

	$("#subnav #h").mouseenter(function() {
		$("#subnav #hNext").css("display", "block");
		$("#subnav #h #i").css("backgroundPosition", "-230px -24px")
	}).mouseleave(function() {
		$("#subnav #hNext").css("display", "none");
		$("#subnav #h #i").css("backgroundPosition", "-230px -27px")
	})

	/*-------------------------------content 手机展示 json获取图片及其信息-------------------------------*/

	$.getJSON("js/listPage.json", function(data) {
		var html;
		for(var i = 0; i < data.length; i++) {
			var html = "";
			html += '<li>'
			html += '<p class="p_top"><img src="' + data[i].srcOne + '"/></p>'
			html += '<p class="p_img"><a href="#" title="' + data[i].name + '">'
			html += '<img id="pImg" src="' + data[i].srcTwo + '" alt="' + data[i].name + '" />'
			html += '</a></p>'
			html += '<p class="p_name"><a href="#" title="' + data[i].name + '">' + data[i].name + '<span class="hong">' + data[i].condition + '</span>'
			html += '</a></p>'
			html += '<p class="p_price">￥<b>' + data[i].price + '</b></p>'
			html += '<div class="p_button">'
			html += '<table>'
			html += '<tr><td class="td" ><a class="aaa" href="javascript:;">' + data[i].xg + '</a></td><td class="er"><label>' + data[i].pj + '</label></td></tr>'
			html += '</table>'
			html += '</div>'
			html += '</li>'
			$("#content #phone_show ul").append(html);
		}
		//点击存cookie如果有cookie则更改数量
		$(".aaa").click(function(){
			var oLi = $(this).parents("li");//获取该商品的li;
			var imgSrc = oLi.children().eq(1).children().children().attr("src");//获取图片路径
			var name = oLi.children().eq(2).children().text();//获取商品名字
			var color = "";
			var count = 1;
			var price = oLi.children().eq(3).children().text();//获得单价
			var strValue = imgSrc + "&&" + name + "&&" + color + "&&" + price + "&&" + count; 
			var strOld = $.cookie("cookieshopping");//从cookie中得到商品信息
			if(strOld){
				var isExist = false;
				var arrProduct = strOld.split("||");
				for(var i = 0; i < arrProduct.length; i++){
					var arrItem=arrProduct[i].split("&&");
					//判断一下 每个商品的的名字是否一样 如果一样的话 只增加数量
					if(arrItem[1]==name){
						isExist = true;
						arrItem[4] = parseInt(arrItem[4])+1;
						var newProduct=arrItem.join("&&");
						arrProduct[i]=newProduct;
						strValue = arrProduct.join("||");
						break;
					}
				}
				if(isExist){
					
				}else{
					strValue = strOld + "||" + strValue;
				}
			}
			$.cookie("cookieshopping",strValue,{expires: 100,path:"/"});//存cookie 有效期为100天
			 initShopping();
		})
	});	
	//鼠标事件  li的边框变红色
	$("#content #phone_show >ul").on("mouseenter", "li", function() {
		$(this).css("border", "1px solid #e01d20");
	}).on("mouseleave", "li", function() {
		$(this).css("border", "1px solid #dedede");
	});
	
