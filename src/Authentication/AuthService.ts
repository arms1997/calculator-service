import type { UserData } from "../User/User";
import { UserService } from "../User/UserService";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthError } from "./AuthError";
import { SECRET_KEY } from "../Env";
import type { AuthResponse } from "./AuthResponse";

export class AuthService {
  constructor(private readonly userService: UserService = new UserService()) {}

  public async login(email: string, password: string): Promise<AuthResponse> {
    const ctx = { fn: "AuthService.login", email, password };
    console.info("Logging in user", ctx);

    const user = await this.userService.getUserByEmail(email);

    const isPasswordValid = await this.isPasswordValid(password, user.password);

    if (!isPasswordValid) throw new Error(AuthError.INVALID_CREDENTIALS);

    return {
      token: this.createToken(email),
      email: user.email,
    };
  }

  public async register(userData: UserData): Promise<AuthResponse> {
    const ctx = { fn: "AuthService.register", userData };
    console.info("Registering new user", ctx);

    const [id] = await this.userService.createNewUser(
      userData.name,
      userData.email,
      userData.password
    );

    const user = await this.userService.getUserById(id);

    return {
      token: this.createToken(user.email),
      email: user.email,
    };
  }

  private async isPasswordValid(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  private createToken(email: string): string {
    return sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  }
}
