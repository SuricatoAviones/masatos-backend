import { Router } from "express";
import * as authController from '../controllers/auth.controller'
import { verifySignup } from "../middlewares";
import { check } from "express-validator";
const router = Router();

router.post('/signup',
    [verifySignup.checkDuplicateUsernameOrEmail, 
    verifySignup.checkRolesExisted],
    [
        check('username', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6}),
    ], 
    authController.signUp)
router.post('/signin', authController.signin)

export default router;