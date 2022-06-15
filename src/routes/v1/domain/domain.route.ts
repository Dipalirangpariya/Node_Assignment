import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema";
import domainRepo from '../../../database/repository/domain.repo';
import { DomainModel } from "../../../database/model/domain";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import { BadRequestError } from "../../../core/ApiError";
import { ProtectedRequest } from "../../../types/app-request";

const router = express.Router();

/**
 * @api {post} /domain/domainCreate domain create
 * @apiDescription The Api to create a domain in the system
 * @apiName domain create
 * @apiGroup domain
 * @apiVersion 0.1.0
 *
 * @apiBody {String} Domain_Name New domain unique domain name.
 * @apiBody {String{5..150}} Domain_Description domain descriptation of domain
 * @apiBody {String}userId Id of the User
 * @apiBody {number}countryId countryId of the country
 * @apiBody {String}Reason new Reason for Domain. Value must be included |'BUSINESS','OTHER' 
 * @apiBody {String}Other other reason .If Reason have 'OTHER' value then this field is require. 
 * 
 * @apiParamExample {json} Request-Example:
 * {
   "Domain_Name": "madgdsms.com",
   "Domain_Description": "$$mb,mjlkn,nk",
   "countryId": "3",
   "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
   "Reason":"OTHER" ,
   "Other":"any reason"
 
  }
 * 
 * @apiSuccess {String} statusCode Response code.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object} data.data New created domain informatin.
 * @apiSuccess {String} data.Domain_id New created Domain_id.
 * @apiSuccess {String} data.Domain_Name New created Domain_Name.
 * @apiSuccess {String} data.Domain_Description New created Domain_Description.
 * @apiSuccess {String} data.countryId New created countryId.
 * @apiSuccess {String} data.Reason New created Reason.
 * @apiSuccess {String} data.Other Reason is Other then created Other.
 * @apiSuccessExample {Json} Success-Response:
 * HTTP/1.1 200 OK
 *{
    "statusCode": "10000",
    "message": "Domain is sucessfully created",
    "data": {
        "domain": {
            "createdAt": "2022-07-06T09:31:22.000Z",
            "updatedAt": "2022-06-07T09:31:22.958Z",
            "Domain_id": 32,
            "Domain_Name": "madgdsms.com",
            "Domain_Description": "$$mb,mjlkn,nk",
            "Reason": "OTHER",
            "Other": "any reason",
            "countryId": 3,
            "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9"
        }
    }
  }
 *
 * @apiUse DefinedError
 *
 * @apiUse DefinedErrorExample
 *
 */
  router.post('/domainCreate', validator(schema.domainInput), asyncHandler(async (req, res) => {
    const {domain:createdDomain} = await domainRepo.create({
     Domain_Name:req.body.Domain_Name,
     Domain_Description:req.body.Domain_Description,
     Reason:req.body.Reason,
     Other:req.body.Other,
     countryId:req.body.countryId,
     userId:req.body.userId,
 
    } as DomainModel,req.body.userId,req.body.countryId)
      new SuccessResponse( req.t("Domain_create_sucess"), { domain:createdDomain}).send(res);
    })
  );
  
/**
 * @api {get} /domain/domainid/:id domain get by Id
 * @apiDescription The Api to get particular domain in the system
 * @apiName  get domain by Id
 * @apiGroup domain
 * @apiVersion 0.1.0
 *
 * @apiparam {number} id domain unique id
 *
 * @apiSuccess {String} statusCode Response code.
 * @apiSuccess {String} message Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object} data.data informatin of domain .
 * @apiSuccess {String} data.Domain_id Domain_id of domain.
 * @apiSuccess {String} data.Domain_Name Domain_Name of domain.
 * @apiSuccess {String} data.Domain_Description Domain_Description of domain.
 * @apiSuccess {String} data.countryId countryId of domain.
 * @apiSuccess {String} data.Reason Reason of domain.
 * @apiSuccess {String} data.Other Reason is Other then Other of domain.
 * @apiSuccessExample {Json} Success-Response:
 * HTTP/1.1 200 OK
 {
    "statusCode": "10000",
    "message": "sucess",
    "data": {
        "Domain_id": 3,
        "Reason": "OTHER",
        "Other": "any reason",
        "Domain_Name": "madgdsms.com",
        "Domain_Description": "$$mb,mjlkn,nk",
        "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
        "countryId": 3,
        "createdAt": "2022-06-06T08:17:45.000Z",
        "updatedAt": "2022-06-06T08:17:03.522Z"
    }
}
 *
 * @apiUse DefinedError
 *
 * @apiUse DefinedErrorExample
 *
 */
router.get(
  '/domainid/:id',
  validator(schema.domainid,ValidationSource.PARAM),
  asyncHandler(async (req:ProtectedRequest, res) => {
  const domain = await domainRepo.findbyid(req.params.id);
  if (!domain) throw new BadRequestError(req.t("Domain_not_exist"));
  return new SuccessResponse(req.t("Sucess_Message"), domain).send(res);
  }),
);

/**
 * @api {get} /domain/all get all domain
 * @apiDescription The Api to get particulara domain in the system
 * @apiName  get all domain
 * @apiGroup domain
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} statusCode Response code.
 * @apiSuccess {String} message  Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object} data.data New created domain informatin.
 * @apiSuccess {String} data.Domain_id Domain_id of domain.
 * @apiSuccess {String} data.Domain_Name  Domain_Name of domain.
 * @apiSuccess {String} data.Domain_Description Domain_Description of domain.
 * @apiSuccess {String} data.countryId countryId of domain.
 * @apiSuccess {String} data.Reason Reason of domain.
 * @apiSuccess {String} data.Other Reason is Other then Other of domain.
 * @apiSuccessExample {Json} Success-Response:
 * HTTP/1.1 200 OK
 {
    "statusCode": "10000",
    "message": "All Domains are :",
    "data": [
        {
            "Domain_id": 1,
            "Reason": "OTHER",
            "Other": "any reason",
            "Domain_Name": "madgdsms.com",
            "Domain_Description": "$$mb,mjlkn,nk",
            "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
            "countryId": 3,
            "createdAt": "2022-06-06T02:45:38.000Z",
            "updatedAt": "2022-06-06T08:15:26.041Z"
        },
        {
            "Domain_id": 2,
            "Reason": "OTHER",
            "Other": "any reason",
            "Domain_Name": "madgdsms.com",
            "Domain_Description": "$$mb,mjlkn,nk",
            "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
            "countryId": 3,
            "createdAt": "2022-06-06T08:17:08.000Z",
            "updatedAt": "2022-06-06T08:17:03.522Z"
        },
        {
            "Domain_id": 3,
            "Reason": "OTHER",
            "Other": "any reason",
            "Domain_Name": "madgdsms.com",
            "Domain_Description": "$$mb,mjlkn,nk",
            "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
            "countryId": 3,
            "createdAt": "2022-06-06T08:17:45.000Z",
            "updatedAt": "2022-06-06T08:17:03.522Z"
        }
}
 *
 * @apiUse DefinedError
 *
 * @apiUse DefinedErrorExample
 *
 */
router.get('/all',
asyncHandler(async (req, res) => {
 const domains=  await DomainModel.findAll({where:{}})
 return new SuccessResponse(req.t("All_domains"),domains).send(res);
})
);

/**
 * @api {delete} /domain//remove/:id delete Domain
 * @apiDescription The Api to delete particular domain in the system
 * @apiName  delete domain by Id
 * @apiGroup domain
 * @apiVersion 0.1.0
 *
 * @apiparam {number} id domain unique id
 *
 * @apiSuccess {String} statusCode Response code.
 * @apiSuccess {String} message  Response message.
 * @apiSuccessExample {Json} Success-Response:
 * HTTP/1.1 200 OK
 {
    "statusCode": "10000",
    "message": "domain deleted successfully"
}
 *
 * @apiUse DefinedError
 *
 * @apiUse DefinedErrorExample
 *
 */
router.delete('/remove/:id',
asyncHandler(async (req, res) => {
 const domains=  await DomainModel.destroy({where:{Domain_id:req.params.id}});
 return new SuccessMsgResponse(req.t("Delete_Domain")).send(res);
})
);

  /**
   * @api {put} /domain/domainupdate/:id domain update by Id
   * @apiDescription The Api to update particular domain in the system
   * @apiName  update domain by Id
   * @apiGroup domain
   * @apiVersion 0.1.0
   *
   * @apiparam {number} id domain unique id
   * 
   * @apiParamExample {json} Request-Example:
  {
    "Domain_Name": "madgdsms.com",
    "Domain_Description": "this is domain",
    "countryId": "3",
    "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
    "Reason":"OTHER" ,
    "Other":"any reason"
 
  }
   *
   * @apiSuccess {String} statusCode Response code.
   * @apiSuccess {String} message  Response message.
   * @apiSuccess {Object} data Response data.
   * @apiSuccess {Object} data.data update informatin of domain .
   * @apiSuccess {String} data.Domain_id update Domain_id of domain.
   * @apiSuccess {String} data.Domain_Name  update Domain_Name of domain.
   * @apiSuccess {String} data.Domain_Description update Domain_Description of domain.
   * @apiSuccess {String} data.countryId  update countryId of domain.
   * @apiSuccess {String} data.Reason  update Reason of domain.
   * @apiSuccessExample {Json} Success-Response:
   * HTTP/1.1 200 OK
   {
    "statusCode": "10000",
    "message": "sucess",
    "data": {
        "Domain_id": 14,
        "Reason": "OTHER",
        "Other": "any reason",
        "Domain_Name": "madgdsms.com",
        "Domain_Description": "this is domain",
        "userId": "cdb67600-dbea-11ec-b23f-5f0188d6cba9",
        "countryId": 3,
        "createdAt": "2022-06-06T09:54:14.000Z",
        "updatedAt": "2022-06-09T10:21:39.860Z"
    }
   }
   *
   * @apiUse DefinedError
   *
   * @apiUse DefinedErrorExample
   *
   */
router.put(
  '/domainupdate/:id',
  validator(schema.domainid,ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
  const domain = await domainRepo.findbyid(req.params.id);
  if (!domain) throw new BadRequestError(req.t("Domain_not_exist"));
  const updatedomain= await domainRepo.update( req.body.Domain_Name,req.params.id,req.body.Domain_Description,req.body.countryId);
  const domain1 = await domainRepo.findbyid(req.params.id);
  return new SuccessResponse(req.t("Sucess_Message"),domain1).send(res);
  }), 
);

export default router;
