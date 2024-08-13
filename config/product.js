import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'energy',
    'root',
    'Maradona@#',
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
      operatorsAliases: false
    }
  );

// export const sequelize = new Sequelize(
//   config.production.name,
//   config.production.user,
//   config.production.password,
//   {
//     host: config.production.host,
//     dialect: config.production.dialect,
//     pool: config.production.pool,
//     operatorsAliases: false
//   }
// );