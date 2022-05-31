import { InternalError } from '../../core/ApiError';
import { countryModel } from '../model/Country';
import domain,{ DomainModel } from '../model/domain';
import { UserModel } from '../model/User';

export default class domainRepo {
public static findbyid(id:any) :Promise<DomainModel | null >{
  return DomainModel.findOne({where:{Domain_id:id}})
}

public static async create(domain:DomainModel,userId:string,countryId:number): Promise<{domain:DomainModel}> {
    const now = new Date();
    const domains = await UserModel.findOne({ where:{ userId:userId}}) 
    const country = await countryModel.findOne({ where:{ countryId:countryId}}) 
    if (!domains) throw new InternalError('userid must be defined');
    if(!country) throw new InternalError('countryid must be defined');
    // if(Other){
    //   Other=domain.Other
    //   }
    // else{
    //   domain.userId= domains.userId;
    //   domain.createdAt = domains.updatedAt = now;
    //   domain.countryId=country.countryId;
    // }
    domain.userId= domains.userId;
    domain.createdAt = domains.updatedAt = now;
    domain.countryId=country.countryId;

    const createdDomain = await DomainModel.create(domain);
    return {domain:createdDomain};

  }

  public static update(domainName:any,id:any,domainDiscription:any,countryId:any): Promise<any> {
    return DomainModel.update({Domain_Name:domainName,Domain_id:id,Domain_Description:domainDiscription,countryId:countryId},{where:{Domain_id:id}})    
  }
  }


