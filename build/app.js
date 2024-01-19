"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _database = _interopRequireDefault(require("./database"));
var _package = _interopRequireDefault(require("../package.json"));
var _cors = _interopRequireDefault(require("cors"));
var _tablesRoutes = _interopRequireDefault(require("./routes/tables.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
var _ordersRoutes = _interopRequireDefault(require("./routes/orders.routes.js"));
var _platesRoute = _interopRequireDefault(require("./routes/plates.route.js"));
var _clientRoute = _interopRequireDefault(require("./routes/client.route.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.set('pkg', _package["default"]);
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});

// Conectar la DB
_dotenv["default"].config();
(0, _database["default"])();

// Habilitar Cors
var opcionesCors = {
  origin: [process.env.FRONTEND_URL, process.env.EMULATOR_URL]
};
app.use((0, _cors["default"])(opcionesCors));

// Rutas de Usuario y Auth
app.use("/api/auth", _authRoutes["default"]);
app.use("/api/users", _userRoutes["default"]);

// Rutas
app.use('/api/tables', _tablesRoutes["default"]);
app.use('/api/orders', _ordersRoutes["default"]);
app.use('/api/plates', _platesRoute["default"]);
app.use('/api/clients', _clientRoute["default"]);
var _default = exports["default"] = app;