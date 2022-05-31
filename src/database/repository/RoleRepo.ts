import Role, { RoleModel } from '../model/Role';

export default class RoleRepo {
  public static findByCode(code: string): Promise<RoleModel | null> {
    return RoleModel.findOne({ where:{roleid: code, status: true }});
  }
}
