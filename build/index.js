"use strict";

var _app = _interopRequireDefault(require("./app"));
var _initialSetup = require("./libs/initialSetup");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = process.env.PORT || 3000;
_app["default"].listen(port, "0.0.0.0");
console.log('Server listen on port', port);