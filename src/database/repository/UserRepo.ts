import {UserModel } from '../model/User';
import  { RoleModel } from '../model/Role';
import { InternalError } from '../../core/ApiError';
import { FormatedDateTime } from '../../helpers/DateTime';
// import { InternalError } from '../../core/ApiError';


export default class UserRepo {

/**
 * 
 * @param Id 
 * @returns json|null
 */
public findbyid(Id:string): Promise<UserModel | null>{
   return UserModel.findOne({where:{userId:Id}})
}
  public static findByEmail(email: string): Promise<UserModel |null> {
    return UserModel.findOne({ where:{email: email, status: true} })
  }
/**
 * 
 * @param id 
 * @returns json|null
 */
  public static findPublicProfileById(id: string): Promise<UserModel | null> {
    return UserModel.findOne({where:{ userId: id, status: true }});
  }
/**
 * 
 * @param user
 * @param roleid 
 * @returns json|null
 */
  public static async create(
    user: UserModel,
    roleid: string,
  ): Promise<{ user: UserModel }> {
    const now = new Date();
    const role = await RoleModel.findOne({ where:{ roleid:roleid}})  
    if (!role) throw new InternalError('Role must be defined');
    user.roleid= role.roleid;
    user.createdAt=(FormatedDateTime.currentUTCDateTime()) as unknown as Date; 
    user.updatedAt=(FormatedDateTime.currentUTCDateTime()) as unknown as Date; 
    const createdUser = await UserModel.create(user);
    return { user: createdUser};
  }
/**
 * 
 * @param id 
 * @returns json|null
 */
public static findProfileById(id: string): Promise<UserModel | null> {
    return UserModel.findOne({where:{ userId: id, status: true }})

  }
}
