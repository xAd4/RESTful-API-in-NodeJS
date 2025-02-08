import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";

// GET
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 100;
    const since = parseInt(req.query.since as string, 10) || 0;
    const query = { state: true };

    const [product, totalProducts] = await Promise.all([
      Product.find(query).skip(since).limit(limit),
      Product.countDocuments(query),
    ]);

    res.status(200).json({ totalProducts, product });
  } catch (error) {
    next(error);
  }
};

// GET by Id
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ msg: "OK" });
  } catch (error) {
    next(error);
  }
};

// POST
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, price, category } = req.body;
    const product = new Product({ name, description, price, category });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// PUT
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { state: false });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
