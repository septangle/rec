var httpProxy = require("http-proxy");
var express = require("express");
var morgan = require("morgan");

var app = this.app = express();
app.use(morgan("tiny"));
app.use("/", express.static("./"));

var options = {
    path:"/photo-web",
    target:"http://192.168.0.109:8080/photo-web",
    port:3000,
}


var proxyOptions = {
    target: options.target,
    ignorePath: require("path").extname(require("url").parse(options.target).path),  //avoid append / for files
    headers: {
        host: "",
        Referer: ""
    },
};
if(options.target.indexOf("https:")>=0) {
    proxyOptions.agent = https.globalAgent;
    proxyOptions.secure = false;
}
var p = new httpProxy.createProxyServer(proxyOptions);

p.on("proxyReq", function(proxyReq, req, res, proxyOptions) {
    console.log("request proxy", req.originalUrl);
    options.cookie && proxyReq.setHeader("cookie", options.cookie);
});

app.use(options.path, function(req, res, next) {
    var d = require("domain").create();
    d.on("error", function(er) {
        console.error("error", er);
        res.status(500).end();
    });
    d.run(function() {
        p.web(req, res);
    });
});

var server = app.listen(options.port, function() {
});