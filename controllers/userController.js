import bcryptjs from "bcryptjs";
import UserModel from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      where: { ID_Usuario: req.params.id },
    });
    res.json(user[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const password = req.body.password;
    //se encripta la pass
    let passHash = await bcryptjs.hash(password, 8);
    const user = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      correo: req.body.correo,
      password: passHash,
      ID_Tipo_usuario: 2,
    };
    await UserModel.create(user);

    res.json({ message: "Usuario insertado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    await UserModel.update(req.body, {
      where: { ID_Usuario: req.params.id },
    });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserModel.destroy({
      where: { ID_Usuario: req.params.id },
    });
    res.json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
