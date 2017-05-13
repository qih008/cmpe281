//loading the 'app' angularJS module
var app = angular.module('submit', ['ngFileUpload']);


app.controller('myCtrl', function ($scope, Upload, $http) {
    
    $scope.image = undefined;
    $scope.download = undefined;
    $scope.subDetailTitle = undefined;
    $scope.showSubmit = true;
    $scope.submittedImage = undefined;
    $scope.uploadImage = undefined;
    $scope.grade = "--";
    $scope.completed = "--";
    $scope.showComments = false;
    $scope.comments = "--";
    $scope.file = undefined;
    $scope.showSubmittedImage = false;
    $scope.name_ = undefined;
    $scope.name = undefined;

    $scope.upload = function () {
        
        
        //$scope.fileInfo = files;
        Upload.upload({
            url: '/' + $scope.name_ + '/file/upload',
            file: $scope.file
                    
        }).success(function (data, status, headers, config) {
            
            if (true === data.expired) {
                window.location.assign('/signIn');
            } else {
                $scope.uploadImage = data.image;
            }
                    
            //$scope.uploadImg = data;
        }).error(function (data, status, headers, config) {

        });
    };
    
    
    $scope.submit = function () {
        
        if ((null == $scope.file) || (undefined == $scope.file)) {
            alert("Please select a file first.");
            return;
        }
        
       $http({
			method : "POST",
			url : '/' + $scope.name_ + '/file/submit'
		    }).success(function(data, status, headers, config) {
                 if (true == data.expired) {
                    window.location.assign('/signIn');
                 } else {
                    $scope.submittedImage = data.image;
                    $scope.uploadImage = undefined;
                    $scope.file = undefined;
                    $scope.download = data.download;
                    $scope.subDetailTitle = "Submission Detail";
                    $scope.showSubmittedImage = true;
                 } 
                 
               
		    }).error(function(error) {

            
		    });

    };
    
    $scope.signOut = function () {

       $http({
			method : "POST",
			url : '/signOut'
		    }).success(function(data, status, headers, config) {
           
                window.location.assign('/signIn');
               
		    }).error(function(error) {

            
		    });

    };
    
    $http({
            method : "GET",
            url : '/session'
        }).success(function(data, status, headers, config) {
            console.log(data.expired);
            if ( true == data.expired ){
                window.location.assign('/signIn');
                return;
            } 
            $scope.name = data.name;
            $scope.name_ = (data.name).replace(" ", "_");

            $http({
                method : "GET",
                url : '/' + $scope.name_ + '/studentStatus'
            }).success(function(data, status, headers, config) {
                console.log(data.expired);
                if ( true == data.expired ){
                    window.location.assign('/signIn');
                    return;
                } 

                if ("unsubmit" != data.student.status) {
                    console.log(data);
                    console.log("!submitted");
                    console.log(data.student.image_name);
                    console.log(data.student.zip_name);
                    $scope.uploadImage = undefined;
                    $scope.submittedImage = data.student.image_name;
                    $scope.download = data.student.zip_name;
                    $scope.subDetailTitle = "Submission Detail";
                    $scope.showSubmittedImage = true;
                }


                if ("graded" == data.student.status) {
                    console.log("graded");
                    $scope.showSubmit = false;
                    $scope.grade = data.student.points;
                    $scope.completed = data.student.completed;
                    $scope.showComments = true;
                    $scope.comments = data.student.comments;
                }

                console.log($scope.showSubmittedImage);


            }).error(function(error) {


            });
                   

        }).error(function(error) {


        });
    
    
    
    

    
});