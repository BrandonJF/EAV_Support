 /**
  * KendoStrapAng3 Module
  *
  * The module for eav
  */


 var eav = angular.module('eav', ['LocalStorageModule', 'ui.unique', 'ngRoute']).value('$anchorScroll', angular.noop);

 //[Configuration Section]
 var config = {};
 config["username"] = localStorage.getItem("eav.username") || registerNewUser();
 config["baseurl"] = "http://localhost";
 config["fileurl"] = "https://www.euclidtechnology.com/cvweb/ai_documents/2009/";
 //Misc Utilities used throughout code.


function registerNewUser(){
    var username = prompt("What is your username?(e.g. JWU, BJOHNFRESO)");
    localStorage.setItem("eav.username", username);
    return username;

}
 Date.prototype.defaultView = function() {
     var dd = this.getDate();
     if (dd < 10) {
         dd = "0" + dd;
     }
     var mm = this.getMonth() + 1;
     if (mm < 10) {
         mm = "0" + mm;
     }
     var yyyy = this.getFullYear();
     return String(mm + "\/" + dd + "\/" + yyyy);
 };

 function getClockTime() {
     var now = new Date();
     var hour = now.getHours();
     var minute = now.getMinutes();
     var second = now.getSeconds();
     var ap = "AM";
     if (hour > 11) {
         ap = "PM";
     }
     if (hour > 12) {
         hour = hour - 12;
     }
     if (hour === 0) {
         hour = 12;
     }
     if (hour < 10) {
         hour = "0" + hour;
     }
     if (minute < 10) {
         minute = "0" + minute;
     }
     if (second < 10) {
         second = "0" + second;
     }
     var timeString = hour +
         ':' +
         minute +
         ':' +
         second +
         " " +
         ap;
     return timeString;
 }
