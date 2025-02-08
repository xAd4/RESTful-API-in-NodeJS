import { check } from "express-validator";
import { emailValidator } from "./validators/Users/email.user-db";
import { IdValidator } from "./validators/Users/id.user-db";
import { validate } from "../middlewares/validate";
import { nameValidator } from "./validators/Categories/name.category-db";
import { IdCategoryValidator } from "./validators/Categories/id.category-db";

//* Users Validate
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

//* Categories Validate
// GET by ID
export const validateGetByIdCategory = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("id").custom(IdCategoryValidator),
  validate,
];

// POST
export const validatePostCategory = [
  check("name").custom(nameValidator),
  check("name").not().isEmpty().withMessage("Name is required"),
  validate,
];

// PUT & DELETE
export const validatePutAndDeleteCategory = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("id").custom(IdCategoryValidator),
  validate,
];

//* Products Validate
// POST
export const validatePostProduct = [];

// PUT & DELETE
export const validatePutAndDeleteProduct = [];

//* Uploads Validate
export const validateUploads = [];
