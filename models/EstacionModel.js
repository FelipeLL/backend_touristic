import db from "../database/db.js";

import { DataTypes } from "sequelize";

const EstacionModel = db.define(
  "estaciones",
  {
    ID_Estacion: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    ID_Icono: { type: DataTypes.INTEGER },
    longitud: { type: DataTypes.DOUBLE },
    latitud: { type: DataTypes.DOUBLE }
  },
  {
    freezeTableName: true,
  }
);

export default EstacionModel;
