import { User } from "../../../models/User";

export const IdValidator = async (id: any) => {
  const user = await User.findById({ _id: id });
  if (!user) throw new Error(`User with id ${id} not found`);
};
