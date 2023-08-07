import { SALTS } from "../Env";
import { User } from "./User";
import { UserError } from "./UserError";
import { UserRepo } from "./UserRepo";
import { makeUserData } from "./UserUtils";
import { hash } from "bcrypt";

export class UserService {
  constructor(private userRepo = new UserRepo()) {}

  public async getUserByEmail(email: string): Promise<User> {
    const ctx = { fn: "UserService.getUserByEmail", email };
    console.info(ctx);

    const user = await this.userRepo.getUserByEmail(email);

    if (!user) throw new Error(UserError.USER_NOT_FOUND);

    return user;
  }

  public async getUserById(id: number): Promise<User> {
    const ctx = { fn: "UserService.getUserById", id };
    console.info(ctx);

    const user = await this.userRepo.getUserById(id);

    if (!user) throw new Error(UserError.USER_NOT_FOUND);

    return user;
  }

  public async createNewUser(
    name: string,
    email: string,
    password: string
  ): Promise<number[]> {
    const ctx = { fn: "UserService.createNewUser", name, email, password };
    console.info(ctx);

    const user = await this.userRepo.getUserByEmail(email);

    if (user) throw new Error(UserError.USER_ALREADY_EXISTS);

    const hashedPassword = await hash(password, SALTS);

    const userData = makeUserData(name, email, hashedPassword);

    return await this.userRepo.createNewUser(userData);
  }
}
