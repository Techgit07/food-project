import { Request, Response } from "express";
import { userModel } from "../../database";
import { apiResponse } from "../../common";
import config from 'config'
import { responseMessage, signUp_verification_mail } from "../../helper";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config.get('jwt_token_secret')

export const register_User = async (req: Request, res: Response) => {
    try {
        const body: any = await req.body
        const existingMail = await userModel.findOne({ email: body.email, isActive: true })
        if (!existingMail) {

            //----randomPassword 
            let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            let passLength = 12;
            let random_password = ''
            for (var i = 0; i <= passLength; i++) {
                let randomNumber = await Math.floor(Math.random() * chars.length);
                random_password += await chars.substring(randomNumber, randomNumber + 1);
            }
            //----hashPassword
            const salt = await bcryptjs.genSaltSync(8);
            const hashPassword = await bcryptjs.hash(random_password, salt);
            body.password = hashPassword

            let response: any = await userModel.create(body);
            if (response) {
                let mail_send = await signUp_verification_mail({ email: response?.email, name: response?.name, password: random_password })
                if (mail_send) {
                    return res.status(200).send(new apiResponse(200, responseMessage?.addDataSuccess('userData'), { body }, {}))
                }
                else { return res.status(403).send(new apiResponse(403, responseMessage?.addDataError, {}, {})) }
            }
        }
        else {
            return res.status(409).send(new apiResponse(409, responseMessage?.alreadyEmail, {}, {}))
        }
    }
    catch (error) {
        return res.status(500).send(new apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

//----userLogin
export const login_User = async (req: Request, res: Response) => {
    try {
        let body = await req.body;
        let response: any = await userModel.findOne({ email: body.email, isActive: true }, {});
        if (!response) {
            return res.status(404).json(new apiResponse(404, responseMessage?.invalidEmail, null, {}));
        }
        const passwordMatch = await bcryptjs.compare(body.password, response.password);
        // console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, null, {}));
        }
        const token = jwt.sign({ _id: response?._id }, jwt_token_secret);
        response = { response, token };
        return res.status(200).json(new apiResponse(200, responseMessage?.loginSuccess, response, {}));
    } catch (error) {
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, null, {}));
    }
}
