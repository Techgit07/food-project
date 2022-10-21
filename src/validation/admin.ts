"use strict"
import * as Joi from "joi"
import { apiResponse } from '../common'
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'

export const add_Category = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        foodName: Joi.string().required().error(new Error('foodName is required!')),
        image: Joi.string().required().error(new Error('image is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

export const update_Category = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        foodName: Joi.string().required().error(new Error('foodName is required!')),
        image: Joi.string().required().error(new Error('image is required!')),
        id: Joi.string().required().error(new Error('categoryId is required!'))
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

export const add_Product = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        productName: Joi.string().required().error(new Error('productName is required!')),
        description: Joi.string().required().error(new Error('description is required!')),
        // foodSize: Joi.string().required().error(new Error('description is required!')),
        price: Joi.string().required().error(new Error('price is required!')),
        categoryId: Joi.string().required().error(new Error('categoryId is required!'))
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

export const update_Product = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        productName: Joi.string().required().error(new Error('productName is required!')),
        description: Joi.string().required().error(new Error('description is required!')),
        price: Joi.string().required().error(new Error('price is required!')),
        id: Joi.string().required().error(new Error('productId is required!'))
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

export const by_Id = async (req: Request, res: Response, next: any) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json(new apiResponse(400, 'invalid id', {}, {}))
    return next()
}

