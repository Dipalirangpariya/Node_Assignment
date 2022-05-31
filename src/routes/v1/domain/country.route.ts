import express from "express";
import { SuccessResponse } from "../../../core/ApiResponse";
import { countryModel } from "../../../database/model/Country";
import countryRepo from "../../../database/repository/countryRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema";


const router = express.Router();

router.post('/countryCreate', validator(schema.countryInput), asyncHandler(async (req, res) => {
  const {country:createdCountry} = await countryRepo.create({
    countryName:req.body.countryName,
    cityList:req.body.cityList,
  } as countryModel)

    new SuccessResponse('Data Add sucessfull', { country:createdCountry}).send(res);
  })
);

export default router;