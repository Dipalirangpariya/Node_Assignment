import Joi from '@hapi/joi';

export default {

  domainInput:Joi.object().keys({
    Domain_Name:Joi.string().required().domain().message('valid_domain'),
    Domain_Description:Joi.string().required().min(5).max(150).message('Domain_Description length'),
    userId:Joi.string().required().min(2),
    countryId:Joi.number(),
    Reason:Joi.string().valid('BUSINESS','OTHER'),
    Other: Joi.string().when('Reason',{
      is:'OTHER',
      then: Joi.required(),
      otherwise:Joi.not
    })
  }),
 domainid:Joi.object().keys({
 id :Joi.number()
 }),

 domainupdate:Joi.object().keys({
  Domain_Name:Joi.string().required().min(3),
  Domain_Description:Joi.string().required().max(150),
}),
countryInput:Joi.object().keys({
  countryName:Joi.string().required().min(3),
  cityList:Joi.string()

})
};
