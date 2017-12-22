"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var reponse_1 = require("./controller/reponse");
var memoController_1 = require("./controller/memoController");
var app = express();
app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
// 添加一条备忘录
app.post('/memo', function (req, res) {
    memoController_1.default.addInfo(req, res);
});
// 查询所有备忘录
app.get('/memos', function (req, res) {
    memoController_1.default.getAll(res);
});
// 单条查询
app.get('/memo', function (req, res) {
    memoController_1.default.getInfo(req, res);
});
// 修改内容
app.put('/memo', function (req, res) {
    memoController_1.default.updateInfo(req, res);
});
// 删除一条
app.delete('/memo', function (req, res) {
    memoController_1.default.deleteInfo(req, res);
});
app.get('/test', function (req, res) {
    var data = new reponse_1.default({
        status: 1,
        msg: "测试接口",
        data: {}
    });
    console.log(data);
    res.send(data);
});
var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://" + host + ":" + port);
});
