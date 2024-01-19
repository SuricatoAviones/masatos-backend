"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var plateSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String
  },
  disponibility: {
    type: Boolean,
    "default": true,
    required: true
  }
});

// Exportar Deporte y el Modelo a la DB
var Plate = _mongoose["default"].model('Plate', plateSchema);
var _default = exports["default"] = Plate;