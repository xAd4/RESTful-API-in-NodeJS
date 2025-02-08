// controllers/SearchController.ts
import { Request, Response } from "express";
import models from "../models";
import { searchCollection } from "../helpers/searchCollection";

const { User, Category, Product } = models;

export const searchUser = async (term: string, res: Response) => {
  return await searchCollection(
    term,
    User,
    (regex: RegExp) => ({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }],
    }),
    res
  );
};

export const searchCategory = async (term: string, res: Response) => {
  return await searchCollection(
    term,
    Category,
    (regex: RegExp) => ({
      name: regex,
      state: true,
    }),
    res
  );
};

export const searchProduct = async (term: string, res: Response) => {
  return await searchCollection(
    term,
    Product,
    (regex: RegExp) => ({
      $or: [{ name: regex }, { description: regex }],
      $and: [{ state: true }],
    }),
    res
  );
};

export const search = async (req: Request, res: Response): Promise<void> => {
  const { collection, term } = req.params;
  const collectionAllowed = ["users", "categories", "products"];

  if (!collectionAllowed.includes(collection)) {
    res.status(400).json({
      msg: `Las colecciones permitidas son: ${collectionAllowed.join(", ")}`,
    });
    return;
  }

  switch (collection) {
    case "users":
      await searchUser(term, res);
      break;
    case "categories":
      await searchCategory(term, res);
      break;
    case "products":
      await searchProduct(term, res);
      break;
    default:
      res.status(500).json({ msg: "Search not implemented." });
  }
};
