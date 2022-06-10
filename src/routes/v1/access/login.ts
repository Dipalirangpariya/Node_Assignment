import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import crypto from 'crypto';
import UserRepo from '../../../database/repository/UserRepo';
import { BadRequestError, AuthFailureError } from '../../../core/ApiError';

import { createTokens } from '../../../auth/authUtils';
import validator from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { userInfo } from 'os';

const router = express.Router();

/**
 * @api {post} /login/basic login Basic
 * @apiDescription The Api to create a user in the system
 * @apiName login Basic
 * @apiGroup Authetication
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-api-key
 * @apiHeader {String} Content-Type=application/json
 * 
 * @apiBody {String} email New user unique email address.
 * @apiBody {String{6..15}} password New user password New user password
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "email": "ali@mindorks.com",
 *    "password": "changeit@1A",
 * }
 *
 * @apiSuccess {String} statusCode Response code.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object} data.user New created user informatin.
 * @apiSuccess {String} data.user.id New created user id.
 * @apiSuccess {String} data.user.name New created user name.
 * @apiSuccess {String} data.user.email New created user email address.
 * @apiSuccess {String[]} data.user.roleid New created user roles in array.
 *
 * @apiSuccessExample {Json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "statusCode": "10000",
 *   "message": "Login Success",
 *   "data": {
 *       "user": {
 *           "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
 *           "name": "Dipali",
 *           "email": "dipalirangpariya811@gmail.com",
 *           "password": "$2b$10$TgfU4oBUcV0y7ffWF1LTzeg7WrLCO5J7.aoZjHSuJMu90ybF0fZQa",
 *           "roleid": "0c878942-9134-4f7d-8067-4ed19a60b6b7",
 *           "status": true,
 *           "verified": true,
 *           "createdAt": "2022-05-25T05:23:26.173Z",
 *           "updatedAt": "2022-05-25T05:23:26.177Z"
 *       },
 *       "token": "480ca4fb3aa018c67f41629ef404849dbec70b56fb32c792cd919d6762a6930eec88e480ca4fb3aa018c67f41629ef404849dbec70b56fb32c792cd919d6764"
 *   }
 * }
 *
 * @apiUse DefinedError
 *
 * @apiUse DefinedErrorExample
 *
 */

export default router.post(
  '/basic',
  validator(schema.userCredential),
  asyncHandler(async (req, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User not registered');
    if (!user.password) throw new BadRequestError('Credential not set');

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    new SuccessResponse('Login Success', {
      user: user,
      token:accessTokenKey,
    }).send(res);
  }),
);
