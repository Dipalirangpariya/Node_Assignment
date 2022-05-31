import {UserModel } from '../model/User';
import  { RoleModel } from '../model/Role';
import { InternalError } from '../../core/ApiError';
// import { InternalError } from '../../core/ApiError';


export default class UserRepo {
public findbyid(Id:string): Promise<UserModel | null>{
   return UserModel.findOne({where:{userId:Id}})
}
  public static findByEmail(email: string): Promise<UserModel |null> {
    return UserModel.findOne({ where:{email: email, status: true} })
  }

  public static findPublicProfileById(id: string): Promise<UserModel | null> {
    return UserModel.findOne({where:{ userId: id, status: true }});
  }

  public static async create(
    user: UserModel,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleid: string,
  ): Promise<{ user: UserModel }> {
    const now = new Date();
    const role = await RoleModel.findOne({ where:{ roleid:roleid}})  
    if (!role) throw new InternalError('Role must be defined');
    user.roleid= role.roleid;
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    return { user: createdUser};
  }

public static findProfileById(id: string): Promise<UserModel | null> {
    return UserModel.findOne({where:{ userId: id, status: true }})

  }
}
