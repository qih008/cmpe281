/*jslint node: true */
'use strict';
var request = require('request'),
    APIUrl = "http://localhost:4000/",
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

    var url = APIUrl + req.params.city + "/orders";
    
    
    console.log("1111111");
    
    res.send({orders: orderSample});
    
    /*
    
    request({url: url}, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });   */
};



exports.getOrder = function (req, res) {

    var url = APIUrl + req.params.city + "/order/" + req.params.id;
    
    console.log("22222");
    
    res.send({orders: orderSample});
    
    
    /*
    
    request({url: url}, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    }); */
};


exports.createOrder = function (req, res) {

    var url = APIUrl + req.params.city + "/order",
        order = req.body,
        body = {};
    
    body.order = order;
    body.timeStamp = timestamp('YYYY:MM:DD:HH:mm:ss:ms');
    res.send();
    
    /*
    
    request({url: url, method: "POST", json: true, body: body}, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    }); */
};


exports.updateOrder = function (req, res) {

    var url = APIUrl + req.params.city + "/order/" + req.params.id,
        body = req.body;
    
    
    console.log("Update Order");
    
    res.send();
    
    /*
    
    request({url: url, method: "PUT", json: true, body: body}, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });  */
};

exports.deleteOrder = function (req, res) {
    
    var url = APIUrl + req.params.city + "/order/" + req.params.id;
    res.send();
    
    /*
    request({url: url, method: "DELETE"}, function (err, response, body) {
        
        if (err) {
            console.log(err);
        } else {
            res.send(body);
        }
    });  */
    
    
};

