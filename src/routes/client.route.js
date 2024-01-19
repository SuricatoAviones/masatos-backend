import { Router } from "express";
import * as clientController from "../controllers/client.controller";
import { authJwt } from "../middlewares";
const router = Router();

// Rutas de Mesas
router.post('/', clientController.createClient)
router.get('/', clientController.getClients)
router.get('/:clientId', clientController.getClientById)
router.put('/:clientId', clientController.updateClientById)
router.delete('/:clientId', clientController.deleteClientById)


export default router;