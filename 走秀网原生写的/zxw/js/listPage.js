/*
 *
 * Created by 董静 2016/12/15
 * */
//滚动条
/*var myScroll = new IScroll( ".content",{
	scrollbars: true,//是否显示默认滚动条
			fadeScrollbars: true,//是否渐隐滚动条，关掉可以加速
			shrinkScrollbars: "scale",//滚动超出滚动边界时，是否收缩滚动条。‘clip’：裁剪超出的滚动条
								      //‘scale’: 按比例的收缩滚动条（占用 CPU 资源）false: 不收缩，
			bounce: true //是否启用弹力动画效果，关掉可以加速
} );*/

//json获取数据
/*$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",function (data) {
	//获取json里面商品的信息
	console.log(data);
	var html="";
	for(var i = 0; i < data.length; i++){
		html+='<li class="pro-item">' +
                        '<a href="###" class="pic"><img src="'+data[i].goodsListImg+'"></a>' +
                        '<p class="pro-name">'+data[i].goodsName+'</p>' +
                        '<p class="price"><em>￥'+data[i].price+'</em> <del>￥888</del></p>' +
                    '</li>'
	}
	
	$('.pro-list').html($('.pro-list').html()+html);
	
	
} )*/

//把列表也放在对象里，进行模块化，防止变量污染

var listPage = {
	myScroll: null,
    list: $("#page-list .pro-list"),
    classList: $("#page-list .sub-list"),
    downText: $("#downLoad"),
    page: 0,
    canReload: false,
    classID: undefined,
    init: function () {

        //创建一个iscroll
        this.myScroll = new IScroll("#page-list .content",{
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
        //给页面元素绑定事件
        this.bindEvent()
		//给页面添加列表分类
		this.getClass();
    },
    
    //获取商品列表的分类
    getClass: function(){
    	$.get( "http://datainfo.duapp.com/shopdata/getclass.php", function(data){
    		//console.log( data );//获取data对象
    		var str = "";//分类的内容
    		for(var i = 0; i < data.length; i++){
    			str += '<li data-id = "'+ data[i].classID +'"><i class="icon iconfont">'+data[i].className+'</i></li>'
    			//console.log(data[i].className);
    		}
    		this.classList.html( str );
    	}.bind( this ), "json")

    },
	
	//获取页面数据
	addData:function ( reload ) {
        //console.log(this.page);
        //如果需要刷新，让页面的page=0
        if(reload){
        	this.page = 0;
        }
        
        //在数据还没加载在时，现实加载的动图
        $( "#loading" ).show();
        
        //通过jsonp添加数据
        var sendData = {"classID":this.classID,"pageCode":this.page++,"linenumber":4};
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",sendData,function (data) {
            console.log(data);
            var  str = "";
            for(var i=0;i<data.length;i++){
                str+='<li class="pro-item">' +
                        '<a href="detailPage.html?goodsID='+ data[i].goodsID +'" class="pic"><img src="'+data[i].goodsListImg+'"></a>' +
                        '<p class="pro-name">'+data[i].goodsName+'</p>' +
                        '<p class="price"><em>￥'+data[i].price+'</em> <del>￥999</del></p>' +
                    '</li>'
            }
            
            if(reload){
            	//刷新的时候直接用当前最新的数据，覆盖之前的内容
            	this.list.html(str );
            }else{
            	//加载的时候，需要跟之前的内容拼接
            	this.list.html(this.list.html()+str)
            }
            //当添加完数据以后，内容的高度就改变了，需要更新滚动条
            this.myScroll.refresh()//更新滚动条
            //console.log("加载完成")
            
            //在数据加载完成后加载动图隐藏
			$( "#loading" ).hide();
			
        }.bind(this));
    },
	bindEvent: function(){
		//给页面元素绑定事件
		
		var that = this;
		this.myScroll.on( "scroll", function(){
			if(this.y > 50){
				console.log("刷新！");
				that.downText.html("松开刷新");
				that.canReload = true;
			}
		} );
		
			//console.log( this.y );

		this.myScroll.on( "scrollEnd", function(){
			//当滚动结束时判断是否到底部
			if( this.y - this.maxScrollY < 50 ){
				//console.log("加载更多");
				listPage.addData();
			}
			if( that.canReload ){
				//如果需要刷新，就调用刷新的方法
				listPage.addData( true );
				
				//刷新以后，需要把下拉的提示重置一次
				that.downText.html( "下拉刷新" );
				that.canReload = false;
			}

			//console.log( that.canReload );
		});
		
		//切换商品分类
		this.classList.on( "click","li",function(){
			//console.log($( this ).attr( "data-id" ));//点击分类的id
			that.classID = $( this ).attr( "data-id" );
			that.addData( true );
			$(this).addClass('active');
			$(this).siblings().removeClass("active");
			
		} )
		
	}
};

//页面初始化
listPage.init();