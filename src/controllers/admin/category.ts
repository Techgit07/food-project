import { Request, Response } from "express";
import { foodcategoryModel, foodproductModel, userModel } from "../../database";
import { apiResponse } from "../../common";
import { responseMessage } from "../../helper";
import config from 'config'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config.get('jwt_token_secret');


export const addCategory = async (req: Request, res: Response) => {
    try {
        let user: any = await req.headers.user,
            body: any = req.body

        body.createdBy = user?.id
        if (user.userType === "admin") {
            let response: any = await foodcategoryModel.create(body);
            if (response) {
                return res.status(200).send(new apiResponse(200, responseMessage?.addDataSuccess('category'), { response }, {}))
            }
            return res.status(403).send(new apiResponse(403, responseMessage?.addDataError, {}, {}))
        }
        else {
            return res.json({ 'message': "your user type is not Admin" })
        }
    } catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


export const deleteCategory = async (req: Request, res: Response) => {
    try {
        let id = await req.params.id
        // let response = await foodcategoryModel.deleteOne({ _id: ObjectId(id) }) //----hardDelete
        let response: any = await foodcategoryModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true })//----softDelete
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

export const getCategory = async (req: Request, res: Response) => {
    try {
        let response = await foodcategoryModel.find({ isActive: true })
        if (response) {
            return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("category"), response, {}))
        } else {
            return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound("category"), null, {}))
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, null, {}))
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        let id = req.params.id
        let response: any = await foodcategoryModel.find({ _id: ObjectId(id), isActive: true })
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('category'), response, {}))
        } else {
            return res.status(403).send(new apiResponse(403, responseMessage?.getDataNotFound('category'), null, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}