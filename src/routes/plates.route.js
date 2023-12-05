import { Router } from "express";
import * as platesController from "../controllers/plates.controller";
import { authJwt } from "../middlewares";
const router = Router();

// Rutas de Mesas
router.post('/', platesController.createPlate)
router.get('/', platesController.getPlates)
router.get('/:plateId', platesController.getPlateById)
router.put('/:plateId', platesController.updatePlateById)
router.delete('/:plateId', platesController.deletePlateById)


export default router;