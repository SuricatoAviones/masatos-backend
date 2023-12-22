import { Router } from "express";
import * as userController from "../controllers/user.controller";
import {authJwt, verifySignup} from '../middlewares';

const router = Router();
router.post('/',[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userController.createUser)

router.get('/',/* authJwt.verifyToken, */userController.getUsers)

export default router;