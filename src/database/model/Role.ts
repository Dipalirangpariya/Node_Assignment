import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional, Sequelize, UUIDV4 } from 'sequelize';

import { sequelize } from '../index';
import User from './User';

export interface Role{
  roleid:string;
  code:string;
  status:boolean;
  createdAt: Date;
  updatedAt:Date;
}

export const enum RoleCode {
  LEARNER = 'LEARNER',
  WRITER = 'WRITER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}

export type RoleCreationAttributes = Optional<Role, 'roleid'>;
export class RoleModel extends Model<Role, RoleCreationAttributes> implements Role {
   public roleid!: string;
   public code!: string;
   public status!: boolean;
   public createdAt!: Date;
   public updatedAt!: Date; 
}

export default function (sequelize: Sequelize): typeof RoleModel {
  RoleModel.init(
    {
    roleid:{
      type:DataTypes.UUID, 
      primaryKey:true, 
      defaultValue:UUIDV4

    },
    code: {
        type: DataTypes.ENUM(RoleCode.LEARNER, RoleCode.WRITER, RoleCode.EDITOR, RoleCode.ADMIN),
        allowNull:false,
        defaultValue:RoleCode.LEARNER,  
    },
    
    status: {
        type: DataTypes.BOOLEAN,
       defaultValue:true,
    },
  
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    } 
    },
    {
    sequelize,
    tableName:"Role"
    }
    );

    return RoleModel;
   
}

