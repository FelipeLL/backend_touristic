import { Sequelize } from "sequelize";
import { Config } from "../config/index.js";


const db = new Sequelize(Config.database, Config.username, Config.password, {
  host: "us-cdbr-east-05.cleardb.net",
  dialect: "mysql",
});

export default db;


