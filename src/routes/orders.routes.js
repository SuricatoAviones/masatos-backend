import { Router } from "express";
import * as ordersController from "../controllers/orders.controller";
import { authJwt } from "../middlewares";
const router = Router();


// Filtrar Ordenes por fecha
router.get('/filter/filter-date', authJwt.verifyToken, ordersController.filterOrderByDate);

// Rutas de ordenes
router.post('/', authJwt.verifyToken, ordersController.createOrder)
router.get('/', authJwt.verifyToken, ordersController.getOrders)
router.get('/:orderId', authJwt.verifyToken, ordersController.getOrderById)
router.put('/:orderId', authJwt.verifyToken, ordersController.updateOrderById)
router.delete('/:orderId', authJwt.verifyToken, ordersController.deleteOrderById)


// Definir la ruta para obtener todas las órdenes de un usuario específico
router.get('/users/:userId', authJwt.verifyToken, ordersController.getOrdersByUserId);
// Definir la ruta para obtener todas las órdenes de un cliente en específico
router.get('/clients/:clientId', authJwt.verifyToken, ordersController.getOrdersByClientId);




export default router;