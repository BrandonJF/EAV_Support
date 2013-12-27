eav.factory("messageService", function($http) {
    var messageService = {
        sendAiMessage: function(message, aiNumber, emailConfig) {
            var today = new Date();
            return $http({
                url: config.baseurl + '/eav/cgi-bin/actionitemsdll.dll/Info?',
                method: 'get',
                params: {
                    "listitemnum": aiNumber,
                    "WMT": "none",
                    "WRP": "actionNote.htm",
                }
            }).then(function(response) {
                var responseStatus = "";
                var newnote = '<table width="100%" border="0"><tr><td bgcolor="#999999"><font color="white">Detailed Description Entered by ' +
                    config.username +
                    ' <BR>Time: ' +
                    today.defaultView() +
                    ' ' +
                    window.getClockTime() +
                    '</font></td></tr></table><p>' +
                    message + '</p>';
                var messageToSend = newnote + '<br>' + response.data;
                var uploadPromise = messageService.uploadAiMessage(messageToSend, aiNumber, emailConfig);
                uploadPromise.then(function(response) {
                    responseStatus = response;
                    return responseStatus;
                });
                return uploadPromise;
            });
        },
        uploadAiMessage: function(message, aiNumber, emailConfig) {
            var promise = $http({
                url: config.baseurl + '/eav/cgi-bin/msashelpdll.dll/ActionItemUpdate',
                method: 'get',
                params:/*Must use lodash to merge objects*/ _.assign({
                    "CUSTOMERCD": "502508",
                    "listitemnum": aiNumber,
                    "WMT": "none",
                    "ACTIONNOTE": message,
                    "WRP": "UploadResponse.htm",

                }, emailConfig)
            }).then(function(response) {
                return response.data;
            });
            return promise;
        }
    };
    return messageService;
});
