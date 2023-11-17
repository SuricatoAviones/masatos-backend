import { Router } from "express";
import * as tablesController from "../controllers/tables.controller";

const router = Router();


router.post('/', tablesController.createTable)
router.get('/', tablesController.getTables)
router.get('/:tableId', tablesController.getTableById)
router.put('/:tableId', tablesController.updateTableById)
router.delete('/:tableId', tablesController.deleteTableById)


export default router;