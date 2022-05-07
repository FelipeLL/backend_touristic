import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ImageModel = db.define(
    "imagenes",
    {
        ID_Imagen: { type: DataTypes.INTEGER, primaryKey: true },
        ID_Estacion: { type: DataTypes.INTEGER, primaryKey: true },
        type: { type: DataTypes.STRING },
        name: { type: DataTypes.STRING },
        data: { type: DataTypes.BLOB },

    },
    {
        freezeTableName: true,
    }
);

export default ImageModel;