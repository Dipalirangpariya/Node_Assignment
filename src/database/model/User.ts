import { DataTypes, Model, Optional, Sequelize, UUIDV1, UUIDV4} from 'sequelize';
import { RoleModel } from './Role';

export interface User{
  userId:string;
  name:string;
  email:string;
  password:string;
  roleid:string;
  verified:boolean;
  status:boolean;
  createdAt: Date;
  updatedAt:Date;
  }

export type UserCreationAttributes = Optional<User, 'userId'>;


export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public userId!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleid!: string;
  public verified!: boolean;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
    userId:{
        type:DataTypes.UUID, 
        primaryKey:true, 
        defaultValue:UUIDV1
           },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
           },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
           },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
              },
    
    roleid:{
        type:DataTypes.UUID,
        references: {
            model: {
              tableName: 'Role',
              schema:'public'
              },
            key: 'roleid'
            },
        allowNull: false
           },
   
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
           },
   
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
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
    tableName:"User"
    }
    );
    return UserModel;
}

