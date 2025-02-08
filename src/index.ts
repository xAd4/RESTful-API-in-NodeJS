import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connectDB } from "../config/db";
import routes from "../routes/index";
require("dotenv").config();

const {
  UserRoutes,
  CategoryRoutes,
  ProductRoutes,
  SearchRoutes,
  UploadRoutes,
} = routes;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

// Rutas
app.use("/users", UserRoutes);
app.use("/categories", CategoryRoutes);
app.use("/products", ProductRoutes);
app.use("/search", SearchRoutes);
app.use("/uploads", UploadRoutes);

// Puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server ${PORT} running`);
});

// Conectar la base de datos
connectDB();
