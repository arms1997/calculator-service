import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { AuthService } from "./AuthService";
import type { UserData } from "../User/User";
import type { AuthResponse } from "./AuthResponse";

@Route("auth")
export class AuthController extends Controller {
  constructor(private readonly authService: AuthService = new AuthService()) {
    super();
  }

  @SuccessResponse("200", "Success") // Custom success response
  @Post("/login")
  public async login(
    @Body() loginData: { email: string; password: string }
  ): Promise<AuthResponse> {
    return await this.authService.login(loginData.email, loginData.password);
  }

  @SuccessResponse("200", "Success") // Custom success response
  @Post("/register")
  public async register(@Body() userData: UserData): Promise<AuthResponse> {
    return await this.authService.register(userData);
  }
}
