import { Router } from "express";
import * as ordersController from "../controllers/orders.controller";
import { authJwt } from "../middlewares";
const router = Router();

// Rutas de ordenes
router.post('/', ordersController.createOrder)
router.get('/', ordersController.getOrders)
router.get('/:orderId', ordersController.getOrderById)
router.put('/:orderId', ordersController.updateOrderById)
router.delete('/:orderId', ordersController.deleteOrderById)


// Definir la ruta para obtener todas las órdenes de un usuario específico
router.get('/users/:userId', ordersController.getOrdersByUserId);
// Definir la ruta para obtener todas las órdenes de un cliente en específico
router.get('/clients/:clientId', ordersController.getOrdersByClientId);

export default router;