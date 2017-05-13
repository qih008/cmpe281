/*jslint node: true */
var sql = require('./sql');

exports.students = function (req, res) {
    "use strict";
    res.render('students');
};



exports.studentsList = function (req, res) {
    "use strict";
    
    var queryJsonArray = [{ "role": "student"}],
        json_response = {};
    
    if ((null === req.session.name) || (undefined === req.session.name)) {
        res.send({"expired": true});
        return;
    }
    
    sql.select("TENANT_DATA", queryJsonArray, function (err, rows) {
        console.log(rows);
        if (null === err) {
            
            json_response = {"students": rows};
            res.send(json_response);
        } else {
            console.log(err);
        }
        
        
    });
};

exports.grade = function (req, res) {
    "use strict";
    var updateJsonArray = [{"points": req.body.points}, {"comments": req.body.comments}, {"status": "graded"}, {"completed": req.body.completed}, {"name": req.body.name}];
    console.log(req.body);
    if ((null === req.session.name) || (undefined === req.session.name)) {
        res.status(400).json({expired: true});
        return;
    }
    
    sql.update("TENANT_DATA", updateJsonArray, function (err, rows) {
        
        res.send({});
    });
};

exports.student = function (req, res) {
    "use strict";
    
    var queryJsonArray = [{ "role": "student"}, {"name": req.params.name}],
        json_response = {};
        
    if ((null === req.session.name) || (undefined === req.session.name)) {
        res.render('signIn');
        return;
    }
    
    queryJsonArray[1].name = (queryJsonArray[1].name).replace("_", " ");
    
    sql.select("TENANT_DATA", queryJsonArray, function (err, rows) {
        console.log(rows);
        if (null === err) {
            
            if ("unsubmit" !== rows[0].status) { rows[0].image_name = "/image/" + rows[0].image_name; }
            res.render('student', {student: rows[0]});
        } else {
            console.log(err);
        }
    });

    
};

exports.studentStatus = function (req, res) {
    "use strict";
    
    
    var queryJsonArray;
        
    if ((null === req.session.name) || (undefined === req.session.name)) {
        res.send({expired: true});
        return;
    }
    
    queryJsonArray = [{ "role": "student"}, {"name": req.session.name}];
    
    sql.select("TENANT_DATA", queryJsonArray, function (err, rows) {
        console.log(rows);
        if (null === err) {
            
            if ("unsubmit" !== rows[0].status) { rows[0].image_name = "/image/" + rows[0].image_name; }
            res.send({student: rows[0]});
        } else {
            console.log(err);
        }
    });
    
    
};

exports.session = function (req, res) {
    "use strict";
    
    if ((null === req.session.name) || (undefined === req.session.name)) {
        res.send({expired: true});
        return;
    }
    
    res.send({name: req.session.name});
    
};
