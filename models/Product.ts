import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  img: string;
  price: number;
  isAvailable: boolean;
  category: mongoose.Schema.Types.ObjectId;
  state: boolean;
}

const ProductSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String },
  price: { type: Number, required: true, default: 0 },
  isAvailable: { type: Boolean, default: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  state: { type: Boolean, default: true },
});

// Sacar elementos del JSON
ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);
