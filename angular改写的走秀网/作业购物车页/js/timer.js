			angular.module( "filters",[] )
				.filter( "myFilter",function(){
					return function(){
						var date = new Date();
						var year = date.getFullYear();
						var month = date.getMonth()+1;
						var day = date.getDate();
						var hour = date.getHours();
						var min = date.getMinutes();
						var seconds = date.getSeconds();
						console.log(year+";"+month+";"+day)
						var newDate = year+"/"+month+"/"+day+ " " +hour+ ":" + min+ ":" +seconds;
						return newDate;
					}
				} )
		