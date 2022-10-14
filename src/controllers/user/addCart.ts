import { Request, Response } from "express";
import { addToCart } from "../../database";
import { apiResponse } from "../../common";
import { responseMessage } from "../../helper";
import config from 'config'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config.get('jwt_token_secret');

export const addCart = async (req: Request, res: Response) => {
    try {
        let body = req.body,
            user: any = req.headers.user

        body.createdBy = ObjectId(user?._id)

        let response: any = await addToCart.create(body);
        if (response) {
            return res.json({ 'msg': response })
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

export const getCart = async (req: Request, res: Response) => {
    try {
        let body = req.body,
            user: any = req.headers.user

        let response: any = await addToCart.find({ createdBy: ObjectId(user?._id), isActive: true }).populate('productId', '_id createdBy')
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('cart'), { response }, {}))
        }
        else {
            return res.status(403).send(new apiResponse(403, responseMessage?.getDataNotFound('cart'), {}, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

