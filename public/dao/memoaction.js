"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as mongoose from 'mongoose'
var memo_1 = require("./memo");
var t1 = new Date().getTime();
var memoSchema = new memo_1.default.Schema({
    title: { type: String },
    content: { type: String, default: "没有内容" },
    createTime: { type: Number },
    updateTime: { type: Number }
});
var memoModel = memo_1.default.model('memos', memoSchema);
exports.default = {
    /**
     * 添加一条数据
     *
     * @param {*} data
     * @returns Promise对象
     */
    add: function (data) {
        console.log("\u51C6\u5907\u6DFB\u52A0\u6570\u636E:" + JSON.stringify(data));
        if (typeof data.createTime === 'undefined') {
            data.createTime = new Date().getTime();
        }
        console.log(typeof data.createTime);
        var model = new memoModel(data);
        console.log(model);
        console.log(model.save(data));
        return model.save(data); //promise
    },
    /**
     * 获取全部数据
     *
     * @param {*} callback
     */
    getAll: function (callback) {
        memoModel.find({}, callback);
    },
    /**
     * 按id查询
     *
     * @param {{id:String}} data
     * @param {*} callback
     */
    findById: function (data, callback) {
        console.log(data.id);
        memoModel.findById({ _id: data.id }, callback);
    },
    /**
     * 根据id更新一条文档
     *
     * @param {{id:string,content:string}} data
     * @param {Function} callback
     */
    updateMemo: function (data, callback) {
        memoModel.update({ _id: data.id }, { content: data.content, updateTime: data.updateTime }, { multi: true }, callback);
    },
    deleteItem: function (id, callback) {
        memoModel.remove({ _id: id }, callback);
    }
};
