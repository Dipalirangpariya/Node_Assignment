import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema";
import domainRepo from '../../../database/repository/domain.repo';
import { DomainModel } from "../../../database/model/domain";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import { BadRequestError } from "../../../core/ApiError";
import { ProtectedRequest } from "../../../types/app-request";
import Country, { countryModel } from "../../../database/model/Country";
import countryRepo from "../../../database/repository/countryRepo";

const router = express.Router();

router.get('/', (req, res) => {
  console.log("Request body : ", req.body);
  res.send("You are domain module!");
});

router.post('/domainCreate', validator(schema.domainInput), asyncHandler(async (req, res) => {
  const {domain:createdDomain} = await domainRepo.create({
   Domain_Name:req.body.Domain_Name,
   Domain_Description:req.body.Domain_Description,
   Reason:req.body.Reason,
   Other:req.body.Other,
  countryId:req.body.countryId,
   userId:req.body.userId
  } as DomainModel,req.body.userId,req.body.countryId)
    new SuccessResponse( req.t("Domain_create_sucess"), { domain:createdDomain}).send(res);
  })
);

router.get(
  '/domainid/:id',
  validator(schema.domainid,ValidationSource.PARAM),
  asyncHandler(async (req:ProtectedRequest, res) => {
  const domain = await domainRepo.findbyid(req.params.id);
  if (!domain) throw new BadRequestError(req.t("Domain_not_exist"));
  return new SuccessResponse(req.t("Sucess_Message"), domain).send(res);
  }),
);

router.get('/all',
asyncHandler(async (req, res) => {
 const domains=  await DomainModel.findAll({where:{}})
 return new SuccessResponse(req.t("All_domains"),domains).send(res);
})
);

router.delete('/remove/:id',
asyncHandler(async (req, res) => {
 const domains=  await DomainModel.destroy({where:{Domain_id:req.params.id}});
 return new SuccessMsgResponse(req.t("Delete_Domain")).send(res);
})
);

router.put(
  '/domainupdate/:id',
  validator(schema.domainid,ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
  const domain = await domainRepo.findbyid(req.params.id);
  if (!domain) throw new BadRequestError(req.t("Domain_not_exist"));
  const updatedomain= await domainRepo.update( req.body.Domain_Name,req.params.id, req.body.Domain_Description,req.body.countryId);
  const domain1 = await domainRepo.findbyid(req.params.id);
  return new SuccessResponse(req.t("Sucess_Message"),domain1).send(res);
  }), 
);

export default router;