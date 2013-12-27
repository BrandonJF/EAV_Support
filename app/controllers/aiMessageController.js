eav.controller("AiMessageController", ['$scope', '$http', '$location', '$route', 'localStorageService', 'aiService', 'userService', 'messageService',
    function ($scope, $http, $location, $route, localStorageService, aiService, userService, messageService) {
        $scope.emailConfig = {
            "SENDEMAIL_Check": false,
            "SENDEMAIL": "Y",
            "SAVETOFILE": "Y",
            "EMAILSUBJECT": "Action Item " + $scope.ai.LISTITEMNUM + "Has Been Updated by " + config.username,
            "EMAILRESPONSEFORMAT": "HTML",
            "EMAILFROMADDRESS": "support@euclidtechnology.com",
            "EMAILREPLYFORM": "AI_update_email.htm",
            "EMAILREPLYADDRESS": "support@euclidtechnology.com"
        };
         $scope.sendAiMessage = function() {
            if ($scope.aiMessage || $("#aiMessageEditor").val()) {
                var sendingAi_Promise = messageService.sendAiMessage(($("#aiMessageEditor").val()), $scope.aiNumber, $scope.emailConfig);
                sendingAi_Promise.then(function(response) {
                    $('#aiResponseModal').modal('hide');
                    $route.reload();
                });
            }
        };

    }
]);
