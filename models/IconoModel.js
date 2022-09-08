import db from "../database/db.js";

import { DataTypes } from "sequelize";

const IconoModel = db.define(
    "iconos",
    {
        ID_Icono: { type: DataTypes.INTEGER, primaryKey: true },
        nombre: { type: DataTypes.STRING },
        url: { type: DataTypes.STRING }
    },
    {
        freezeTableName: true,
    }
);

export default IconoModel;
