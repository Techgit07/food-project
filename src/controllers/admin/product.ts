import { Request, Response } from "express";
import { foodcategoryModel, foodproductModel, userModel, } from "../../database";
import { apiResponse } from "../../common";
import { responseMessage } from "../../helper";
import config from 'config'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config.get('jwt_token_secret');

export const addProduct = async (req: Request, res: Response) => {
    try {
        let body = req.body,
            user: any = req.headers.user

        body.createdBy = user?.id

        if (user.userType === "admin") {
            let response: any = await foodproductModel.create(body);
            if (response) {
                return res.status(200).send(new apiResponse(200, responseMessage?.addDataSuccess('product'), response, {}))
            }
            return res.status(403).send(new apiResponse(403, responseMessage?.addDataError, {}, {}))
        }
    } catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        let id = await req.params.id
        // let response = await foodcategoryModel.deleteOne({ _id: ObjectId(id) }) //----hardDelete
        let response: any = await foodproductModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true })//----softDelete
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.deleteDataSuccess("product"), { response }, {}))
        }
        else {
            return res.status(403).send(new apiResponse(403, responseMessage?.deleteDataError, null, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    let body = req.body,
        id = body?.id
    try {
        let response = await foodproductModel.findOneAndUpdate({ _id: ObjectId(id) }, body, { new: true });
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.updateDataSuccess('product'), { response }, {}));
        }
        // console.log(response);
        return res.status(403).send(new apiResponse(403, responseMessage?.updateDataError('category'), {}, {}));
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}));
    }
}

// export const getProduct = async (req: Request, res: Response) => {
//     try {
//         let response = await foodproductModel.find({ isActive: true })
//         if (response) {
//             return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("product"), response, {}))
//         } else {
//             return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound("product"), null, {}))
//         }
//     } catch (error) {
//         console.log("error", error);
//         return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, null, {}))
//     }
// }

// export const getProductById = async (req: Request, res: Response) => {
//     try {
//         let id = req.params.id
//         let response: any = await foodproductModel.find({ _id: ObjectId(id), isActive: true })
//         if (response) {
//             return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('product'), response, {}))
//         } else {
//             return res.status(403).send(new apiResponse(403, responseMessage?.getDataNotFound('product'), null, {}))
//         }
//     }
//     catch (error) {
//         return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
//     }
// }    