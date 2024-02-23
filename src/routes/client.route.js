import { Router } from "express";
import * as clientController from "../controllers/client.controller";
import { authJwt } from "../middlewares";
const router = Router();

// Rutas de Mesas
router.post('/', /* authJwt.verifyToken, */clientController.createClient)
router.get('/', /* authJwt.verifyToken */clientController.getClients)
router.get('/:clientId',/*  authJwt.verifyToken, */clientController.getClientById)
router.put('/:clientId', /* authJwt.verifyToken, */clientController.updateClientById)
router.delete('/:clientId', /* authJwt.verifyToken, */clientController.deleteClientById)


export default router;