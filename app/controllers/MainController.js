eav.controller("MainController", ['$scope', '$http', '$location', 'localStorageService', 'aiService', 'userService',
    function ($scope, $http, $location, localStorageService, aiService, userService) {


        $scope.mainCtrlVariables = {
            variableWithinObject: [],
        };

        $scope.username = config.username;
        $scope.navigateTo = function (path) {
            $location.path(path);
        };

        $scope.openOnSupport = function(aiNumber){
         aiService.openUserAi(aiNumber);
        };




}]);
