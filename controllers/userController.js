import bcryptjs from "bcryptjs";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { Config } from "../config/index.js"
import { getTemplate, sendEmail } from "../config/mail.config.js"
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
    console.log("ingresa");
    const password = req.body.password;
    const email = req.body.correo

    //verificar si el usuario ya existe en la base de datos

    const verifyEmailExist = await UserModel.findOne({
      where: {
        Correo: email,
      },
    })
    if (verifyEmailExist !== null) {

      res.json({ message: "El correo ya existe en la base de datos", emailExist: true })
    } else {
      console.log("el email no existe");
      //se encripta la pass
      let passHash = await bcryptjs.hash(password, 8);
      const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: email,
        password: passHash,
        ID_Tipo_usuario: 2,
        status: "unverified"
      };
      console.log(user);

      //generar token
      // const token = jwt.sign({ correo: email }, process.env.JWT_SECRET, {
      //   expiresIn: "7d",
      // });


      //obtener template
      //const template = getTemplate(req.body.nombre, token)

      //enviar email
      //await sendEmail(email, "Email de prueba 3", template)

      //crear user en la bd
      await UserModel.create(user);
      console.log("se creo el usuario en la bd");


      res.json({ message: "Usuario insertado correctamente" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const confirmAccount = async (req, res) => {
  try {

    //obtener token
    const { token } = req.params

    //verificar la data
    const decodificada = jwt.verify(token, Config.jwtSecret)



    //obteniendo el correo que esta en el token
    const { correo } = decodificada

    //buscar si existe el correo que trae la data (token)
    const user = await UserModel.findOne({
      where: {
        Correo: correo,
      },
    })

    //actualizar el status del usuario y redireccionar
    user.status = "verified"


    await UserModel.update(user.dataValues, {
      where: { ID_Usuario: user.ID_Usuario },
    });

    res.json({ message: "Usuario verificado correctamente" });



  } catch (error) {
    res.json({ message: error.message });
  }
}

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



