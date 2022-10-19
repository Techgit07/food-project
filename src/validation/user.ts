"use strict"
import * as Joi from "joi"
import { apiResponse } from '../common'
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'

export const addCart = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        productId: Joi.string().required().error(new Error('productId is required!')),
        quantity: Joi.string().required().error(new Error('minimum 1 quantity is required!')),
        foodSize: Joi.string().required().error(new Error('foodSize is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

export const updateCart = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        productId: Joi.string().required().error(new Error('productId is required!')),
        quantity: Joi.string().required().error(new Error('quantity is required!')),
        foodSize: Joi.string().required().error(new Error('foodSize is required!')),
        id: Joi.string().required().error(new Error('cartId is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

export const placeOrder = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        firstName: Joi.string().alphanum().required().error(new Error('firstname is required!')),
        lastName: Joi.string().alphanum().required().error(new Error('lastname is required!')),
        email: Joi.string().email().required().error(new Error('email is required!')),
        phone: Joi.string().required().error(new Error('phone is required!')),
        address: Joi.string().required().error(new Error('address is required!')),
        postalCode: Joi.string().required().error(new Error('postalcode is required!')),
        city: Joi.string().required().error(new Error('city is required!')),

    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

