 /**
  * KendoStrapAng3 Module
  *
  * The module for eav
  */


 var eav = angular.module('eav', ['LocalStorageModule', 'ui.unique', 'ngRoute']).value('$anchorScroll', angular.noop);

 //[Configuration Section]
 var config = {};
 config["username"] = "BJOHNFRESO";
 config["baseurl"] = "http://localhost";

 //Misc Utilities used throughout code.

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
