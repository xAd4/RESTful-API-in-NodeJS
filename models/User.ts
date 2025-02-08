import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { encryptPassword } from "../middlewares/encryptPassword";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  img?: string;
  role: string;
  state: boolean;
  google: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  img: { type: String },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

// Encriptación y hasheo de password
UserSchema.pre("save", encryptPassword);

// Comparación de password
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sacar elementos del JSON
UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
