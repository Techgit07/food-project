"use strict"
import express from 'express';
import { authController } from '../controllers';
import { userJWT } from '../helper';
const routes = express.Router();

//----Auth----
routes.post('/register_User', authController.register_User);
routes.post('/login_User', authController.login_User);
routes.post('/logOut', userJWT, authController.logOut);


export const authRouter = routes;
