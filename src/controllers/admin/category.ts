import { Request, Response } from "express";
import { foodcategoryModel, userModel } from "../../database";
import { apiResponse } from "../../common";
import { responseMessage } from "../../helper";
import config from 'config'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config.get('jwt_token_secret');


export const addCategory = async (req: Request, res: Response) => {
    try {
        let user: any = await req.headers.user;
        let body = req.body;
        if (user.userType === 1) {
            let response: any = await foodcategoryModel.create(body);
            if (response) {
                return res.status(200).send(new apiResponse(200, responseMessage?.addDataSuccess('category'), { response }, {}))
            }
            return res.status(403).send(new apiResponse(403, responseMessage?.addDataError, {}, {}))
        }
        else {
            return res.json({ 'msg': "your user type is not admin" })
        }
    } catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


export const deleteCategory = async (req: Request, res: Response) => {
    try {
        let id = await req.params.id
        let response = await foodcategoryModel.deleteOne({ _id: ObjectId(id) }) //----hardDelete
        // let response: any = await foodcategoryModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true })//----softDelete
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.deleteDataSuccess("category"), { response }, {}))
        }
        else {
            return res.status(403).send(new apiResponse(403, responseMessage?.deleteDataError, null, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


export const updateCategory = async (req: Request, res: Response) => {
    let body = req.body,
        id = body?.id
    try {
        let response = await foodcategoryModel.findOneAndUpdate({ _id: ObjectId(id) }, body, { new: true });
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.updateDataSuccess('category'), { response }, {}));
        }
        console.log(response);
        return res.status(403).send(new apiResponse(403, responseMessage?.updateDataError('category'), {}, {}));
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}));
    }
}
