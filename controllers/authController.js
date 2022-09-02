import { login, read } from "../services/authService.js"

export const loginUser = async (req, res) => {
  try {
    let results = await login(req.body.email, req.body.password);
    console.log(results);
    res.cookie("jwt", results.token, results.cookiesOptions)
    res.json({ results })

  } catch (error) {
    res.status(400).send(error)
  }

}

export const readToken = async (req, res) => {

  try {
    if (req.cookies.jwt) {
      let results = await read(req.cookies.jwt)
      res.json(results);
    } else {
      res.json({ isToken: false });
    }
  } catch (error) {
    res.status(500).send(error)
  }

};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "logout exitoso" })
};

/* export const isAuthenticated = async (req, res, next) => {
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
}; */

/* export const recoverAccount = async (req, res) => {

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











} */