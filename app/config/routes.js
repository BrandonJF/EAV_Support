//Some example configurations of views in angular with the route provider.
eav.config(['$routeProvider', '$compileProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'app/views/actionItems.htm', controller:'Controller1'}).
      when('/view1/:someURLParam', {templateUrl: 'app/views/view2.htm', controller: 'Controller1'}).
      otherwise({redirectTo: 'app/views/view1.htm'});
}])
;
