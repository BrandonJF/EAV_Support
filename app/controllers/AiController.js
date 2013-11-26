eav.controller("AiController", ['$scope', '$http', '$location', '$routeParams', 'localStorageService', 'aiService', 'userService',
  function ($scope, $http, $location, $routeParams, localStorageService, aiService, userService) {
    $scope.username = userService.getUsername();
      $scope.$on('$viewContentLoaded', function () {
      $(function () {
        // Initialize the Kendo DatePicker by calling the kendoDatePicker jQuery plugin
        $(".datepicker").kendoDatePicker();
      });
    });
    $scope.aiList = {};
    $scope.aiNumber = $routeParams.aiNumber;
    aiService.getAiNotes($scope.aiNumber).success(function (data) {
      var note = $(data);
      $("#details").html(note);
      if ($("#details").text().length > 10) {
        $scope.details = note;
        $scope.modifyDetails();
      } else {
        $("#details").html("There are no notes for this AI.");
      }
      $scope.getDetails();
    });
    $scope.getDetails = function () {
      aiService.getAiDetails($scope.aiNumber).success(function (data) {
        console.log("getDetailsData", data);
        $scope.ai = aiService.modifyAi(data);
        console.log("scope.ai", $scope.ai);
      });
    };
    $scope.modifyDetails = function () {
      $("#details").find("*").removeAttr("style bgcolor color");
      var noteHeaders = $("#details table");
      var notesAmt = noteHeaders.length;
      $.each(noteHeaders, function (index, noteHeader) {
        var $noteHeader = $(noteHeader);
        $noteHeader.addClass("noteHeader panel-heading");
        if (index < notesAmt) {
          var $entireNote = $noteHeader.add($noteHeader.nextUntil("table"));
          $entireNote.wrapAll("<div class='note well'></div>");
        }
        var headerText = $noteHeader.text();
        headerText = headerText.substring(headerText.indexOf("by") + 3);
        headerTextArray = headerText.split("Time:");
        headerText = headerTextArray[0];
        var timeStamp = headerTextArray[1];
        $noteHeader.html(headerText);
        $noteHeader.prepend("<i class='fa fa-user'></i>");
        $noteHeader.append("<span class='timeStamp'>" + timeStamp + "</span>");
      });
    };
    aiService.getUserAis($scope.username).success(function (data, status) {
      $scope.aiList = aiService.modifyAis(data.actionItems);
    });

      $scope.searchUserAi = function(aiNumber){
    if (aiNumber.indexOf("user/")==-1){$scope.navigateTo('/ai/' + aiNumber);}
    else{
      localStorageService.add("username", aiNumber.split("/")[1]);
      window.location.reload();

    }
  }



  }
]);
