var m1 = angular.module( "myApp",[] )
		.controller( "cartCtrl",[ "$scope", "$http", "$timeout", function( $scope, $http, $timeout ){
			
			$scope.cartData = [];
			$scope.totalNumber =0;
			$scope.totalPrice = 0;
			//获取数据
			$http.jsonp( "http://datainfo.duapp.com/shopdata/getCar.php?callback=JSON_CALLBACK&userID=dongjing" )
				 .success( function( data ){
				console.log(data);//成功获取数据
				$scope.cartData = data;
			} )
			
			//事件
			$scope.fnChange = function( type, index ){
				//type: 0:删除 -1：减1 +1：加1
				var num = $scope.cartData[index].number*1;
				var id  = $scope.cartData[index].goodsID;
				//console.log(id);//成功获取商品id
				if( type ){
					//加减
					$scope.cartData[index].number = num+type;
					if($scope.cartData[index].number<=1){
						$scope.cartData[index].number=1
					}
				}else{
					//删除
					$scope.cartData.splice( index, 1 );
					num = 0;
				}
				//数据更新（）
				var sum1=$scope.cartData[index].number
				var sendData = "userID=dongjing&goodsID="+id+"&number="+sum1;//number的值不能直接写num,因为num是在点击按钮之前的那个值，获得的商品数量会减1 
					$http.get( "http://datainfo.duapp.com/shopdata/updatecar.php?"+sendData ).success(function(data){
						console.log(data)
						console.log(sendData)
					}).error(function(){alert(2)})
				
				
			};
			
			//监听购物车的数据
			$scope.$watch( "cartData", function( newVal, oldVal ){
				//重新计算总和
				var allNumber = 0;
				var allPrice = 0;
				for( var i = 0; i < newVal.length; i++ ){
					allNumber += newVal[i].number*1;
					allPrice += newVal[i].number*newVal[i].price
					//console.log(allNumber)
					//console.log(allPrice)
				}
				$scope.totalNumber = allNumber;
				$scope.totalPrice = allPrice;
			},true )//加上true为深度监听
		} ] )