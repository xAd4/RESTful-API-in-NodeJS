import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

// GET
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 100;
    const since = parseInt(req.query.since as string, 10) || 0;
    const query = { state: true };

    const [users, totalUser] = await Promise.all([
      User.find(query).skip(since).limit(limit),
      User.countDocuments(query),
    ]);

    res.status(200).json({ totalUser, users });
  } catch (error) {
    next(error);
  }
};

// POST
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

// PUT
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { state: false });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
