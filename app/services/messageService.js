eav.factory("messageService", function($http) {
    var messageService = {
        sendAiMessage: function(message, aiNumber) {
            //alert(message, aiNumber);
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
                var newnote = '<table width="100%" border="0"><tr><td bgcolor="#999999"><font color="white">Detailed Description Entered by ' + config.username + ' <BR>Time: ' + today.defaultView() + ' ' + window.getClockTime() + '</font></td></tr></table><p>' + message + '</p>';
                var messageToSend = newnote + '<br>' + response.data;
                var uploadPromise = messageService.uploadAiMessage(messageToSend, aiNumber);
                uploadPromise.then(function(response) {
                    responseStatus = response;
                    return responseStatus;
                });
                return uploadPromise;
            });
        },

        uploadAiMessage: function(message, aiNumber) {
            console.log("Upload Ai Message: ", message);
            var promise = $http({
                //url: config.baseurl + '/eav/cgi-bin/actionitemsdll.dll/Info?',
                url: config.baseurl + '/eav/cgi-bin/msashelpdll.dll/ActionItemUpdate',
                method: 'get',
                params: {
                    "CUSTOMERCD": "502508",
                    "listitemnum": aiNumber,
                    "WMT": "none",
                    "ACTIONNOTE": message,
                    "SENDEMAIL": "N",
                    "WRP": "UploadResponse.htm"
                    //"ACTIONTYPE_field":"Client Review"

                }
            }).then(function(response) {
                return response.data;
            });
            return promise;

        }
    };
    return messageService;
});
