"use strict"
import express from 'express';
import { userController } from '../controllers';
import { userJWT } from '../helper';
import * as validation from '../validation'
const routes = express.Router();

//----userGetProduct
routes.get('/getProduct', userJWT, userController.getProduct);
routes.get('/getProductById/:id', validation.by_Id, userJWT, userController.getProductById);

//----userAddCart
routes.post('/addCart', validation.addCart, userJWT, userController.addCart);
routes.get('/getCart', userJWT, userController.getCart);
routes.put('/updateCart', validation.updateCart, userJWT, userController.updateCart);
routes.delete('/deleteCart/:id', validation.by_Id, userJWT, userController.deleteCart);

//----placeOrderByUser
routes.post('/placeOrder', validation.placeOrder, userJWT, userController.placeOrder);


export const userRouter = routes;
