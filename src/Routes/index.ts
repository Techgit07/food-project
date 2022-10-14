"use strict"
import express from 'express';
import { userRouter } from './user';
import { authRouter } from './auth';
const routes = express.Router();


routes.use('/user', userRouter);
routes.use('/auth', authRouter);

export { routes }
