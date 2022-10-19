"use strict"
import express from 'express';
import { adminController } from '../controllers';
import { userJWT } from '../helper';
import * as validation from '../validation'
const routes = express.Router();

//----addCategoryByAdmin 
routes.post('/addCategory', validation.add_Category, userJWT, adminController.addCategory);
routes.delete('/deleteCategory/:id', validation.by_Id, userJWT, adminController.deleteCategory);
routes.put('/updateCategory', validation.update_Category, userJWT, adminController.updateCategory);
routes.get('/getCategory', userJWT, adminController.getCategory);
routes.get('/getCategoryById/:id', validation.by_Id, userJWT, adminController.getCategoryById);

//----addProductByAdmin
routes.post('/addProduct', validation.add_Product, userJWT, adminController.addProduct);
routes.delete('/deleteProduct/:id', validation.by_Id, userJWT, adminController.deleteProduct);
routes.put('/updateProduct', validation.update_Product, userJWT, adminController.updateProduct);
// routes.get('/getProduct', userJWT, adminController.getProduct);
// routes.get('/getProductById/:id', userJWT, adminController.getProductById);

export const adminRouter = routes;
