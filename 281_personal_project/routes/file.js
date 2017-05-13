/*jslint node: true */

var formidable = require('formidable'),
    cmd = require('child_process'),
    sql = require('./sql'),
    zip_name = "test4.zip",
    image_name = "output.png",
    testDestPath = __dirname + '/../test4/';

function getcmd(name) {
    
    console.log(name);
    if ("Qing Huang" === name) { 
        console.log("./umlparser " + testDestPath + " " + image_name);
        return "./umlparser " + testDestPath + " " + image_name; 
    }
    
    if ("Mengze Rao" === name) { 
        console.log("java -jar umlparser.jar " + testDestPath + " " + __dirname + '/' + image_name);
        return "java -jar umlparser.jar " + testDestPath + " " + __dirname + '/' + image_name; 
    }
    
    if (("Han chen" === name) || ("Jiarui Hu" === name)) {
        console.log("java umlparser " + testDestPath + " " + image_name);
        return "java umlparser " + testDestPath + " " + image_name; 
    }
}

exports.upload = function (req, res, next) {
    "use strict";
    
    var form = new formidable.IncomingForm(),
        fileRelativePath = '/../public/uploadsTmp/',
        imageDesAbsolutePath = __dirname + '/../public/imageTmp/',
        fileAbsolutePath = "",
        fileNameWithoutExtension = "",
        jsonResponse = {},
        cmdLine = "";
    if ((null === req.session.name) || (undefined === req.session.name)) {
        res.send({"expired": true});
        return;
    }

    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.parse(req);
    
    form.on('fileBegin', function (name, file) {
        console.log("begin");
        fileAbsolutePath = __dirname + fileRelativePath;
        //zip_name = file.name;
        fileNameWithoutExtension = file.name.split('.').shift();
        file.path = fileAbsolutePath + zip_name;

        console.log("begin--end");

    });
    
    form.on('end', function () {
        console.log('upload end ');

        
        cmd.execSync("unzip -o " + fileAbsolutePath + zip_name + " -d " + testDestPath);
        cmdLine = getcmd(req.session.name);
        cmd.execSync(cmdLine);
        cmd.execSync("cp -f " + image_name + " " + imageDesAbsolutePath);
        
        jsonResponse = {image: "/imageTmp/" + image_name};
            

        res.send(jsonResponse);
    });
    
    console.log('final');
    
};

exports.submit = function (req, res) {
    "use strict";
    
    var fileTmpPath = __dirname + '/../public/uploadsTmp/',
        imageTmpPath = __dirname + '/../public/imageTmp/',
        filePath = __dirname + '/../public/uploads/',
        imagePath = __dirname + '/../public/image/',
        updateJsonArray,
        json_response = {};
    
    if ((null === req.session.name) || (undefined === req.session.name)) {
        res.send({"expired": true});
        return;
    }
    
    updateJsonArray = [{"image_name": image_name}, {"zip_name": zip_name}, {"status": "submitted"}, {"name": req.session.name}];
    
    //cmd.execSync("rm -rf " + filePath);
    //cmd.execSync("rm -rf " + imagePath);
    
    cmd.execSync("cp -f " + fileTmpPath + zip_name + " " + filePath);
    cmd.execSync("cp -f " + imageTmpPath + image_name + " " + imagePath);

    //cmd.execSync("rm -rf " +fileTmpPath);
    //cmd.execSync("rm -rf " + imageTmpPath);
    
    sql.update("TENANT_DATA", updateJsonArray, function (err, rows) {
        
        console.log(err);
        if (null === err) {
            console.log("11111");
            json_response = {"image": "/image/" + image_name, "download": zip_name};
        }
        
        res.send(json_response);
    });
    
    
};

exports.download = function (req, res) {
    "use strict";
    
    var filepath = __dirname + "/../public/uploads/" + req.params.filename;
    res.download(filepath);
};

exports.fileView = function (req, res) {
    "use strict";

    res.render("file");
    
};