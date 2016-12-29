
var module1 = angular.module( "myList",[] )
			.controller( "listCtrl",[ "$scope", "$http", function($scope, $http){//链式操作
				
				//$http获取商品分类
				$http.get( "http://datainfo.duapp.com/shopdata/getclass.php" )
					 .success( function(data,status,headers,config){
					 	//console.log(data);//成功获取数据
						$scope.items = data;	
					 } );
				
				//$http获取商品信息
				$http( {
					method: 'JSONP',
					url: 'http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSON_CALLBACK',
				} ).success( function( data,status,headers,config ){
					console.log(data);
					$scope.dataList = data;
				} );
				
				//关键字搜索
				$scope.fliterData = [ "衬衫","女","男","礼服" ];
				$scope.reverse = false;
				$scope.fnFilter = function(index){
					if( index == "all" ){
						$scope.keyWord = ""
					}else{
						$scope.keyWord = $scope.fliterData[index]
					}
				}
				
				//价钱  升序  降序
				$scope.reverse = false;
				$scope.fnSort = function(){
					//让reserve取反
					$scope.reverse = !$scope.reverse
				}
				
				
				
			} 
			])
			
