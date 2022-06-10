import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import UserRepo from '../../../database/repository/UserRepo';
import { BadRequestError } from '../../../core/ApiError';
import User, { UserModel } from '../../../database/model/User';
import { createTokens } from '../../../auth/authUtils';
import validator from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { RoleCode } from '../../../database/model/Role';

const router = express.Router();

/**
 * @api {post} /signup/basic signup Basic
 * @apiDescription The Api to create a user in the system
 * @apiName sign Basic
 * @apiGroup Authetication
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-api-key
 * @apiHeader {String} Content-Type=application/json
 * 
 * @apiBody {String} email New user unique email address.
 * @apiBody {String{6..15}} password user password must contain upperCase,lowerCase,numeric and special Character
 * @apiBody {String{3...}}name name of the User
 * @apiBody {String}roleid  roleid of user
 * @apiParamExample {json} Request-Example:
 * {
    "name":"ruturaj",
    "email":"ruturaj@gmail.com",
    "password":"rtyQi@123",
    "roleid":"0c878942-9134-4f7d-8067-4ed19a60b6b7"
}
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
 *  "statusCode": "10000",
    "message": "Signup Successful",
    "data": {
        "user": {
            "createdAt": "2022-06-09T06:35:23.181Z",
            "updatedAt": "2022-06-09T06:35:23.184Z",
            "userId": "570bdb00-e7be-11ec-8397-b5e4a1a21827",
            "status": true,
            "verified": true,
            "name": "ruturaj",
            "email": "ruturaj@gmail.com",
            "password": "$2b$10$OcXpzPzG2nWElF5aOPOIzecWQLVdbQ8A0SdZ813.5Iq1zpt2db0jy",
            "roleid": "0c878942-9134-4f7d-8067-4ed19a60b6b7"
        }
    }
 * }
 *
 * @apiUse DefinedError
 *
 * @apiUse DefinedErrorExample
 *
 */
router.post(
  '/basic',
  validator(schema.signup),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (user) throw new BadRequestError('User already registered');
    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const { user: createdUser} = await UserRepo.create(
      {
        name: req.body.name,email: req.body.email,password: passwordHash     
      }as UserModel,
      req.body.roleid
    );
    new SuccessResponse('Signup Successful', {
      user: createdUser,
      tokens:User
    }).send(res);
  }),
);
    
export default router;
