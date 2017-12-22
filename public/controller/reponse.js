"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 返回客户端对象
 *
 * @export
 * @class response
 */
var response = /** @class */ (function () {
    function response(props) {
        this.status = props.status || 200;
        this.msg = props.msg || "success";
        this.data = props.data || {};
    }
    return response;
}());
exports.default = response;
