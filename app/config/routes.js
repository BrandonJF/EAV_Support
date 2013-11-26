//Some example configurations of views in angular with the route provider.
eav.config(['$routeProvider', '$compileProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'app/views/actionItems.htm', controller:'AiController'}).
      when('/ai/:aiNumber', {templateUrl: 'app/views/actionItems.htm', controller: 'AiController'}).
      otherwise({redirectTo: 'app/views/view1.htm'});
}])
;
