(function(angular) {
  'use strict';

  angular.module('ngEventDetails', [])
    .config(['$interpolateProvider', function($interpolateProvider) {
      $interpolateProvider.startSymbol('{|').endSymbol('|}');
    }])

  // Controllers:

  .controller('EventDetailsController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
    $scope.event = {};
    $scope.trusted = {};

    top.scope = $scope; // for debugging purposes

    $scope.init = function() {
      $http({
        method: 'GET',
        data: {},
        url: top.APP_PATH+'/API/event/'+top.EVENT_ID
      }).then(
         function(response){
             console.log('SUCCESS');
             console.log(response);
             $scope.event = response.data.event;
             $('#svgdata').html(response.data.event.svgdata);
             $scope.trusted.svgdata = $sce.trustAsHtml(response.data.event.svgdata);
             jQuery('#svgdata').html($scope.trusted.svgdata.$$unwrapTrustedValue());
         },
         function(response){
             console.log('ERROR');
             console.log(response);
         });
    }
    $scope.init();
  }])

  .filter('fullDate', function(){
    return function (date){
      return moment(date).format('ddd, MMMM Do, YYYY');
    }
  })

;

})(window.angular);
