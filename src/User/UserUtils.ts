import { UserData } from "./User";

export const makeUserData = (
  name: string,
  email: string,
  password: string
): UserData => ({
  name,
  email,
  password,
});
