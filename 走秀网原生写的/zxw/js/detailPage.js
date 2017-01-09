/*
 *Creat by 董静  on   2016/12/17.
 * 
 */


var detailPage = {
	goodsID: fnBase.request("goodsID"),
	
    init: function () {
        //先给页面填充数据
        this.addData();
		this.bindEvent();
        //商品id
    },
    
	//获取页面数据
	addData:function () {
		//在数据加载前加载动图显示
			$( "#loading" ).show();
       	$.getJSON( "http://datainfo.duapp.com/shopdata/getGoods.php?callback=?", { goodsID:this.goodsID },function( data ){
       		console.log(data[0]);
       		//data[0].imgsUrl 轮播图（字符串）
       		//goodsName 商品名称
       		//price 商品价格
       		//buynumber 商品购买的总数量
       		var picList = JSON.parse( data[0].imgsUrl );
       		//填充轮播图
       		var strPic = "";
       		for( var i = 0; i < picList.length; i++ ){
				strPic +='<div class="swiper-slide"><div class="swiper-zoom-container"><img src="'+ picList[ i ] +'"/></div></div>'
       			
       		}
       		//
       		$( "#page-detail .swiper-wrapper" ).html( strPic );
       		//轮播图
			var  mySwiper = new Swiper ('.swiper-container', {
			    //loop: true,	
			    // 如果需要分页器
			    pagination: '.swiper-pagination',//使用自定义的分页按钮
			    //slidesPerView: 3,
			    zoom : true,
				zoomMax :3,
			     
			   });
			  //商品信息
			  $( "#good-name" ).html(
			  	'<li>'+ data[0].goodsName +'</li>' +
				'<li><em>￥'+ data[0].price +'</em><del>159.00</del></li>' +
				'<li>购买人数：<span>'+ data[0].buynumber +'</span></li>'
			  )
       	} );
       	//在数据加载完成后加载动图隐藏
		$( "#loading" ).hide();
   },
   
   //点击添加购物车事件
   bindEvent: function(){
   		$( "#page-detail .add-cart" ).on( "click", function(){
   			//获取用户ID
   			var sendData = { "userID": "dongjing", "goodsID": this.goodsID, "number": 1 };
   			$.get( "http://datainfo.duapp.com/shopdata/updatecar.php", sendData, function(data){
   				console.log(data);
   			},"json" )
   			
   		}.bind( this ) );
   	
   }
	
};

//页面初始化
detailPage.init();

