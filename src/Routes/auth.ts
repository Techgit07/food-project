"use strict"
import express from 'express';
import { authController, adminController } from '../controllers';
import { userJWT } from '../helper';
const routes = express.Router();

//----Auth----
routes.post('/register_User', authController.register_User);
routes.post('/login_User', authController.login_User);


//----addCategoryByAdmin 
routes.post('/addCategory', userJWT, adminController.addCategory);
routes.delete('/deleteCategory/:id', userJWT, adminController.deleteCategory);
routes.put('/updateCategory', userJWT, adminController.updateCategory);
routes.get('/getCategory', userJWT, adminController.getCategory);
routes.get('/getCategoryById/:id', userJWT, adminController.getCategoryById);

//----addProductByAdmin
routes.post('/addProduct', userJWT, adminController.addProduct);
routes.delete('/deleteProduct/:id', userJWT, adminController.deleteProduct);
routes.put('/updateProduct', userJWT, adminController.updateProduct);
// routes.get('/getProduct', userJWT, adminController.getProduct);
// routes.get('/getProductById/:id', userJWT, adminController.getProductById);

export const authRouter = routes;
