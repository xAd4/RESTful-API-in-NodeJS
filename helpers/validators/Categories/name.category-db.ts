import { Category } from "../../../models/Category";

export const nameValidator = async (name: string) => {
  const category = await Category.findOne({ name });
  if (category)
    throw new Error(`Category with name ${category} exists already.`);
};
