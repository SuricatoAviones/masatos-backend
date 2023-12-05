import { Router } from "express";
import * as ordersController from "../controllers/orders.controller";
import { authJwt } from "../middlewares";
const router = Router();

// Rutas de Mesas
router.post('/', ordersController.createOrder)
router.get('/', ordersController.getOrders)
router.get('/:orderId', ordersController.getOrderById)
router.put('/:orderId', ordersController.updateOrderById)
router.delete('/:orderId', ordersController.deleteOrderById)


export default router;