eav.factory("userService", function($http,$q, localStorageService){


  var userService =  {
      username : config.username,
      useIsAuthenticated : false,

      setUserAuthenticated: function(value){
  userService.useIsAuthenticated = value;
  },

   memberDllBaseUrl:"https://www.euclidtechnology.com/cvweb/cgi-bin/memberdll.dll/info?",

   getUsername: function (customercd) {
       return userService.username;
//     console.log("getUsername Called for.", customercd);
//     return $http({
//      url: userService.memberDllBaseUrl,
//      method: 'GET',
//      params: {
//        "WRP": "userinfo_json.json",
//        "WMT": "none",
//        "CUSTOMERCD": customercd
//      }
//    });
   }
};//end userService Object
return userService;

});
