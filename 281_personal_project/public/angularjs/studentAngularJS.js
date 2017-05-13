
var app = angular.module('student', []);


app.controller('myCtrl', function ($scope, $http) {
    
    $scope.submit = function(name) {
        
        var dataJson = {"points" : $scope.points,
                        "comments": $scope.comments,
                        "completed": $scope.completed,
                        "name" : name};
        var name_ = (name).replace(" ", "_");
        
        $http({
            method : "PUT",
            url : '/' + name_ + '/student',
            data: dataJson
        }).success(function (response) {
            
            console.log("1111");
            console.log(response);
            if (true == response.expired) {
                window.location.assign('/signIn');
            } else {
                window.location.reload();
            }
            

        }).error(function (error) {

        });

    }
    
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