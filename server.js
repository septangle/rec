var httpProxy = require("http-proxy");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer();
var session = require('express-session');
const loki = require('lokijs');
const uuidv4 = require('uuid/v4');
var Q = require('q');
var api = require('./api');
var db = new loki("unre.db");
var app = this.app = express();
app.use(morgan("tiny"));
app.use("/", express.static("./"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 }}));




var users = db.addCollection("users");
var scans = db.addCollection("scans");


users.insert({"tel":"demo","password":"123",id:uuidv4()});




app.use("/", express.static("./"));


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

app.get('/photo-web/scans/',function (req,res) {
    var user = req.session.user;
    var list = scans.find({userId:user.id});
    Q.all(list.map(function (scan) {
        return api.scanStatus(scan.id).then(function (status) {
            console.log(status);
            scan.status = status;
            return scan;
        })
    })).then(function (list) {
        res.json(list);
        res.end();
    })
})

app.post('/photo-web/scans/',function (req,res) {
    var user = req.session.user;
    var title = req.body.title;
    api.addScan(title).then(function (scanId) {
        scans.insert({userId:user.id,id:scanId, title: title , photos:[]});
        res.json({id:scanId});
        res.end();
    },function (err) {
        res.setStatus(500);
        res.json(err.error);
        res.end();
    });
})

app.get('/photo-web/scans/:id', function (req, res) {
    var user = req.session.user;
    var scan = scans.find({id:req.params.id})[0];
    if(scan){
        api.scanStatus(scan.id).then(function (status) {
            scan.status = status.status;
            return scan;
        }).then(function (scan) {
            res.json(scan);
            res.end();
        })
    }else{
        res.setStatus(404);
        res.end();
    }

});


app.post('/scans/:id/images/', upload.array(), function (req, res) {
    console.log(req.body);
    res.json(req.body);

});



var server = app.listen(3000, function() {
});