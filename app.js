
(function(){

	var whApp = angular.module('whApp',[])
		
	//controller
	var techTestController = function($scope,techTestService){
		$scope.viewModel = techTestService.getViewModel();
	};
	
	//service
	var techTestService = function(){
		return {
			getViewModel: function(){
			},
			
			getSettledData: function(){		
			},
			
			getUnsettledData:function(){
			}
		}
	}
	
	
	whApp.controller('techTestController',['$scope','techTestService',techTestController]);
	whApp.factory('techTestService',techTestService);

}());