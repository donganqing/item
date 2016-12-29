/*
* Created by 董静 on 2016/12/17.
 **/
var enrollPage = {
	init:function () {
		//给页面元素绑定事件
		this.bindEvent();
		
    },
    bindEvent: function(){
    	$( "#enroll-page .sure-sure" ).on( "click",function(){
    		var userName = $( "#enroll-name" ).val();
    		var userPwd = $( "#enroll-pwd" ).val();
    		var surePwd = $( "#sure-pwd" ).val();
    		if( userName==""||userPwd==""||surePwd=="" ){
    			$( ".complete" ).show();
    			hide( $( ".complete" ) );
    		}else{
    			
    		}
    		var sendData = { "status": "register", "userID": userName, "password": userPwd };
    		$.get( "http://datainfo.duapp.com/shopdata/userinfo.php?callback=?", sendData, function(data){
    			var Data = parseInt(data);
    			//console.log(typeof data);
    			
    			if( data==1 ){
    				//console.log("用户注册成功！")//成功注册
    				$( ".enroll-success" ).show();
    				hide( $( ".enroll-success" ) );
    			}
    			if( data == 0 ){
    				console.log("该用户已被注册！")//用户名已注册
    				$( ".enroll-error" ).show();
    				hide( $( ".enroll-error" ) );
    			}
    		} )
    		
    	} );
    	
    	//判断两次输入的密码是否一致
    	$("#sure-pwd").on( "blur", function(){
    		var userPwd = $( "#enroll-pwd" ).val();
    		var surePwd = $( "#sure-pwd" ).val();
    		if( userPwd == surePwd ){
    			//
    		}else{
    			$( "#sure-pwd" ).val("");
    			$( "#sure-pwd" ).prop("placeholder","两次输入的密码不一致！");
    		}
    	} )
    	
    },
}
//初始化页面
enrollPage.init();

//封装函数 让提示字2S消失
function hide(paras){
	setTimeout(function(){
    		paras.hide();
    	}, 2000)
}
