"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var orderSchema = _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  table: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Table"
  },
  plates: [{
    _id: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Plate"
    },
    quantity: {
      type: Number
    }
  }],
  client: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Client"
  },
  date: {
    type: Date,
    required: true,
    "default": Date.now()
  },
  payment_method: {
    type: String
  },
  status: {
    type: String
  }
});

// Exportar Deporte y el Modelo a la DB
var Order = _mongoose["default"].model('Order', orderSchema);
var _default = exports["default"] = Order;