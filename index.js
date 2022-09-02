import express from "express";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Config } from "./config/index.js";
import db from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"
import estacionRoute from "./routes/estacionRoute.js"
import imageRoute from "./routes/imageRoute.js"


const app = express();

//para trabajar con las cookies.
app.use(cookieParser());

//sirve para procesar los datos enviados desde los forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//carpeta temporal donde se van a estar "temporalmente" los archivos que se suben
app.use(fileUpload({
  tempFileDir: "/temp"
}))

const corsConfig = {
  credentials: true,
  origin: ['https://zoratama-map.netlify.app'],
};
app.use(cors(corsConfig));


//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/estaciones", estacionRoute);
app.use("/api/images", imageRoute);
//conexión a la base de datos
try {
  await db.authenticate();
  console.log("conexión exitosa a la BD");
} catch (error) {
  console.log("error a la BD: " + error);
}

app.get("/", (req, res) => {
  res.json({ message: "active" })
})

app.listen(Config.port, () => {
  console.log("server listening on port " + Config.port);
});


