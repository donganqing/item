
$(function(){

	/*---------------------取cookie   拼字符串------------------------------------------------*/
		
	initShopping();
	function initShopping(){
		var strShopping = $.cookie("cookieshopping");//取cookie
		if(strShopping){
			var arrProduct = strShopping.split("||");
			var html = "";
			for(var i=0;i<arrProduct.length;i++){
				var arrShopping = arrProduct[i].split("&&");//分割cookie 分别得到想要的信息
				var imgSrc = arrShopping[0];
				var name = arrShopping[1];
				var color = arrShopping[2];
				var price = arrShopping[3];
				var count = parseInt(arrShopping[4]) ;
				var addcount = count*parseInt(price);
				//以拼串的形式，把cookie加入购物车；
				html += '<div class="cart_detail">'
				html += '<table><tr><td class="th1 td1"><input type="checkbox" name="" class="caozuo" value="" /></td>'
				html += '<td class="td2"><div class="pro_area">'
				html += '<p class="p_img"><a href="javascript:;" title="'+name+'"><img src="'+imgSrc+'"/></a></p>'
				html += '<p class="p_name"><a href="#" title="'+name+'">'+name+'</a><br/><span>'+color+'</span></p>'
				html += '</div></td>'
				html += '<td class="th3 td3">￥<span id="a_price">'+price+'</span>.00</td>'
				html += '<td class="th4 td4"><div class="add">'
				html += '<input type="text" name="addV" class="addCount" id="addCount" value="'+count+'" />'
				html += '<p class="kua"><a class="jia j" id="jia_s" href="javascript:;" title="加"></a><a id="jian_s" class="jian j" href="javascript:;" title="减"></a></p>'
				html += '</div></td>'
				html += '<td class="th5 td5">￥<b class="priceBigg" id="priceBig">'+addcount+'</b>.00</td>'
				html += '<td class="th6 td6"><a class="shan"  href="javascript:;" title="删除"><i class="iconfont">&#xe63d;</i></a></td>'
				html += '</tr></table></div>'
				$(".cart_list").html(html);	
			}
		}
		sumPrice()	
	}
		/*-----------------------------------计算总价--------------------------------------*/
		function sumPrice(){
			var sum = 0;
			var strShopping = $.cookie("cookieshopping");
			var arrProducts = strShopping.split("||");
			for(var i = 0; i < arrProducts.length; i++) {
				var arrItem = arrProducts[i].split("&&");
				var price = parseInt(arrItem[3]) ;
				var count = parseInt(arrItem[4]) ;
				sum = price * count + sum;
			}
			$("#addPrice").text(sum);
			$("#addMoney").text(sum);
		}
		
		/*------------------------------点击删除按钮   删除对应的商品-------------------------------*/
		
		$(".shan").on("click",function(){
			var tab = $(this).parents(".cart_detail")
			var tr = $(this).parents("tr");
			var mz = tr.children(".td2").children().children(".p_name").children("a").text();
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
			sumPrice()	
		})
		
		/*-----------------------------------加减按钮----------------------------------------*/
		
		//点击加按钮  数量跟着变
		$(".jia").click(function(){
			var tr = $(this).parents("tr");
			var count = tr.children().eq(3).children().children().val();
			++count;
			tr.children().eq(3).children().children().val(count);
			var price = tr.children().eq(2).children().text();
			var addprice = count*parseInt(price);
			tr.children().eq(4).children().text(addprice);
			//把当前的数量存入对应的cookie中
			var mz = tr.children(".td2").children().children(".p_name").children("a").text();
			var strShopping = $.cookie("cookieshopping");
			var arrProduct = strShopping.split("||");
			var strValue;
			for(var i = 0; i < arrProduct.length; i++) {
				var arrItem = arrProduct[i].split("&&");
				if(arrItem[1] == mz){
					arrItem[4] = count;
					 var newProduct=arrItem.join("&&");
						arrProduct[i]=newProduct;
						strValue = arrProduct.join("||");
				}
			}
			$.cookie("cookieshopping",strValue,{expires: 100,path:"/"});
			sumPrice()	
		})
		
		//点击减按钮  数量跟这变
		$(".jian").click(function(){
			var tr = $(this).parents("tr");
			var count = tr.children().eq(3).children().children().val();
			--count;
			if(count <= 1){
				count = 1;
			}
			tr.children().eq(3).children().children().val(count);
			var price = tr.children().eq(2).children().text();
			var addprice = count*parseInt(price);
			tr.children().eq(4).children().text(addprice);
			//把当前的数量存入对应的cookie中
			var mz = tr.children(".td2").children().children(".p_name").children("a").text();
			var strShopping = $.cookie("cookieshopping");
			var arrProduct = strShopping.split("||");
			var strValue;
			for(var i = 0; i < arrProduct.length; i++) {
				var arrItem = arrProduct[i].split("&&");
				if(arrItem[1] == mz){
					arrItem[4] = count;
					 var newProduct=arrItem.join("&&");
						arrProduct[i]=newProduct;
						strValue = arrProduct.join("||");
					 console.log(strValue);
				}
			}
			$.cookie("cookieshopping",strValue,{expires: 100,path:"/"});
			sumPrice()	
		})
		
		/*-------------------------点击全选按钮 选中所有的按钮    点击删除  删除所有商品-------------------------*/
		
		//点击全选按钮
		$("#allInp").on("click",function(){
			var delList = $(".caozuo");
			//console.log(delList.length);
			for(var i = 0; i < delList.length; i++){//遍历所有的input标签 给他添加事件
				delList[i].checked = this.checked;
			}
			$("#caoz")[0].checked = this.checked;
		});
		//点击删除全部商品  删除所有的商品
		$(".all_delete").click(function(){
			var tab = $(".cart_list")
			$.removeCookie('cookieshopping',{path:"/"});
			tab.remove();
		});
		
	/*-------------------------------------点击去结算    进入结算页面---------------------------------*/
	
	$(".go_on .a2").click(function(){
		$(".cart_det, .delete, .go_on").css("display","none");
		$(".go_money").css("display","block");
		$(".my_cart").css("backgroundPosition","0 -44px");
	});
	
})
