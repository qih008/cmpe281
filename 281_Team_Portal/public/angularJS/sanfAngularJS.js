"use strict";
var app = angular.module('sanf', []);

console.log(angular.version);


app.controller('myCtrl', function ($scope, $http) {
    
    $scope.drinks = undefined;
    $scope.orders = undefined;
    $scope.showEditOrder = false;
    $scope.showCreateOrder = false;
    $scope.orderDetail = {};
    $scope.iceChoice =
        [
            {name: "Normal Ice", value: "Normal Ice"},
            {name: "Less Ice", value: "Less Ice"},
            {name: "No Ice", value: "No Ice"}
        ];
    
    $scope.sizeChoice =
        [
            {name: "Small", value: "Small"},
            {name: "Medium", value: "Medium"},
            {name: "Big", value: "Big"}
        ];
    $scope.sizePrice =
        [
            {size: "Small", price: 3.45},
            {size: "Medium", price: 4.45},
            {size: "Big", price: 5.45}
        
        ];
    $scope.newOrder = {};
    
    $scope.showOrder = function (order) {
        $scope.showCreateOrder = false;
        $scope.showEditOrder = true;
        $scope.orderDetail = JSON.parse(JSON.stringify(order));
        
    };
    
    $scope.showProduct = function (name) {
        $scope.showEditOrder = false;
        $scope.showCreateOrder = true;
        $scope.newOrder = {};
        $scope.newOrder.name = name;
        $scope.newOrder.price = 0;
        
    };
    
    $scope.hideOrder = function () {
        
        $scope.showCreateOrder = false;
        $scope.showEditOrder = false;
        $scope.orderDetail = {};
        $scope.newOrder = {};
    };
    
    $scope.change = function(order) {
        var i = 0;
        if ((undefined != order.number) && (undefined != order.size)) {

            for (i = 0; i < $scope.sizePrice.length; i++) {
                if (order.size === $scope.sizePrice[i].size) {
                    order.price = parseFloat(($scope.sizePrice[i].price * order.number).toFixed(2));
                }
            }
        }
            
    };
    
    $scope.createOrder = function (order) {
        //alert(JSON.stringify(order));
        $http({
			method : "POST",
			url : '/San_Francisco/order',
            data: order
		  }).success(function (response) {
             
             
             $scope.hideOrder();
             
             getOrders();
                 
                 
               
		  }).error(function (error) {

            
		  });
        
    };
    
    
    $scope.updateOrder = function (order) {
        //console.log("updateOrder: " + JSON.stringify(order));
         $http({
			method : "PUT",
			url : '/San_Francisco/order/' + order.id,
            data: order
		  }).success(function (response) {
             
             
             $scope.hideOrder();
             
             getOrders();
                 
                 
               
		  }).error(function (error) {

            
		  });
        
    };
    
    
    $scope.deleteOrder = function (order) {
        //console.log("deleteOrder: " + JSON.stringify(order));
         $http({
			method : "DELETE",
			url : '/San_Francisco/order/' + order.id
		  }).success(function(response) {
             
             $scope.hideOrder();
             
             getOrders();

		  }).error(function(error) {

            
		  });
        
    };
    
    
    
    $http({
            method : "GET",
            url : '/drinks'
		  }).success(function(response) {
                 
                 
                 $scope.drinks = response.drinks;
                 //console.log($scope.drinks);
                 
               
		  }).error(function(error) {

            
		  });
    
    function getOrders() {
        
        $http({
			method : "GET",
			url : '/San_Francisco/orders'
		  }).success(function(response) {
                 
                 //console.log(response);
                 $scope.orders = response;
                 //console.log("get all orders:"+ $scope.orders);
               
		  }).error(function(error) {

            
		  });
        
    }
    
    getOrders();
    
    
    
    
    
    
});