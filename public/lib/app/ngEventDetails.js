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
             $scope.stands = response.data.stands;
             $scope.trusted.svgdata = $sce.trustAsHtml(response.data.event.svgdata);
             setTimeout(function(){$scope.showStands();});
         },
         function(response){
             console.log('ERROR');
             console.log(response);
         });
    };

    $scope.showStands = function() {
      angular.forEach($scope.stands,function(stand, key){
        $('#stands [data-id="'+stand.id_internal+'"]').addClass('status-'+stand.status);
      });
      $('#stands')
          .on('mouseover', '.status-available',
          function(){ console.log($(this).attr('data-id')); })
          .on('mouseover', '.status-reserved',
          function(){ console.log($(this).attr('data-id')); })
          .on('click', '.status-available',
          function(){
            $scope.selected = $scope.stands[$(this).attr('data-id')];
            $scope.$apply();
            $('html, body').animate({
                scrollTop: $("#call-to-action").offset().top
            }, 1000);

          })
          .on('click', '.status-reserved',
          function(){
            $scope.selected = $scope.stands[$(this).attr('data-id')];
            $scope.$apply();
          })
    };

    $scope.init();
  }])

  .filter('fullDate', function(){
    return function (date){
      return moment(date).format('ddd, MMMM Do, YYYY');
    }
  })

;

})(window.angular);
