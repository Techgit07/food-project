"use strict"
import express from 'express';
import { userRouter } from './user';
import { authRouter } from './auth';
import { adminRouter } from './admin';
import { uploadRouter } from './upload';
const routes = express.Router();

routes.use('/admin', adminRouter)
routes.use('/user', userRouter);
routes.use('/auth', authRouter);
routes.use('/upload', uploadRouter);

export { routes }
