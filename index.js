import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Config } from "./config/index.js";
import db from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"
import estacionRoute from "./routes/estacionRoute.js"
import { fileURLToPath } from 'url';
import path, { dirname } from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

//para trabajar con las cookies.
app.use(cookieParser());

//sirve para procesar los datos enviados desde los forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));



app.use(express.static(path.join(__dirname, "dbimages")))

//routes
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/estaciones", estacionRoute);
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


