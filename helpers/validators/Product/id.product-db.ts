import { Product } from "../../../models/Product";

export const idProductValidator = async (id: any) => {
  const product = await Product.findById({ _id: id });
  if (!product) throw new Error(`Product with id ${id} not found.`);
};
