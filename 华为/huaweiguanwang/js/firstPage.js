$(function() {

	/*-------------------------------------------banner图片轮播------------------------------------------*/

	var $img = $("#banner #pic a").length; //获得所有的a的数量  即封装函数startPlan中的count
	var $pic = $("#banner #pic a"); //获取所有的a
	var index = 0;
	var timer;
	var isCompelet = false;
	startPlan("#banner #count ul li", "count1", $img, $pic);
	event("#banner");
	myImages("#banner #count ul li", "count1", $img, $pic);
	//图片自动播放
	function startPlan(name, attr, count, element) {
		timer = setInterval(function() {
			if(!isCompelet) {
				index++;
				if(index == count) {
					index = 0;
				}
				element.eq(index).children().fadeIn(500).parent().siblings().children().fadeOut(500);
				$(name).eq(index).addClass(attr).siblings().removeClass(attr);
			}
		}, 3000)
	}
	//数字跟着图片动
	function myImages(name, attr, count, element) { //name:数字所对应的元素的集合。attr:第一个数字背景色对应的class="li"的style样式
		for(var i = 0; i < count; i++) { //count:对应的图片的数量.element:图片对应的所有的img集合
			$(name).eq(i).index = i
			$(name).eq(i).mouseenter(function() {
				var a = $(this).index();
				index = a;
				startPlan();
				clearInterval(timer);
				element.eq(a).children().fadeIn(500).parent().siblings().children().fadeOut(500);
				$(this).addClass(attr).siblings().removeClass(attr);
			});
		}
	}
	//鼠标事件
	function event(name) {
		$(name).mouseenter(function() {
			isCompelet = true
		});
		$(name).mouseleave(function() {
			isCompelet = false
		});
	}

	/*-----------------------------------channel 左侧的9个小图标------------------------------------*/

	//json获取
	$.getJSON("js/firstPage.json", function(data) {
			var html;
			for(var i = 0; i < 6; i++) {
				html = "";
				html += '<dl>';
				html += '<dd><img src="' + data[i].src + '"></dd>';
				html += '<dt>' + data[i].title + '</dt>';
				html += '</dl>';
				$("#subChannel .picLeft a").append(html);
			}
		})
		//鼠标事件
	$("#subChannel .pic .picLeft a").on("mouseenter", "dl", function() {
		$(this).after().css("color", "#333333");
	}).on("mouseleave", "dl", function() {
		$(this).css("color", "#8C8C8C");
	});

	/*-----------------------------------channel 右侧的3张图片------------------------------------*/

	//json获取
	$.getJSON("js/firstPage.json", function(data) {
			var html;
			for(var i = 6; i < 9; i++) {
				html = "";
				html += '<li>'
				html += '<a href="#"><img src="' + data[i].src + '"/></a>'
				html += '</li>'
				$("#subChannel .pic .picRight").append(html);
			}
		})
		//鼠标事件
	$("#subChannel .picRight").on("mouseenter", "li", function() {
			$(this).css("boxShadow", "0 20px 50px #abc");
		}).on("mouseleave", "li", function() {
			$(this).css("boxShadow", "0 0 0 #fff");
		})
		//json获取  热销推荐下面的手机展示	
	$(function() {
		$.getJSON("js/firstPage.json", function(data) {
			var html;
			for(var i = 9; i < 14; i++) {
				html = "";
				html += '<li>'
				html += '<p><img src="' + data[i].srcOne + '" ></p>'
				html += '<img id="img" src="' + data[i].srcTwo + '"/>'
				html += '<h3>' + data[i].name + '</h3>'
				html += '<span>' + data[i].condition + '</span>'
				html += '<em>' + data[i].price + '</em>'
				html += '</li>'
				$("#subChannel .goodsBox ul a").append(html);
			}
		});
	});
	/*----热销推荐下面的手机展示  动态效果---------*/
	$("#subChannel .cell .goodsBox").css("border-right", "1px solid #EEEEEE");
	$("#subChannel .cell .goodsBox ul a").on("mouseenter", "li", function() {
		$(this).find("#img").stop().animate({
			"width": "166px",
			"height": "166px",
			"margin-left": "-80px"
		}, "fast");
	}).on("mouseleave", "li", function() {
		$(this).find("#img").stop().animate({
			"width": "146px",
			"height": "146px",
			"margin-left": "-70px"
		}, "fast");
	})

	/*-------------------------------热销推荐下面的小轮播图------------------------------------------*/

	var $img1 = $("#subChannel #m_banner a").length;
	var $img2 = $("#subChannel #m_banner a");
	//console.log($img1);
	var indexa = 0;
	var timer1;
	var Compelet = false;
	startPlan1("#subChannel #count ul li", "count11", $img1, $img2);
	event1("#subChannel");
	myImages1("#subChannel #count ul li", "count11", $img1, $img2);
	
	function startPlan1(name, attr, count, element) {
		timer1 = setInterval(function() {
			if(!Compelet) {
				indexa++;
				if(indexa == count) {
					indexa = 0;
				}
				element.eq(indexa).children().fadeIn(500).parent().siblings().children().fadeOut(500);
				$(name).eq(indexa).addClass(attr).siblings().removeClass(attr);
			}
		}, 3000)
	}
	//数字跟着图片动
	function myImages1(name, attr, count, element) { //name:数字所对应的元素的集合。attr:第一个数字背景色对应的class="li"的style样式
		for(var i = 0; i < count; i++) { //count:对应的图片的数量.element:图片对应的所有的img集合
			$(name).eq(i).index = i
			$(name).eq(i).mouseenter(function() {
				var a = $(this).index();
				indexa = a;
				clearInterval(timer1);
				startPlan1();
				element.eq(a).children().fadeIn(500).parent().siblings().children().fadeOut(500);
				$(this).addClass(attr).siblings().removeClass(attr);
			});
		}
	}
	//鼠标事件
	function event1(name) {
		$(name).mouseenter(function() {
			Compelet = true
		});
		$(name).mouseleave(function() {
			Compelet = false
		});
	}

	/*---------------------------------主要内容---------------------------------------------*/
	//json获得数据  精品手机
	show("#main_content #phone_list ul", 14, 22);
	//json获得数据  平板电脑/笔记本
	show("#main_content #com_list ul", 22, 30);
	//json获得数据  智能穿戴
	show("#main_content #wear_list ul", 30, 38);
	//json获得数据 智能家居
	show("#main_content #home_list ul", 38, 46);
	//json加载数据  热销配件
	show("#main_content #rp_list ul", 46, 54);
	//json加载数据   品牌配件
	show("#main_content #brand_list ul", 54, 62);

	//封装函数获得json数据
	function show(name, count1, count2) {
		$.getJSON("js/firstPage.json", function(data) {
			var html;
			for(var i = count1; i < count2; i++) {
				html = "";
				html += '<li id="list_item">'
				html += '<a href="#">'
				html += '<p><img src="' + data[i].srcOne + '" /></p>'
				html += '<img id="img1" src="' + data[i].srcTwo + '"/>'
				html += '<h3>' + data[i].name + '</h3>'
				html += '<span>' + data[i].condition + '</span>'
				html += '<em>' + data[i].price + '</em>'
				html += '</a>'
				html += '</li>'
				$(name).append(html);
			}
		});
	}
	//主要内容的动画效果//css3已代替
	/*$("#main_content #show > div >ul").on("mouseenter", "li", function() {
		$(this).css("boxShadow", "1px 1px 20px 5px #999");
	}).on("mouseleave", "li", function() {
		$(this).css("boxShadow", "0 0 0 #fff");
	});*/
	
})