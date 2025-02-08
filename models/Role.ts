import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const RoleSchema: Schema<IRole> = new Schema({
  name: { type: String, required: true },
});

// Sacar elementos del JSON
RoleSchema.methods.toJSON = function () {
  const { __v, ...role } = this.toObject();
  return role;
};

export const Category: Model<IRole> = mongoose.model<IRole>(
  "Category",
  RoleSchema
);
