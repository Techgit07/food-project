import { Request, Response } from "express";
import { addToCart, foodcategoryModel, foodproductModel } from "../../database";
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

        body.orderedBy = ObjectId(user?._id)

        let product: any = await foodproductModel.findOne({ isActive: true, _id: body.productId })
        body.total = product.price * body.quantity

        let response: any = await addToCart.create(body);
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.addDataSuccess('cart'), response, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

export const updateCart = async (req: Request, res: Response) => {
    let body = req.body,
        id = body?.id
    try {
        let response = await addToCart.findOneAndUpdate({ _id: ObjectId(id) }, body, { new: true })

        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.updateDataSuccess('addToCart'), { response }, {}))
        }
        console.log(response);

        return res.status(403).send(new apiResponse(403, responseMessage?.updateDataError('addToCart'), null, {}))
    } catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


// export const getCart = async (req: Request, res: Response) => {
//     try {
//         let body = req.body,
//             user: any = req.headers.user

//         let response: any = await addToCart.find({ orderedBy: ObjectId(user?._id), isActive: true }).populate('productId', '_id categoryId createdBy')
//         if (response) {
//             return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('cart'), { response }, {}))
//         }
//         else {
//             return res.status(403).send(new apiResponse(403, responseMessage?.getDataNotFound('cart'), {}, {}))
//         }
//     }
//     catch (error) {
//         return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
//     }
// }

export const deleteCart = async (req: Request, res: Response) => {
    try {
        let id = await req.params.id
        // let response = await addToCart.deleteOne({ _id: ObjectId(id) }) //----hardDelete
        let response = await addToCart.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true })//----softDelete
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.deleteDataSuccess("addToCart"), { response }, {}))
        }
        else {
            return res.status(403).send(new apiResponse(403, responseMessage?.deleteDataError, null, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


export const getCart = async (req: Request, res: Response) => {
    try {
        let user: any = req.headers.user
        let response: any = await addToCart.aggregate([
            { $match: { isActive: true } },
            {
                $lookup: {
                    from: "products",
                    let: { id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['orderedBy', '$$id'] },
                                        { $eq: ['isActive', true] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                createdBy: 1, _id: 1
                            }
                        },
                    ],
                    as: "user_Data"
                }
            },
            // {
            //         totalAmount: { $sum: { "total": 1 } },
            // }
        ])
        // console.log(response);

        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('cart'), { response }, {}))
        }
        else {
            return res.status(403).send(new apiResponse(403, responseMessage?.getDataNotFound('cart'), {}, {}))
        }

    } catch (error) {
        console.log('error', error)
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

