"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var ordersController = _interopRequireWildcard(require("../controllers/orders.controller"));
var _middlewares = require("../middlewares");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();

// Filtrar Ordenes por fecha
router.get('/filter/filter-date', _middlewares.authJwt.verifyToken, ordersController.filterOrderByDate);

// Rutas de ordenes
router.post('/', _middlewares.authJwt.verifyToken, ordersController.createOrder);
router.get('/', _middlewares.authJwt.verifyToken, ordersController.getOrders);
router.get('/:orderId', _middlewares.authJwt.verifyToken, ordersController.getOrderById);
router.put('/:orderId', _middlewares.authJwt.verifyToken, ordersController.updateOrderById);
router["delete"]('/:orderId', _middlewares.authJwt.verifyToken, ordersController.deleteOrderById);

// Definir la ruta para obtener todas las órdenes de un usuario específico
router.get('/users/:userId', _middlewares.authJwt.verifyToken, ordersController.getOrdersByUserId);
// Definir la ruta para obtener todas las órdenes de un cliente en específico
router.get('/clients/:clientId', _middlewares.authJwt.verifyToken, ordersController.getOrdersByClientId);
var _default = exports["default"] = router;