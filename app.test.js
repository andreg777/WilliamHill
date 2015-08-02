
describe('techTestcontroller',function(){
     var  _techTestService,_viewModel;

     beforeEach(module('whApp'));
/*
     beforeEach(inject(function(_$rootScope_, _$controller_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $controller = _$controller_;

            $controller('techTestController', {'$rootScope' : $rootScope, '$scope': $scope});
     }));
*/
     beforeEach(inject(['techTestService',function(techTestService){
       _techTestService = techTestService;
       _viewModel = _techTestService.getViewModel();
     }]))

     it('settled count is 6',function(){
          expect(_viewModel.settledItems.length).toBe(6);
     });
     it('unsettled settled count is 6',function(){
          expect(_viewModel.unsettledItems.length).toBe(6);
     });

     it('has 2 settled high winning stake',function(){
          expect(_viewModel.settledItems.filter(function(item){return item.hasHighWin()}).length).toBe(2);
     });

     it('has 6 unsettled high winning stake',function(){
          expect(_viewModel.unsettledItems.filter(function(item){return item.hasHighWin()}).length).toBe(6);
     });

     it('customer 1 has high stake',function(){
          expect(_viewModel.unsettledItems.filter(function(item){return item.hasHighStake()})[0].key).toBe(1);
     });

     it('customer 6 has high win',function(){
               expect(_viewModel.unsettledItems.filter(function(item){return item.hasHighWin()})[5].key).toBe(6);
     });

  });
