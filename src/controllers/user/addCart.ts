import { Request, Response } from "express";
import { addToCart, foodproductModel, placeorderModel } from "../../database";
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

        // if (user.userType == "user") {
        let product: any = await foodproductModel.findOne({ isActive: true, _id: body.productId, })
        body.total = product.price * body.quantity

        let response: any = await addToCart.create(body);
        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.addDataSuccess('cart'), response, {}))
        }
        // }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

export const updateCart = async (req: Request, res: Response) => {
    let body = req.body,
        id = body?.id
    try {
        let product: any = await foodproductModel.findOne({ isActive: true, _id: body.productId, })
        body.total = product.price * body.quantity

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

//         let response: any = await addToCart.find({ orderedBy: ObjectId(user?._id), isActive: true }).populate('productId', '_id categoryId')

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
    let response: any = {}
    let user: any = req.headers.user,
        body = req.body

    try {
        let response = await addToCart.aggregate([
            {
                $match: {
                    user: body.orderedBy,
                    isActive: true
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { id: "$productId" },
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
                    as: "productData"
                },
            },
            {
                $lookup: {
                    from: "users",
                    let: { id: "$orderedBy" },
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
                    as: "userData"
                },
            },
            // {
            //     $project: {
            //         userData: 1, productData: 1, _id: 1, quantity: 1, foodSize: 1, total: 1, orderedBy: 1, createdAt: 1,
            //     }
            // }
        ])
        // console.log(response);
        let sum = 0

        for (let i = 0; i < response.length; i++) {
            const element = response[i];
            sum += element.total
        }
        // response = {
        //     response,
        //     totalAmount: sum
        // }

        if (response) {
            return res.status(200).send(new apiResponse(200, responseMessage?.getDataSuccess('cart'), { response, totalAmount: sum }, {}))
        }
        else {
            return res.status(403).send(new apiResponse(403, responseMessage?.getDataNotFound('cart'), {}, {}))
        }
    } catch (error) {
        console.log('error', error)
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}


export const placeOrder = async (req: Request, res: Response) => {
    try {
        let body = req.body,
            user: any = req.headers.user

        body.orderedBy = ObjectId(user?.id)

        if (body.email == user.email) {
            let response: any = await placeorderModel.create(body)
            if (response) {
                return res.status(200).send({ 'message': "Your Order Placed Successfully!" })
            }
        }
        return res.status(403).send(new apiResponse(403, responseMessage?.invalidEmail, null, {}))

    } catch (error) {
        console.log('error', error)
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}
