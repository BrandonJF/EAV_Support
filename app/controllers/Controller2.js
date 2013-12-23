eav.controller("Controller2", ['$scope', '$http', '$location', 'localStorageService', 'aiService', 'userService',
    function ($scope, $http, $location, localStorageService, aiService, userService) {

        $scope.scopeVariableExample = {
            variableWithinObject: [],
            stringVar: "This is displayed."
        };

        $scope.someFunctionWServiceCall = function () {
            aiService.exampleFunction();
        };
}]);
