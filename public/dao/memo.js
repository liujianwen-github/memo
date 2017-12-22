"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
// let DB_PATH='mongodb://memo:memo@47.104.7.232:27017/memo'
var DB_PATH = 'mongodb://memo:memo@127.0.0.1:27017/memo';
mongoose.connect(DB_PATH, {
    reconnectTries: 30,
    useMongoClient: true
});
var connection = mongoose.connection;
connection.on('open', function () {
    console.log("mongodb is connected");
});
connection.on('error', function (e) {
    console.log("mongodb is error " + e);
});
exports.default = mongoose;
