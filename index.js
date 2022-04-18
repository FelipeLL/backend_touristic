import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Config } from "./config/index.js";
import db from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"

const app = express();

//para trabajar con las cookies
app.use(cookieParser());

//sirve para procesar los datos enviados desde los forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

//routes
app.use("/users", userRoute);
app.use("/auth", authRoute);

//conexión a la base de datos
try {
  await db.authenticate();
  console.log("conexión exitosa a la BD");
} catch (error) {
  console.log("error a la BD: " + error);
}

app.listen(Config.port, () => {
  console.log("server listening on port " + Config.port);
});
