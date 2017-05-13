
var app = angular.module('signIn', []);


app.controller('myCtrl', function($scope, $http) {
    
    $scope.signInSubmit = function(){
         
        var dataJson = {
                        "name" : $scope.name,
                        "password" : $scope.password,
                        "role": $scope.role};
         
         $http({
			method : "POST",
			url : '/signIn',
			data : dataJson
		    }).success(function(response) {
                 
                 if (response.checked) {
                     
                     if ("student" == $scope.role) {
                         window.location.assign("/file");
                     }
                     
                     if ("teacher" == $scope.role) {
                         window.location.assign("/students");
                     }
                     
                 } else {
                     alert("The Name or Password is incorrect!");
                 }
                 
               
		    }).error(function(error) {

            
		    });

        
    };
    
    
});
