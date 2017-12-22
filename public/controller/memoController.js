"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memoaction_1 = require("../dao/memoaction");
var url = require("url");
var reponse_1 = require("./reponse");
var mongoose_1 = require("mongoose");
exports.default = {
    /**
     * 直接调用了dao层
     *
     */
    addInfo: function (req, res) {
        // console.log(memoData.add(data))
        var data = req.body;
        memoaction_1.default.add(data).then(function (e) {
            res.send(new reponse_1.default({
                msg: "添加成功",
                data: {}
            }));
        }).catch(function (err) {
            console.log("error:" + err);
            res.send(new reponse_1.default({
                status: 410,
                msg: err,
                data: {}
            }));
            throw new mongoose_1.Error("添加数据失败");
        });
    },
    deleteInfo: function (req, res) {
        var id = req.body.id;
        memoaction_1.default.findById({ id: id }, function (err, succ) {
            if (err) {
                res.send(new reponse_1.default({
                    status: 410,
                    msg: "当前id对应的笔记不存在，请检查参数",
                    data: {}
                }));
                throw new mongoose_1.Error('查询参数不存在错误');
            }
            else {
                memoaction_1.default.deleteItem(id, function (err) {
                    if (err) {
                        res.send(new reponse_1.default({
                            status: 500,
                            msg: "数据库出错",
                            data: {}
                        }));
                        throw new mongoose_1.Error('删除数据错误');
                    }
                    else {
                        res.send(new reponse_1.default({
                            msg: "删除成功",
                            data: {}
                        }));
                    }
                });
            }
        });
    },
    updateInfo: function (req, res) {
        console.log(req.body);
        var data = req.body;
        if (typeof data.updateTime === 'undefined')
            data.updateTime = new Date().getTime();
        memoaction_1.default.updateMemo(data, function (err, raw) {
            if (err) {
                res.send(new reponse_1.default({
                    status: 410,
                    msg: err,
                    data: {}
                }));
                throw new mongoose_1.Error("更新文档失败");
            }
            else {
                res.send(new reponse_1.default({
                    msg: "更新成功",
                    data: {}
                }));
            }
        });
    },
    getInfo: function (req, res) {
        var arg = url.parse(req.url, true).query;
        console.log(arg.id);
        if (arg.id) {
            memoaction_1.default.findById(arg, function (err, data) {
                if (err) {
                    res.send(new reponse_1.default({
                        status: 410,
                        msg: "当前id对应的笔记不存在",
                        data: {}
                    }));
                    throw new mongoose_1.Error('获取笔记错误');
                }
                else {
                    console.log(data);
                    res.send(new reponse_1.default({
                        data: {
                            item: data
                        }
                    }));
                }
            });
        }
    },
    getAll: function (res) {
        memoaction_1.default.getAll(function (err, memos) {
            if (err) {
                res.send(new reponse_1.default({
                    status: 410,
                    msg: "参数错误",
                    data: {}
                }));
                throw new mongoose_1.Error('单条查询错误');
            }
            else {
                res.send(new reponse_1.default({
                    data: {
                        list: memos
                    }
                }));
            }
        });
    }
};
// export default Memo 
