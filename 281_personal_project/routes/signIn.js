/*jslint node: true */
var crypto = require('crypto'),
    sql = require('./sql');

exports.signIn = function (req, res) {
    "use strict";
    
    var json_responses,
        passwordMD5 = crypto.createHash('md5').update(req.body.password).digest("hex"),
        queryJson = [{"name": req.body.name}, {"password": passwordMD5}, { "role": req.body.role }];
    
    console.log("signIn");
    console.log(req.session);
    
    sql.select("TENANT_DATA", queryJson, function (err, rows) {
           
        if (null !== err) {
            console.log(err);
        } else {
            if (rows.length > 0) {
                req.session.name = req.body.name;
                req.session.role = req.body.role;
                json_responses = {"checked": true};
            } else {
                json_responses = {"checked": false};
            }
        }
            
        res.send(json_responses);
            
    });
    
};


exports.signInView = function (req, res) {
    "use strict";
    
    res.render('signIn');
};