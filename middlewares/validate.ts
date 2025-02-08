import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Middleware para validar los errores de las validaciones
export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
