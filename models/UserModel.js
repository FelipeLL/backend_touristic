import db from "../database/db.js";

import { DataTypes } from "sequelize";

const UserModel = db.define(
  "usuarios",
  {
    ID_Usuario: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    fotografia: { type: DataTypes.STRING },
    ID_Tipo_usuario: { type: DataTypes.INTEGER },

  },
  {
    freezeTableName: true,
  }
);

export default UserModel;
