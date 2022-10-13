"use strict"
import express from 'express';
import { authController, adminController } from '../controllers';
import { userJWT } from '../helper';
const routes = express.Router();

//----Auth
routes.post('/register_User', authController.register_User);
routes.post('/login_User', authController.login_User);

//----adminCategory
routes.post('/addCategory', userJWT, adminController.addCategory);
routes.delete('/deleteCategory/:id', userJWT, adminController.deleteCategory);
routes.put('/updateCategory', userJWT, adminController.updateCategory);

export const categoryRouter = routes;
