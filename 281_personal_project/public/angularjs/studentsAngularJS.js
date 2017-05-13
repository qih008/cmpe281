
var app = angular.module('students', []);


app.controller('myCtrl', function($scope, $http) {
    
    $scope.students = undefined;
    
    $scope.getStudent = function(name){
        name = name.replace(" ", "_");
         window.location.assign("/" + name + "/student/");
    };
    
    
    $http({
        method : "GET",
        url : '/studentsList',
    }).success(function(response) {
                 
        if (response.expired) {
            window.location.assign("/signIn");
        } else {
            $scope.students = response.students;
        }
                 
               
        }).error(function(error) {

    });
    
    $scope.signOut = function () {
        
        
       $http({
			method : "POST",
			url : '/signOut'
		    }).success(function(data, status, headers, config) {
                 
                   window.location.assign('/signIn');
               
		    }).error(function(error) {

            
		    });

    };

    
    
});
