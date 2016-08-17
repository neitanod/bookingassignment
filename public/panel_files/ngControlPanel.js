top.use_mock_api = 0;

(function(angular) {
  'use strict';

  angular.module('ngControlPanel', ['ngRoute'])
    .config(['$interpolateProvider', '$routeProvider', function($interpolateProvider, $routeProvider) {

      $routeProvider.
      when('/dashboard', {
        templateUrl: '/panel_files/views/dashboard.html',
        controller: 'DashboardController'
      }).
      when('/users', {
        templateUrl: '/panel_files/views/users.html',
        controller: 'UsersController'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });

      $interpolateProvider.startSymbol('{|').endSymbol('|}');
    }])



  // Controllers:

  .controller('StatusController', ['$scope', function($scope) {
    $scope.messages = [{},{}];
    $scope.unread = 0;
    $scope.init = function() {
      query('users',{},
          function(returned_data){
            console.log("returned_data:");
            console.log(returned_data);
            $scope.users = returned_data.users;
            $scope.$apply();
            enable_section();
            done();
          });
      ;
    }
    $scope.init = function() {
    };

    $scope.init();
  }])

  .controller('DashboardController', ['$scope', function($scope) {
  }])


  .controller('UsersController', ['$scope', function($scope) {
    $scope.users = [];

    $scope.init = function() {
      disable_section();
      var done = alert(h4(wait("Cargando..."))).later();

      query('users',{},
          function(returned_data){
            console.log("returned_data:");
            console.log(returned_data);
            $scope.users = returned_data.users;
            $scope.$apply();
            enable_section();
            done();
          });
    };
    $scope.init();
  }])

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

(function($body, counter){
    $body.on('dragenter',  function(){$body.addClass("draghover"); counter++;})
         .on('drop',       function(){$body.removeClass("draghover"); counter=0;})
         .on('dragleave', function(){counter--; if(!counter){$body.removeClass("draghover");}});
})($('body'), 0);

// pide status cada 30 segundos y si se deslogueó avisa.
//setInterval(retrieveNotifications,30000);
setInterval(retrieveNotifications,3000);

function processNotifications(data){
  console.group('ProcessNotifications');
  console.log(data);
  console.groupEnd();
  checkVersion(data["app_version"]);
}

function retrieveNotifications(){
  query("status",{},processNotifications);
}

retrieveNotifications();

function checkVersion(version){
  if(!version) return;
  var current_version = localStorage.getItem("app_version");
  console.group("Check Version");
  console.log("ACTIVE VERSION:", current_version);
  console.log("NEW VERSION:", version);
  console.groupEnd();
  if(!top.reloadlater && current_version == "latest" || current_version == "" || current_version == null){
    localStorage.setItem("app_version", version);
  } else {
    if(version != current_version){
      //alert(h4(wait(" ")+" Actualizando... "), "Nueva versión de la aplicación disponible.");
      console.log("top.reloadlater: ",top.reloadlater);
      //top.applicationCache.update();
      localStorage.clear();
      localStorage.setItem("app_version", version);
      if(!top.reloadlater) {
        ask_new_panel_version(
          // Saving before exiting
          function(ok){
            if(ok) {
              top.location.reload();
            } else {
              top.reloadlater = true;
            }
          }
        );
      }
    }
  }
}

function getPanelSlug(){
  return getPanelSlugFromUrl();
}

function getPanelSlugFromUrl(){
  slug = /\/panel\/([^\/|#|?]*)/g.exec(top.location.href)[1];
  console.log(slug);
  return slug;
}

function query(queryname, data, callback){
  if(top.use_mock_api) return query_mock(queryname, data, callback);

  var delay = top.fake_network_delay?parseFloat(top.fake_network_delay):0;
  var packet = {};
  if( data == undefined ) data = {};
  packet.panel = getPanelSlug();
  packet.query = queryname||"status";
  packet.data = angular.toJson(data);
  $.ajax({
    url: "/API/panel",   // Entry point de la API del Panel.
    data: packet,
    method: 'get',
    context: document.body,
    success: function(response, status, r){
      if(typeof(response)=='string'){response = JSON.parse(response);}
      console.log(typeof(response));
      returned_data = response["data"];
      console.log("> Success!  Status: "+status);
      console.log(r.responseText.substr(0,100)+"...");
      console.log("Packet:", packet);
      console.log("Response:", response);
      console.log("Request:", r);
      console.log("returned_data: ",response['data']);
      if(response["code"]==401){
        alertError(h4("La sesión ha expirado. Vuelva a ingresar."),undefined,function(){top.location.href="/panel/e/"+getEstablishmentSlug()+"?nocache";});
      } else if(response["code"]!=200){
        console.group("ERROR");
        console.log("xResponse:");
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
      console.log("> Completed with status: "+status+" "+r.status+" "+r.statusText);
      console.log(r.responseText.substr(0,100)+"...");
      console.log("Request:", r);
    },
    error: function(r, status){
      console.log("> Error: "+status+" "+r.status+" "+r.statusText);
      console.log(r.responseText.substr(0,100)+"...");
      console.log("Request:", r);
    }
  });
}

function query_mock(queryname, data, callback){
  var delay = top.fake_network_delay?parseFloat(top.fake_network_delay):0;
  console.log("Using a mockup connection (delay "+(delay/1000)+"s)");
  console.log("Query name:",queryname);
  console.log("Data:", data);
  var stubs = {


    "load_vacancies": {"request_data": "*", "returned_data": {data:
      {
        dates: ['01/01/2016','02/01/2016',
        '03/01/2016','04/01/2016',
        '05/01/2016','06/01/2016',
        '07/01/2016','08/01/2016',
        '09/01/2016','10/01/2016'],
        rooms: [
          {
            accommodation:  {id: "1", name:"Estudio", max:"3", adults:"2", children:"1"},
            vacancy: {'01/01/2016': '3', '02/01/2016': '3', '03/01/2016': '3', '04/01/2016': '3', '05/01/2016': '3',
                      '06/01/2016': '3', '07/01/2016': '3', '08/01/2016': '3', '09/01/2016': '3', '10/01/2016': '3'},
          },
          {
            accommodation:  {id: "2", name:"Apartamento estándar", max:"4", adults:"2", children:"3"},
            vacancy: {'01/01/2016': '3', '02/01/2016': '3', '03/01/2016': '3', '04/01/2016': '3', '05/01/2016': '3',
                      '06/01/2016': '3', '07/01/2016': '3', '08/01/2016': '3', '09/01/2016': '3', '10/01/2016': '3'},
          },
          {
            accommodation:  {id: "3", name:"Apartamento de lujo", max:"4", adults:"2", children:"3"},
            vacancy: {'01/01/2016': '3', '02/01/2016': '3', '03/01/2016': '3', '04/01/2016': '3', '05/01/2016': '3',
                      '06/01/2016': '3', '07/01/2016': '3', '08/01/2016': '3', '09/01/2016': '3', '10/01/2016': '3'},
          },
        ]
      }}},

  };

  var returned_data = {};

  // TODO: hacer que diferencie por request_data, no solo por queryname
  if(stubs[queryname]) returned_data = stubs[queryname]["returned_data"]["data"];

  console.log(returned_data);

  var returned_package = {"data": returned_data, "code": 200, "status": "Ok", "message": "(Mock) Ok"}
  if(callback) setTimeout(function(){callback(returned_data);}, delay);

}

// Alert replacement and notification functions

var native_alert = window.alert;
window.alert = function(title, msg) {
  // Reemplaza el alert nativo por uno que hace aparecer una notificación no
  // intrusiva al pie de la ventana.
  // También devuelve una función que sirve para emitir un nuevo mensaje
  // cerrando rápidamente este (cancelando el timeout)
  if(title==undefined) title = "";
  if(msg==undefined) msg = "";
  //swal(title, msg);
  var last_alert = alertify.log(title+(msg?"<br/>\n"+msg:''));
  return { later: function(msg, wait) {
    var wait = wait==undefined?0:parseFloat(wait);
    return function() {
      setTimeout(function(){
        alertify.close(last_alert, 1);
        console.log(msg);
        if(msg) alertify.success(msg);
      }, wait);
    }
  }
  }
}

window.alertError = function(title, msg, cb) {
  if(title==undefined) title = "ERROR";
  if(msg==undefined) msg = "";
  alertify.alert(title+(msg?"<br/>\n"+msg:''),cb);
}

function h4(msg) {
  var msg = msg ? "<h4>"+msg+"</h4>" : "";
  return msg;
}

function wait(msg) {
  var msg = msg ? msg+' <span class="fa fa-spinner fa-spin"></span>' : "";
  return msg;
}

function ok(msg) {
  var msg = msg ? msg+'&nbsp;&nbsp;<span>\u2713</span>' : "";
  return msg;
}

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}

function disable_section() {
  $('.ngview-contents').addClass('disabled');
}

function enable_section() {
  $('.ngview-contents').removeClass('disabled');
}

function ask_new_panel_version(cb) {
  if(!top.reloadasking){
    top.reloadasking = true;
    alertify.set({ labels: {
      ok     : "Recargar ahora",
      cancel : "Más tarde"
    } });
    alertify.confirm("Nueva versión de la aplicación disponible.", cb);
  }
}

function ask_save(cb) {
  alertify.set({ labels: {
    ok     : "Guardar",
    cancel : "Descartar"
  } });
  alertify.confirm("¿Guardar las modificaciones?", cb);
}

function confirm_save(msg, cb) {
  alertify.set({ labels: {
    ok     : "Guardar",
    cancel : "Cancelar"
  } });
  alertify.confirm(msg, cb);
}

function expired(cb) {
  alertify.confirm("La sesión expiró.", cb);
}

function close_aside() {
  $('.aside-toggled').removeClass('aside-toggled');
}

function initialize_uploader(all_done_callback){
  // jQuery File Upload Plugin
  // https://github.com/blueimp/jQuery-File-Upload

  'use strict';

  var all_done = function(){
    $('#fileupload').find(".files").empty();
    if(typeof all_done_callback == "function") all_done_callback();
  }

  console.log("Initializing UPLOADER");

  var upload_count = 0;

  $('.fileupload').each(function () {
    $(this).fileupload({
      dropZone: $(this).find(".fileupload-dropzone"),
      autoUpload: true
    })
    .bind('fileuploadadd', function (e, data) {upload_count++;})
    .bind('fileuploaddone', function (e, data) {upload_count--; if(!upload_count) {all_done();}})
    ;//.addClass('fileupload-processing');

  });
  console.log("UPLOADER Initialized");

}

