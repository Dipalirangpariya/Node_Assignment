import {  DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface domain{
  Domain_id:number;
  Domain_Name:string;
  Domain_Description:string;
  Reason:string;
  Other:string;
  countryId:number;
  userId:string;
  createdAt: Date;
  updatedAt:Date;

}

export type DomainCreationAttributes = Optional<domain, 'Domain_id'>;

export class DomainModel extends Model<domain, DomainCreationAttributes> implements domain {
  public Domain_id!:number;
  public Domain_Name!: string;
  public Domain_Description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public Reason!:string;
  public Other!:string
  public userId!: string;
  public countryId!:number;
  
}

export default function (sequelize: Sequelize): typeof DomainModel {
  DomainModel.init(
    {
    Domain_id:{
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    Reason:{
     type:DataTypes.ENUM,
     allowNull:false,
     values:[
       'BUSINESS',
       'OTHER'
     ]
   },
   Other:{
        type:DataTypes.STRING
      
   },
    Domain_Name: {
        type: DataTypes.STRING,
        allowNull:false,
    },

    Domain_Description: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    userId:{
      type:DataTypes.UUID,
      references: {
          model: {
            tableName: 'User',
            schema:'public'
            },
          key: 'userId'
          },
      allowNull: false
      },
      countryId:{
        type:DataTypes.INTEGER.UNSIGNED,
        references: {
            model: {
              tableName: 'Country',
              schema:'public'
              },
            key: 'countryId'
            },
        allowNull: false
        },
    createdAt:{
      type:DataTypes.DATE,
    },

    updatedAt:{
      type:DataTypes.DATE,
    }, 
    },

    {
    sequelize,
    tableName:"Domain"
    }
   );

    return DomainModel;
   
}
