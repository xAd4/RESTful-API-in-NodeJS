import { User } from "../../../models/User";

export const emailValidator = async (email: string) => {
  const emailExists = await User.findOne({ email });
  if (emailExists)
    throw new Error(`Email ${emailExists.email} exists already.`);
};
