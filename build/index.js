"use strict";

var _app = _interopRequireDefault(require("./app"));
var _initialSetup = require("./libs/initialSetup");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(3000);
console.log('Server listen on port', 3000);