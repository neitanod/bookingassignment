(function(angular) {
  'use strict';

  angular.module('ngEvents', ['ngMap'])
    .config(['$interpolateProvider', function($interpolateProvider) {
      $interpolateProvider.startSymbol('{|').endSymbol('|}');
    }])

  // Controllers:

  .controller('EventsController', ['$scope', 'NgMap', '$http', function($scope, NgMap, $http) {
    $scope.events = {};

    var vm = this;
    NgMap.getMap().then(function(map) {
      // Grab the map so I can bind the clicks to my custom callbacks
      vm.map = map;
    });

    vm.showEvent = function(ev,id){
      $scope.selectEvent(id);
      $('html, body').animate({
          scrollTop: $("#call-to-action").offset().top
      }, 1000);
    };

    $scope.selectEvent = function(id){
      $('#event-details').hide();
      $scope.ev = $scope.events[id];
      $scope.$apply();
      $('#event-details').fadeIn();
    };

    top.scope = $scope; // for debugging purposes

    $scope.init = function() {
      $http({
        method: 'GET',
        data: {},
        url: top.APP_PATH+'/API/events/list'
      }).then(
         function(response){
             console.log('SUCCESS');
             console.log(response);
             $scope.events = response.data.events;
             //$scope.$apply();
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

  .filter('toDate', function () {
    return function (date) {
      return new Date(date);
    }
  })

  .filter('search', function () {
    return function (items, search) {
      if(search === "") return items;
      search=search.toLowerCase();
      var result = {};
      angular.forEach(items, function (item, id) {
        angular.forEach(item, function (value, key) {
          console.log(value, typeof value == "string"?value.indexOf(search):"" );
          if (typeof value == "string" && (value.toLowerCase().indexOf(search) !== -1)) {
            result[id] = item;
          }
        })
      });
      return result;

    }
  })

;

})(window.angular);


function query(queryname, data, callback){
  var delay = top.fake_network_delay?parseFloat(top.fake_network_delay):0;
  var packet = {};
  if( data == undefined ) data = {};
  packet.query = queryname||"status";
  packet.data = angular.toJson(data);
  $.ajax({
    url: "/API/stands",   // Entry point de la API del Panel.
    data: packet,
    method: 'get',
    context: document.body,
    success: function(response, status, r){
      if(typeof(response)=='string'){response = JSON.parse(response);}
      // console.log(typeof(response));
      returned_data = response["data"];
      // console.log("> Success!  Status: "+status);
      // console.log(r.responseText.substr(0,100)+"...");
      // console.log("Packet:", packet);
      // console.log("Response:", response);
      // console.log("Request:", r);
      // console.log("returned_data: ",response['data']);
      if(response["code"]==401){
        alertError("You must be logged in to access this feature.",undefined,function(){top.location.href="l?nocache";});
      } else if(response["code"]!=200){
        console.group("ERROR");
        console.log("Response:");
        console.log(response);
        console.log("Error code:",response['code']);
        console.groupEnd();
        //alertError(h4(response["message"]));
      } else {
        console.group("OK");
        console.log(returned_data);
        console.groupEnd();
        if(callback) setTimeout(function(){callback(returned_data);}, delay);
      }
    },
    complete: function(r, status){
      console.group("COMPLETED");
      console.log("> with status: "+status+" "+r.status+" "+r.statusText);
      console.log("Request:", r);
      console.log("Response:", r.responseText.substr(0,100)+"...");
      console.groupEnd();
    },
    error: function(r, status){
      console.group("COMPLETED WITH ERROR");
      console.log("> Error: "+status+" "+r.status+" "+r.statusText);
      console.log("Request:", r);
      console.log("Response:", r.responseText.substr(0,100)+"...");
    }
  });
}
