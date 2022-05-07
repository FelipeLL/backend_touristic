import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";
import UserModel from "../models/UserModel.js";
import random from "string-random"
import { getTemplateCode, sendEmail } from "../config/mail.config.js"
export const login = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email
  let isOnline = null;
  let isAdmin = false;

  try {
    await UserModel.findOne({
      where: {
        Correo: req.body.email,
      },
    }).then(async (results) => {

      //Si el correo ingresado no existe en la base de datos O si la password es incorrecta
      if (
        results === null ||
        !(await bcryptjs.compare(password, results.password))
      ) {
        console.log("Email y/o contraseña incorrectos");
        isOnline = null;
      } else {
        if (results.status !== "verified") {
          console.log("El usuario no tiene la cuenta verificada");
        } else {

          const id = results.ID_Usuario;
          const tipo_usuario = results.ID_Tipo_usuario;

          //se determina si el usuario es administrador o no
          tipo_usuario === 1 ? (isAdmin = true) : (isAdmin = false);

          //Se establece que el usuario si esta registrado en la base de datos por lo tanto sera un usuario en linea (Online)
          isOnline = true;
          //Se genera el token
          const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          const cookiesOptions = {
            expires: new Date(
              Date.now() +
              parseInt(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          //Establecer la cookie con el nombre jwt el valor del token y las opciones de cookies
          res.cookie("jwt", token, cookiesOptions);
        }
      }
    });
    res.json({
      isAdmin: isAdmin,
      isOnline: isOnline,
    });
  } catch (error) {
    console.log(error);
  }
};

export const readToken = async (req, res) => {
  if (req.cookies.jwt) {
    res.json({ isToken: true });
  } else {
    res.json({ isToken: false });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.json({ message: "logout exitoso" })
};

export const isAuthenticated = async (req, res, next) => {
  //se llama a las cookies, el jwt es porque asi definimos que se llamaria la misma cookie

  //si la cookie existe entonces entra al if
  if (req.cookies.jwt) {
    try {
      //se decodifica el jwt donde esta almacenado el id del usuario
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      //se hace una consulta para buscar el id decodificado en la base de datos
      await PersonaModel.findOne({
        where: {
          ID_Persona: decodificada.id,
        },
      }).then((results) => {
        if (!results) {
          return next();
        }

        return next();
      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    console.log("no esta autenticado");
  }
};

export const recoverAccount = async (req, res) => {

  const email = req.body.email


  //consultar si existe el correo recibido en la bd
  try {

    await UserModel.findOne({
      where: {
        Correo: email,
      },
    }).then(async (results) => {

      if (!results) {
        //si no existe el usuario enviar un mensaje "falso" de que el email se envio 
        res.json({ message: "El email no existe" })
        return
      }

      //si existe el correo crear código con string-random
      let codigo = random(6)

      //enviar el código al correo 

      const template = getTemplateCode(results.nombre, codigo)
      await sendEmail(email, "Email de código", template)

      //enviar como respuesta el código al frontend para posteriormente compararlo con lo que escriba el usuario
      res.json({ message: "El email existe", codigo })

    })
  } catch (error) {
    console.log(error);
  }











}