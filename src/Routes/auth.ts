"use strict"
import express from 'express';
import { authController } from '../controllers';
import { userJWT } from '../helper';
import * as validation from '../validation/auth'
const routes = express.Router();

//----Auth----
routes.post('/register_User', validation.register_User, authController.register_User);
routes.post('/login_User', validation.login_User, authController.login_User);
routes.post('/logOut', validation.logOut, userJWT, authController.logOut);


export const authRouter = routes;
