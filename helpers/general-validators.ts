import { check } from "express-validator";
import { emailValidator } from "./validators/Users/email.user-db";
import { IdValidator } from "./validators/Users/id.user-db";
import { validate } from "../middlewares/validate";
import { RequestHandler } from "express";

// Users Validate

// POST
export const validatePostUser = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").not().isEmpty().withMessage("Email is required"),
  check("email").custom(emailValidator),
  check("password")
    .isLength({ min: 6 })
    .withMessage("The password must be long"),
  validate,
];

// PUT & DELETE
export const validatePutAndDeleteUser = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("id").custom(IdValidator),
  validate,
];
