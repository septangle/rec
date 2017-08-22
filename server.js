var httpProxy = require("http-proxy");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var session = require('express-session');
var path = require('path');
var fsExtra = require('fs-extra');
const loki = require('lokijs');
const uuidv4 = require('uuid/v4');
var Q = require('q');
var api = require('./api');
var db = new loki("unre.db", {
    autoload: true,
    autosave: true,
    autosaveInterval: 1000,
    autoloadCallback : databaseInitialize,
});

var app = this.app = express();
app.use("/", express.static("./"));
app.use("/upload/images", express.static("./temp/Images"));
app.use(morgan("tiny"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 }}));

var uploadFolder = path.resolve("./temp/Images");
fsExtra.ensureDirSync(uploadFolder);

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        fsExtra.ensureDirSync(path.resolve(uploadFolder,req.params.id));
        callback(null, path.resolve(uploadFolder,req.params.id));
    },
    filename: function(req, file, callback) {
        callback(null,file.originalname);
    }
});
var upload = multer({
    storage: Storage
}).array("file");


function databaseInitialize() {
    var scans = db.getCollection("scans") || db.addCollection("scans");

    if(db.getCollection("users") ){
        var users = db.getCollection("users")
    }else{
        var users = db.addCollection("users");
        users.insert({"tel":"demo","password":"123",id:uuidv4()});
    }



    app.post('/photo-web/member/login.do', function(req, res){
        var user = req.body.photoMemberDto;
        user = users.find({tel:user.tel, password:user.password});
        if(user.length){
            req.session.user = user[0];
            res.json({photoMemberDto:user});
            res.end();
        }else{
            res.sendStatus(400);
        }
    });

    app.post('/photo-web/member/register.do', function(req, res){
        var user = req.body.photoMemberDto;
        user.id = uuidv4();
        user = users.insert(user);
        console.log(users.find({}));
        res.json({photoMemberDto:user});
        res.end();
        console.log(req.session.user);
    });

    app.use("/",function (req,res,next) {
        if(!req.session.user){
            res.sendStatus(401);
        }else{
            next();
        }
    });

    app.get('/photo-web/member/current', function(req, res){
        var user = req.session.user;
        if(user){
            res.json({photoMemberDto:user});
            res.end();
        }else{
            res.sendStatus(401);
        }
    });

    app.get('/photo-web/scan/',function (req,res) {
        var user = req.session.user;
        var list = scans.find({userId:user.id});
        Q.all(list.map(function (scan) {
            return api.scanStatus(scan.id).then(function (status) {
                console.log(status);
                scan.status = status;
                return scan;
            })
        })).then(function (list) {
            var status = req.query.status
            if(status){
                status = status.split(',')
                list = list.filter(function(scan){
                    return status.indexOf(scan.status.status)>=0;
                })
            }
            res.json(list);
            res.end();
        },function(err){
            res.status(500);
            res.json(err);
            res.end();
        })
    })

    app.post('/photo-web/scan/',function (req,res) {
        var user = req.session.user;
        var title = req.body.title;
        api.addScan(title).then(function (scanId) {
            scans.insert({userId:user.id,id:scanId, title: title , photos:[]});
            res.json({id:scanId});
            res.end();
        },function (err) {
            res.sendStatus(500);
            res.json(err.error);
            res.end();
        });
    })

    app.get('/photo-web/scan/:id', function (req, res) {
        var user = req.session.user;
        var scan = scans.find({id:req.params.id})[0];
        if(scan){
            api.scanStatus(scan.id).then(function (status) {
                scan.status = status;
                return scan;
            }).then(function (scan) {
                res.json(scan);
                res.end();
            })
        }else{
            res.sendStatus(404);
        }
    });

    app.get('/photo-web/scan/:id', function (req, res) {
        scans.remove({id:req.params.id});
        res.sendStatus(200);
    });

    app.post('/photo-web/scan/:id/images', upload, function (req, res) {
        var files = req.files;
        var user = req.session.user;
        var scan = scans.find({id:req.params.id})[0];
        files.forEach(function (f) {
            scan.photos.push({
                image:path.join('/upload/images',path.relative(uploadFolder,f.path)),
                $dataPath:f.path,
            })
            scans.update(scan);
        })


        console.log(req.body);
        res.json(req.body);

    });


    app.post('/photo-web/scan/:id/startProcess', function (req, res) {
        req.params.id
        var user = req.session.user;
        var scan = scans.find({id:req.params.id})[0];
        var files = scan.photos.map(function(p){
            return p.$dataPath
        })
        if(!files.length){
            res.json({error:'no images'});
            res.status(400);
            res.end();
        }else{
            api.addPics(scan.id,files).then(function(){
                return api.startProcessing(scan.id)
            }).then(function(){
                res.json({});
                res.status(200);
                res.end();
            },function(err){
                res.status(500);
                res.json({error:err});
                res.end();
            })
        }

    });



    var server = app.listen(3000, function() {
    });
}


