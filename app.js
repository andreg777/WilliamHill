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
					item.hasHighStake = this.hasHighStake.bind(item,10);
					item.hasVeryHighStake = this.hasHighStake.bind(item,30);
					item.hasBigWin = this.hasBigWin.bind(item,1000);
				}
				return items;
			},
			//requirement 1. & 2.1 -- Calc unusually high win rate
			hasHighWin: function(){
				var total = this.items.length;
				var winTotal = this.items.filter(function(item){return item.win > 0}).length;
				return (winTotal / total) >= 0.6
			},
			hasHighStake: function(multiplier){
				var totalStake = this.items.reduce(function(prev,current){ return {stake:prev.stake + current.stake}}).stake;
				var betCount = this.items.length;
				var avg = totalStake / betCount;

				return this.items.some(function(item){return item.stake >= (avg * multiplier)});
			},
			hasBigWin:function(limit){
				return this.items.some(function(item){return item.toWin > limit;});
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
				return unsettled;
			}
		}
	}

	whApp.controller('techTestController',['$scope','techTestService',techTestController]);
	whApp.factory('techTestService',techTestService);
}());
