/*
 *Created by 董静 on 2016/12/15
 */

var cartPage = {
	list: $( "#cart-page .cart-list" ),
	addCount: 0,
	addNumber:0,
	init: function(){
		//创建一个iscroll
		this.myScroll = new IScroll("#cart-page .cart-content",{
            scrollbars:true,//是否显示默认滚动条
            fadeScrollbars:true,//是否渐隐滚动条，关掉可以加速
            shrinkScrollbars:"scale",//滚动超出滚动边界时，是否收缩滚动条 "scale"按比例收缩滚动条（占用CPU资源） "clip"超出部分裁剪，false不收缩
            bounce:true,//是否启用弹力动画效果，关掉可以加速
            probeType: 1,//需要使用 iscroll-probe.js 才能生效 probeType 1：滚动不繁忙时触发 probeType 2:滚动时每隔一定时间触发
            			//probeType 3：每滚动一像素触发一次
        	preventDefault: false//用了iscroll.js插件后就会阻止a标签的点击行为，使用preventDefault: false或者click: true,来解决这个bug
        });

		//先给页面填充数据
		this.addData();
		//绑定数据
		this.bindEvent();
	},
	
	addData: function(){
		$.getJSON( "http://datainfo.duapp.com/shopdata/getCar.php?callback=?", {"userID": "dongjing"}, function(data){
			console.log(data);//获取dongjing购物车的商品信息
			
			var str = "";//用来接收购物车的数据
			for( var i = 0; i < data.length; i++ ){
				
				str += '<li class="cart-item" data-id="'+data[i].goodsID+'"><a class="cart-img" href="#"><img class="pro-img" src="'+data[i].goodsListImg+'"/></a>'+
						'<div class="pro-info">'+
							'<p class="pro-name">'+data[i].goodsName+'</p>'+
							'<p class="pro-price">单价：<em>￥<span class="allPrice">'+data[i].price+'</span></em></p>'+
							'<div class="num-wrap">'+
								'<span class="num-count">数量：</span>'+
								'<div class="num-box">'+
									'<span class="num-bnt minus">-</span>'+
									'<input type="text" name="" id="" value="'+data[i].number+'" class="num-val" />'+
									'<span class="num-bnt plus">+</span>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<a href="javascript:;" class="del-pro num-bnt"><i class="icon iconfont icon-delete"></i></a></li>'
			}
			
			this.list.html(str);
			this.myScroll.refresh();//添加内容后，内容的高度就变了，需要更新滚动条
			this.getSum();//获取总的价格和总的数量
		}.bind( this ) )
		
	},
	
	bindEvent: function(){
		var that = this;
		this.list.on( "click", ".num-bnt", function(){//同时把事件绑定在+-删除按钮上，优化了代码
			var oLi = $(this).parents(".cart-item");
			var id = oLi.attr('data-id');//获取商品的ID
			var oLiNum = oLi.find( ".num-val" );//获取当前li里面的商品数量的input
			var number = parseInt( oLiNum.val() );//商品的数量，转化成数字模式
			//userID = dongjing
			//number
			//console.log(id);//成功获得商品的ID
			if( $(this).hasClass("minus") ){//-用if判断来确定点击的是哪个按钮（用class名来区别不同的按钮）
				number--;
				if( number == 0 ){
					number = 1;
				}
				oLiNum.val(number);
			}else if( $(this).hasClass("plus") ){//+
				number++;
				oLiNum.val(number);
			}else{//删除
				number = 0;
				//删除
				oLi.remove();
				console.log("delete");
				
			}
			that.getSum();//获取总的金额和数量
			//向后台传送数据
			var sendData = { "userID": "dongjing", "goodsID": id, "number": number };
			$.get( "http://datainfo.duapp.com/shopdata/updatecar.php", sendData, function( data ){
				console.log(data);//成功传送数据到后台
			}, "json" )
		} )

	},
	
	getSum: function(){
		//获取数量和金额总和
		//把所有商品循环，数量和金额累加
		
		var allNum = 0;
		var allPrice = 0;
		this.list.find( ".cart-item" ).each( function(index){
			var num = $( this ).find( ".num-val" ).val();
			allNum += num*1;//隐式转换
			//console.log(allNum);成功获取数量
			var price = $( this ).find( ".allPrice" ).html();
			allPrice += price*num*100;
			//console.log(allPrice);
		} )
		$("#pay-addPrice").html( "$"+(allPrice/100)/*.toFixed((2))*/ )//toFixed(number)保留几位小数
		$( "#pro-count" ).html( allNum );
		
	}
	
}
//让页面初始化
cartPage.init();


