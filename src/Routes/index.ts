"use strict"
import express from 'express';
// import { userRouter } from './userRoutes';
import { categoryRouter } from './auth';
const routes = express.Router();


// routes.use('/user', userRouter);
routes.use('/auth', categoryRouter);

export { routes }
