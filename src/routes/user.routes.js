import { Router } from "express";
import * as userController from "../controllers/user.controller";
import {authJwt, verifySignup} from '../middlewares';

const router = Router();
router.post('/',[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userController.createUser)

router.get('/',userController.getUsers)


router.get('/:id',userController.getUser)
router.put('/:id',userController.updateUserById)
router.delete('/:id',userController.deleteUserById)

export default router;