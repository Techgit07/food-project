"use strict"
import express from 'express';
import { userJWT, upload } from '../helper';
const routes = express.Router();


routes.post('/upload', userJWT, upload, (req, res) => {
    return res.send({ 'message': "file upload successfully", data: req.file.originalname })
})

export const uploadRouter = routes;
