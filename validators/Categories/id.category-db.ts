import { Category } from "../../models/Category";

export const IdCategoryValidator = async (id: any) => {
  const category = await Category.findById({ _id: id });
  if (!category) throw new Error(`category with id ${id} not found`);
};
