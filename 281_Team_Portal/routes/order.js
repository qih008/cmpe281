/*jslint node: true */
'use strict';
var request = require('request'),
    APIUrl = "http://ec2-54-183-154-124.us-west-1.compute.amazonaws.com:8000/",
    APIUrl2 = "http://127.0.0.1:5000/",
    timestamp = require('time-stamp'),
    /* for test only */
    orderSample =
        [{
            "price": 7.9,
            "items": [

                {
                    "name": "Cool Lime Starbucks Refreshers™ Beverage",
                    "ice": "Normal Ice",
                    "size": "Small",
                    "price": 3.45,
                    "number": 1
                },
                {
                    "name": "Pink Drink",
                    "ice": "Less Ice",
                    "size": "Medium",
                    "price": 4.45,
                    "number": 1
                }
            ],
            "_id": "1111111111111111111111"
        }];


exports.getOrders = function (req, res) {

    var options = {headers: {"Host": req.params.city}, url: APIUrl2 + req.params.city + "/orders"};
    
    
    console.log("1111111");
    
    
    request(options, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });
};



exports.getOrder = function (req, res) {

    var options = {headers: {"Host": req.params.city}, url: APIUrl2 + req.params.city + "/order/" + req.params.id};
    
    
    request(options, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });
};


exports.createOrder = function (req, res) {

    var url = APIUrl2 + req.params.city + "/order",
        order = req.body,
        body = {},
        options = {};
    
    order.timeStamp = timestamp('YYYY:MM:DD:HH:mm:ss:ms');
    options = {url: url, method: "POST", json: true, body: order, headers: {"Host": req.params.city}};
    
    
    request(options, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });
};


exports.updateOrder = function (req, res) {

    var url = APIUrl2 + req.params.city + "/order/" + req.params.id,
        body = req.body,
        options;
    
    
    delete body._id;
    options = {url: url, method: "PUT", json: true, body: body, headers: {"Host": req.params.city}};
    
    request(options, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });
};

exports.deleteOrder = function (req, res) {
    
    var url = APIUrl2 + req.params.city + "/order/" + req.params.id,
        options;
    
    options = {url: url, method: "DELETE", headers: {"Host": req.params.city}};
    

    request(options, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });
    
    
};

