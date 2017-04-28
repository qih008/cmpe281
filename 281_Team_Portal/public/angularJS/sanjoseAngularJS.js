"use strict";
var app = angular.module('sanJose', []);

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
    
    $scope.changeInCreate = function(order) {
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
        
        $http({
			method : "POST",
			url : '/San Jose/order',
            body: order
		  }).success(function (response) {
             
             
             $scope.hideOrder();
             
             getOrders();
                 
                 
               
		  }).error(function (error) {

            
		  });
        
    };
    
    
    $scope.updateOrder = function (order) {
        
         $http({
			method : "PUT",
			url : '/San Jose/order/' + order._id,
            body: order
		  }).success(function (response) {
             
             
             $scope.hideOrder();
             
             getOrders();
                 
                 
               
		  }).error(function (error) {

            
		  });
        
    };
    
    
    $scope.deleteOrder = function (order) {
        
         $http({
			method : "DELETE",
			url : '/San Jose/order/' + order._id
		  }).success(function(response) {
             
             $scope.hideOrder();
             
             getOrders();

		  }).error(function(error) {

            
		  });
        
    };
    
    
    
    $scope.changeInUpdate = function (item, order) {
        
        var i = 0;
        
        for (i = 0; i < $scope.sizePrice.length; i++) {
            if (item.size === $scope.sizePrice[i].size) {
                item.price = parseFloat(($scope.sizePrice[i].price * item.number).toFixed(2));
            }
        }
        
        order.price = 0;
        
        for (i = 0; i < order.items.length; i++) {
            order.price += order.items[i].price;
        }
        
        order.price = order.price.toFixed(2);
        
        return;
    };
    
    
    $http({
            method : "GET",
            url : '/drinks'
		  }).success(function(response) {
                 
                 
                 $scope.drinks = response.drinks;
                 console.log($scope.drinks);
                 
               
		  }).error(function(error) {

            
		  });
    
    function getOrders() {
        
        $http({
			method : "GET",
			url : '/San Jose/orders'
		  }).success(function(response) {
                 
                 
                 $scope.orders = response.orders;
                 console.log($scope.orders);
               
		  }).error(function(error) {

            
		  });
        
    }
    
    getOrders();
    
    
    
    
    
    
});