/*
1. only tested in chrome
2. did the test in javascript / angular
*/
(function(){

	var whApp = angular.module('whApp',[])

	//controller
	var techTestController = function($scope,techTestService){
		$scope.viewModel = techTestService.getViewModel();
	};

	//service
	var techTestService = function(){
		return {
			viewModel:{
				settledItems:[],
				unsettledItems:[]
			},

			getViewModel: function(){
				var settledItems = this.groupData("customer",this.getSettledData());
				var unsettledItems = this.groupData("customer",this.getUnsettledData());

				this.viewModel.settledItems = this.enrichSettledItems(settledItems);
				this.viewModel.unsettledItems = this.enrichUnsettledItems(unsettledItems);
				return this.viewModel;
			},
			enrichSettledItems: function(items){
				for(var item in items){
					item.hasHighWin = this.hasHighWin.bind(item);
				}
			},
			enrichUnsettledItems:function(items){
				for(var item in items){
					item.hasHighWin = this.hasHighWin.bind(item);
				}
			},
			//requirement 1. & 2.1 -- Calc unusually high win rate
			hasHighWin: function(){
				var total = this.items.length;
				var winTotal = this.items.filter(function(item){return item.win > 0}).length;
				return (winTotal / total) >= 0.6
			},
			groupData: function(key,items){
				var groupKeys = [];
				for(var item in items){
					if(groupKeys.indexOf(item[key]) >= 0){
						item.push(item[key]);
					}
				}

				var results = [];
				for(groupKey in groupKeys){
					var groupList = items.filter(function(item){return item[key] === groupKey;});
					var result = {key: item[key], items: groupList};
					results.add(result)
				}
				return results;
			},

			getSettledData: function(){
				//I've put all data in local file to avoid http call which needs app in a server environment.
				return settledData;
			},

			getUnsettledData:function(){
				//I've put all data in local file to avoid http call which needs app in a server environment.
				return settledData;
			}
		}
	}

	whApp.controller('techTestController',['$scope','techTestService',techTestController]);
	whApp.factory('techTestService',techTestService);
}());
