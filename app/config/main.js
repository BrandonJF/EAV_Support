 /**
 * KendoStrapAng3 Module
 *
 * The module for eav
 */
var eav = angular.module('eav', ['LocalStorageModule', 'ui.unique', 'ngRoute']).value('$anchorScroll', angular.noop);
var config ={};
config["username"] = "bjohnfreso";





function sumOfArray(theArray){
    var sum =  _.reduce(theArray, function(prev, next) { return prev + next; }, 0);
    console.log("your sum is", sum)
}



//calcProgress(testItems.actionItems);


