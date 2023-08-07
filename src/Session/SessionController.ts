import { Controller, Get, Post, Route, Security, Request, Body } from "tsoa";
import type { Session } from "./Session";
import { SecurityType } from "../middleware/Authentication";
import { SessionService } from "./SessionService";
import type { SessionResponse } from "./SessionResponse";

@Route("session")
export class SessionController extends Controller {
  constructor(private readonly sessionService = new SessionService()) {
    super();
  }

  @Security(SecurityType.JWT)
  @Get()
  public async getSessions(
    @Request() request: any
  ): Promise<SessionResponse[]> {
    const { email } = request.user;

    return await this.sessionService.getSessions(email);
  }

  @Security(SecurityType.JWT)
  @Post()
  public async createSession(
    @Request() request: any,
    @Body()
    sessionData: {
      calculation: string;
    }
  ): Promise<Session> {
    const { email } = request.user;

    return await this.sessionService.createNewSession(
      email,
      sessionData.calculation
    );
  }
}
