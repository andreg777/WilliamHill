/*
1. Only tested in chrome
2. Did the test in javascript / angular
3. Did not want to include extra libraries for groupBy functions.
4. Would have been better to instantiate a javascript Customer object and extend the prototype on it but just used normal object.
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
				for(var i = 0; i < items.length; i++){
					var item =  items[i];
					item.hasHighWin = this.hasHighWin.bind(item);
				}
				return items;
			},
			enrichUnsettledItems:function(items){
				for(var i = 0; i < items.length; i++){
					var item =  items[i];
					item.hasHighWin = this.hasHighWin.bind(item);
				}
				return items;
			},
			//requirement 1. & 2.1 -- Calc unusually high win rate
			hasHighWin: function(){
				var total = this.items.length;
				var winTotal = this.items.filter(function(item){return item.win > 0}).length;
				return (winTotal / total) >= 0.6
			},
			groupData: function(key,items){
				var groupKeys = [];
				for(var i=0; i < items.length; i++){
					var item = items[i];
					if(groupKeys.indexOf(item[key]) === -1){
						groupKeys.push(item[key]);
					}
				}

				var results = [];
				for(var i = 0; i < groupKeys.length; i++){
					var groupKey = groupKeys[i];
					var groupList = items.filter(function(item){return item[key] === groupKey;});
					var result = {key: groupKey, items: groupList};
					results.push(result)
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
