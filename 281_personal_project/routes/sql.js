/*jslint node: true */


var mysql = require('mysql'),
    
    pool = mysql.createPool({
        connectionLimit : 600, //important
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : '281_personal_project',
        port     : 3306
    }), /*
    pool = mysql.createPool({
        connectionLimit : 600, //important
        host     : 'mysql.cuxus3h7zi3w.us-west-1.rds.amazonaws.com',
        user     : 'root',
        password : 'rootroot',
        database : '281_Personal_Project',
        port     : 3306
    }), */
    columns = {"id": "COLUMN_1", "role": "COLUMN_2", "name": "COLUMN_3", "password": "COLUMN_4", "status": "COLUMN_5",
               "image_name": "COLUMN_6", "zip_name": "COLUMN_7", "points": "COLUMN_8", "completed": "COLUMN_9", "comments": "COLUMN_10"},
    columns_reverse = {"COLUMN_1": "id", "COLUMN_2": "role", "COLUMN_3": "name", "COLUMN_4": "password", "COLUMN_5": "status",
               "COLUMN_6": "image_name", "COLUMN_7": "zip_name", "COLUMN_8": "points", "COLUMN_9": "completed", "COLUMN_10": "comments",
               "TENANT_ID": "TENANT_ID", "TENANT_TABLE": "TENANT_TABLE", "RECORD_ID": "RECORD_ID"};


function operateMySQL(queryStr, json, callback) {
    "use strict";
 
    pool.getConnection(function (err, connection) {
        var json_err = {};
        
        if (err) {
            
            console.log(err);
            connection.release();
            if (null !== callback) {
                json_err = ({"result": "ERR", "status" : "Error in connection database"});
                callback(json_err, null);
            }
            return;
        }

        connection.query(queryStr, json, function (err, rows) {
            connection.release();
            console.log(err);
            if (!err) {
                if (null !== callback) {callback(null, rows); }
            }
        });
    });
}

function changeColumns(jsonArray) {
    "use strict";
    
    var key,
        i = 0,
        json;
    
    for (i = 0; i < jsonArray.length; i = i + 1) {
        json = jsonArray[i];
        
        for (key in json) {
            
            if (json.hasOwnProperty(key)) {
                json[columns[key]] = json[key];
                delete json[key];
            }
        }
        
    }
}

function reverseColumns(jsonArray) {
    "use strict";
    
    var key,
        i = 0,
        json;
    
    for (i = 0; i < jsonArray.length; i = i + 1) {
        json = jsonArray[i];
        
        for (key in json) {
            
            if (json.hasOwnProperty(key)) {
                json[columns_reverse[key]] = json[key];
                delete json[key];
            }
        }
        
    }
    
}


exports.select = function (table, queryJsonArray, callback) {
    "use strict";
    
    var queryStr = "select * from " + table + " where ?",
        i = 0;
    for (i = 0; i < Object.keys(queryJsonArray).length - 1; i = i + 1) { queryStr += " AND ?"; }
    changeColumns(queryJsonArray);
    
    console.log("select-----query");
    console.log(queryJsonArray);
    console.log(queryStr);
    
    
    operateMySQL(queryStr, queryJsonArray, function (err, rows) {
        if (null === err) { reverseColumns(rows); }
        
        callback(err, rows);
    });
};

exports.update = function (table, updateJsonArray, callback) {
    "use strict";
    
    var updateStr = "UPDATE " + table + " SET ?",
        i = 0;
    changeColumns(updateJsonArray);
    
    for (i = 0; i < Object.keys(updateJsonArray).length - 2; i = i + 1) { updateStr += ", ?"; }
    
    updateStr += " where ?";
    
    console.log("update-----query");
    console.log(updateJsonArray);
    console.log(updateStr);
    
    operateMySQL(updateStr, updateJsonArray, callback);
};

