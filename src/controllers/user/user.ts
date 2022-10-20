import { Request, response, Response } from "express";
import { foodcategoryModel, foodproductModel, userModel, } from "../../database";
import { apiResponse } from "../../common";
import { responseMessage } from "../../helper";
import config from 'config'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config.get('jwt_token_secret');

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

export const getProduct = async (req: Request, res: Response) => {
    let body = req.body,
        user: any = req.headers.user
    // body.createdBy = user?.id
    try {
        let user: any = req.headers.user
        let response = await foodproductModel.aggregate([
            { $match: { isActive: true } },
            {
                $lookup: {
                    from: "categories",
                    let: { id: "$categoryId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$id'] },
                                        { $eq: ['$isActive', true] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: "categoryData"
                },
            },
        ])
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('product'), { response }, {}))
        }
    } catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        let id = req.params.id
        let response: any = await foodproductModel.find({ _id: ObjectId(id), isActive: true })
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('product'), response, {}))
        } else {
            return res.status(403).send(new apiResponse(403, responseMessage?.getDataNotFound('product'), null, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


