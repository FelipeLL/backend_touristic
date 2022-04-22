import EstacionModel from "../models/EstacionModel.js";

export const getAllEstaciones = async (req, res) => {
    try {
      const estaciones = await EstacionModel.findAll();
      res.json(estaciones);
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
