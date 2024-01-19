"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var clientSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

// Exportar Deporte y el Modelo a la DB
var Client = _mongoose["default"].model('Client', clientSchema);
var _default = exports["default"] = Client;