import {Sequelize}  from 'sequelize';
import { db } from '../config';
import  DomainModel  from './model/domain';
import RoleModel  from './model/Role';
import UserModel from './model/User';
import  countryModel  from './model/Country';


export const sequelize = new Sequelize(`${db.name}`, `${db.user}`, `${db.password}`, {
  host: `${db.host}`,
  dialect: 'postgres',
});

export const dbUser = {
  User: UserModel(sequelize),
  sequelize,
  Sequelize
}

export const dbRole = {
  Role: RoleModel(sequelize),
  sequelize,
  Sequelize
}
export const dbDomain = {
  Domain : DomainModel(sequelize),
  sequelize,
  Sequelize
}
export const dbcountry = {
  Country: countryModel(sequelize),
  sequelize,
  Sequelize
}
sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.'); 
  await dbRole.Role.sync();
}).catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});

sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.'); 
  await dbUser.User.sync();
}).catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});

sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.'); 
  await dbDomain.Domain.sync();
}).catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});
sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.'); 
  await dbcountry.Country.sync();
}).catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});