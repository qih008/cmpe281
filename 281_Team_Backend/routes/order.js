/*jslint node: true */
"use strict";

var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    mongoURL = "mongodb://localhost:27009/Starbucks",
    db,
    collectionName = "Starbucks";

MongoClient.connect(mongoURL, function (err, database) {

    if (err) { throw err; }

    db = database;
});


exports.getOrder = function (req, res) {
    
    var id = req.params.id,
        collection = db.collection(collectionName);
    
    collection.findOne({_id: new ObjectID(id)}, function (err, rows) {
        
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            res.send(rows);
        }

    });
};


exports.getOrders = function (req, res) {
    
    var collection = db.collection(collectionName);
    
    collection.find({}).sort({timeStamp: 1}).toArray(function (err, rows) {
        
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            res.send({orders: rows});
        }

    });
};

exports.updateOrder = function (req, res) {
    
    var id = req.params.id,
        order = req.body,
        collection = db.collection(collectionName);
    
    console.log("update a order");
    console.log(order);
    
    collection.findOneAndUpdate({_id: new ObjectID(id)}, {$set: order}, {returnOriginal: false}, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            res.send(rows.value);
        }
    });

};

exports.createOrder = function (req, res) {
    
    var order = req.body,
        collection = db.collection(collectionName);
    
    collection.insert(order, function (err, rows) {
        
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            res.send(rows.ops[0]);
        }
        
    });
};

exports.deleteOrder = function (req, res) {
    
    var id = req.params.id,
        collection = db.collection(collectionName);
    
    console.log("delete a order in backend");
    
    collection.deleteOne({_id: new ObjectID(id)}, function (err, rows) {
        
        console.log("delete call back in back end");
        console.log(rows);
        if (err) {
            console.log(err);
        } else {
            
            res.send({status: 200, msg: "delete success"});
        }
    });
};
