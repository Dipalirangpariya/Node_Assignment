import { InternalError } from '../../core/ApiError';
import { countryModel } from '../model/Country';
import domain,{ DomainModel } from '../model/domain';
import { UserModel } from '../model/User';

export default class domainRepo {

/**
 * find domain by id
 * @param id 
 * @returns json|null
 */
public static findbyid(id:any) :Promise<DomainModel | null >{
  return DomainModel.findOne({where:{Domain_id:id}})
}

/**
 * Create Domain
 * 
 * @param domain all domain 
 * @param userId  
 * @param countryId 
 * @returns json|null
 */
public static async create(domain:DomainModel,userId:string,countryId:number): Promise<{domain:DomainModel}> {
    const domains = await UserModel.findOne({ where:{ userId:userId}}) 
    const country = await countryModel.findOne({ where:{ countryId:countryId}}) 
    if (!domains) throw new InternalError('userid must be defined');
    if(!country) throw new InternalError('countryid must be defined');
   
    domain.userId= domains.userId;
    domain.updatedAt == domain.createdAt
    domain.countryId=country.countryId;

    const createdDomain = await DomainModel.create(domain);
    return {domain:createdDomain};
  }

  /**
   * Update Domain
   * 
   * @param domainName 
   * @param id 
   * @param domainDiscription 
   * @param countryId 
   * @returns json|null
   */
  public static update(domainName:any,id:any,domainDiscription:any,countryId:any): Promise<any> {
    return DomainModel.update({...domain},{where:{Domain_id:id}})    
  }
  }


