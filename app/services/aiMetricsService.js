eav.factory("aiMetricsService", function($http,$q, localStorageService, aiService){


  var aiMetricsService =  {
   username : config.username,

   memberDllBaseUrl:"https://www.euclidtechnology.com/cvweb/cgi-bin/memberdll.dll/info?",

   calcProgress: function(aiObjects){


       var maxPriority = 5;
       var minPriority = 1;
       var scaleAdjust = maxPriority + minPriority;

    var completedAiArray = _.filter(aiObjects, function(ai) { return ai.ACTIONTYPE ==="Client Review" || ai.ACTIONTYPE ==="Bill" ;});
    var incompleteAiArray = _.filter(aiObjects, function(ai) { return ai.ACTIONTYPE !== "Client Review" && ai.ACTIONTYPE !== "Ready to Close" && ai.ACTIONTYPE !== "Schedule"  ; });

    var completedPriorityArray = _.pluck(completedAiArray, 'ACTIONPRIORITY');
    completedPriorityArray = _.map(completedPriorityArray, function(num) { return scaleAdjust - parseInt(num); });
//    console.log("completedPriorityArray",completedPriorityArray);
    var incompletePriorityArray = _.pluck(incompleteAiArray, 'ACTIONPRIORITY');
    incompletePriorityArray = _.map(incompletePriorityArray, function(num) { return scaleAdjust - parseInt(num); });
//    console.log("incompletePriorityArray",incompletePriorityArray);



    var completedPriorityTotal = _.reduce(completedPriorityArray, function(prev, next) { return prev + next; }, 0);
//    console.log("completedPriorityTotal",completedPriorityTotal);
    var incompletePriorityTotal = _.reduce(incompletePriorityArray, function(prev, next) { return prev + next; }, 0);
//    console.log("incompletePriorityTotal",incompletePriorityTotal);

    var totalPriorityTotal = completedPriorityTotal + incompletePriorityTotal ;
//    console.log("totalPriorityTotal",totalPriorityTotal);

    var progress = ((completedPriorityTotal / totalPriorityTotal) * 100) ;
    progress = progress.toFixed(2);
    return progress;

}
};//end userService Object
return aiMetricsService;

});
