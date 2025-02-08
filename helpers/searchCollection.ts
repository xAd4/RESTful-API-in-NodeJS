import { Response } from "express";
import { Model } from "mongoose";
import { Types } from "mongoose";

export const searchCollection = async <T>(
  term: string,
  model: Model<T>,
  // Esta función recibe el regex y devuelve el objeto de condiciones para la consulta.
  queryCallback: (regex: RegExp) => object,
  res: Response
): Promise<Response> => {
  // Verifica si el término es un ObjectId válido
  if (Types.ObjectId.isValid(term)) {
    const document = await model.findById(term);
    return res.status(200).json({ results: document ? [document] : [] });
  }

  // Si no es un ID válido, crea un regex (insensible a mayúsculas)
  const regex = new RegExp(term, "i");

  // Ejecuta la consulta utilizando las condiciones que retorna queryCallback
  const documents = await model.find(queryCallback(regex));
  return res.status(200).json({ results: documents });
};
