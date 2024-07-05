import Sequelize from 'sequelize'

// module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    // export default new Sequelize('energy', 'root', 'Maradona@#', {
    export default new Sequelize('energy', 'root', 'password', {

    // host: 'mysql_db',
    host:'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
