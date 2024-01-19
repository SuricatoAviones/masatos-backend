"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var tableSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: Number
  },
  disponibility: {
    type: Boolean,
    "default": true
  }
});

// Exportar Deporte y el Modelo a la DB
var Table = _mongoose["default"].model('Table', tableSchema);
var _default = exports["default"] = Table;