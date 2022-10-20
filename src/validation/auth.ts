"use strict"
import * as Joi from "joi"
import { apiResponse } from '../common'
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'

export const register_User = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().required().error(new Error('name is required!')),
        email: Joi.string().email().required().error(new Error('email is required!')),
        userType: Joi.string().alphanum().required().error(new Error('userType is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}

export const login_User = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),
        // userType: Joi.string().alphanum().required().error(new Error('userType is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        return res.status(400).send(new apiResponse(400, error.message, {}, {}))
    });
}


