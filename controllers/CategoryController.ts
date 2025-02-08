import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";

// GET
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 100;
    const since = parseInt(req.query.since as string, 10) || 0;
    const query = { state: true };

    const [category, totalCategories] = await Promise.all([
      Category.find(query).skip(since).limit(limit),
      Category.countDocuments(query),
    ]);

    res.status(200).json({ totalCategories, category });
  } catch (error) {
    next(error);
  }
};

// GET by Id
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// POST
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// PUT
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { state: false });

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
