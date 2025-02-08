import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  state: boolean;
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  state: { type: Boolean, default: true },
});

// Sacar elementos del JSON
CategorySchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  CategorySchema
);
