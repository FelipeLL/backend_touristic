import { Sequelize } from "sequelize";
import { Config } from "../config/index.js";


const db = new Sequelize(Config.database, Config.username, Config.password, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default db;


