import {  DataTypes, Model, Optional, Sequelize } from 'sequelize';


export interface country{
  countryId:number;
  countryName:string;
  cityList:string;
}

export type countryCreationAttributes = Optional<country, 'countryId'>;

export class countryModel extends Model<country, countryCreationAttributes> implements country {
  public countryId!:number;
  public countryName!: string;
  public cityList!: string;  
}

export default function (sequelize: Sequelize): typeof countryModel {
  countryModel.init(
    {
      countryId:{
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    countryName: {
        type: DataTypes.STRING,
        allowNull:false,
    },

    cityList: {
        type: DataTypes.STRING,
        allowNull:false,
    },
  },
    {
      sequelize,
      tableName:"Country"
      }
      );
    return countryModel; 
}