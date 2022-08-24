import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ImageModel = db.define(
    "imagenes",
    {
        ID_Imagen: { type: DataTypes.INTEGER, primaryKey: true },
        ID_Estacion: { type: DataTypes.INTEGER, primaryKey: true },
        etag: { type: DataTypes.STRING },
        name: { type: DataTypes.STRING },
        url: { type: DataTypes.STRING },

    },
    {
        freezeTableName: true,
    }
);

export default ImageModel;