import { Router } from "express";
import * as tablesController from "../controllers/tables.controller";
import { authJwt } from "../middlewares";
const router = Router();

// Rutas de Mesas
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], tablesController.createTable) // Admin
router.get('/',authJwt.verifyToken,tablesController.getTables) // Moderador y Admin
router.get('/:tableId', authJwt.verifyToken,tablesController.getTableById) // Moderador y Admin
router.put('/:tableId',authJwt.verifyToken, tablesController.updateTableById) // Admin
router.delete('/:tableId',[authJwt.verifyToken, authJwt.isAdmin],  tablesController.deleteTableById) // Admin





export default router;