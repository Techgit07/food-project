"use strict"
import express from 'express';
import { userController } from '../controllers';
import { userJWT } from '../helper';
const routes = express.Router();

//----userGetProduct
routes.get('/getProduct', userJWT, userController.getProduct);
routes.get('/getProductById/:id', userJWT, userController.getProductById);

//----userAddCart
routes.post('/addCart', userJWT, userController.addCart);
routes.get('/getCart', userJWT, userController.getCart);


export const userRouter = routes;
