import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { uploadArchive } from "../helpers/uploadArchives";
import models from "../models";
import { UploadedFile } from "express-fileupload";
const { User, Product } = models;

export const uploads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.files || !req.files.archive) {
      res.status(400).json({ error: "Dont upload any archive." });
      return;
    }

    // Se fuerza el tipado de req.files para acceder a la propiedad archive
    const files = req.files as { archive: UploadedFile };
    const completePath = await uploadArchive(files, ["jpg", "png"], "texts");
    res.json({ path: completePath });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error." });
    }
  }
};

export const updateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { collection, id } = req.params;
    let model: any; // Idealmente, tipar con las interfaces de Mongoose correspondientes

    // Seleccionar el modelo adecuado según la colección
    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          res.status(400).json({ msg: `User with id ${id} not found` });
          return;
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          res.status(400).json({ msg: `Product with id ${id} not found` });
          return;
        }
        break;
      default:
        res.status(500).json({ msg: "Collection not allowed." });
        return;
    }

    // Eliminar la imagen anterior si existe (usando las promesas de fs para evitar bloqueo)
    if (model.img) {
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );
      try {
        await fs.promises.access(pathImage);
        await fs.promises.unlink(pathImage);
      } catch (err) {}
    }

    // Validar que se haya subido un archivo
    if (!req.files || !req.files.archive) {
      res.status(400).json({ msg: "Dont upload any archive." });
      return;
    }
    const files = req.files as { archive: UploadedFile };
    const name = await uploadArchive(files, undefined, collection);
    model.img = name;
    await model.save();

    res.json(model);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error." });
    }
  }
};

export const showImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { collection, id } = req.params;
    let model: any; // Idealmente, tipar con las interfaces de Mongoose correspondientes

    // Seleccionar el modelo adecuado según la colección
    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          res.status(400).json({ msg: `User with id ${id} not found` });
          return;
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          res.status(400).json({ msg: `Product with id ${id} not found` });
          return;
        }
        break;
      default:
        res.status(500).json({ msg: "Collection not allowed." });
        return;
    }
    if (model.img) {
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );

      if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
      }
    }

    const imageNotFound = path.join(__dirname, "../assets", "no-image.jpg");
    res.sendFile(imageNotFound);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error." });
    }
  }
};
