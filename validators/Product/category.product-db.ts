import { Category } from "../../models/Category";

export const objectIdCategoryInProduct = async (id: any) => {
  const category = await Category.findById({ _id: id });
  if (!category) throw new Error(`Category with id ${id} not found.`);
};
