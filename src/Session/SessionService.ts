import { UserService } from "../User/UserService";
import { Session } from "./Session";
import { SessionRepo } from "./SessionRepo";
import { SessionResponse } from "./SessionResponse";

export class SessionService {
  constructor(
    private sessionRepo = new SessionRepo(),
    private userService = new UserService()
  ) {}

  public async getSessions(email: string): Promise<SessionResponse[]> {
    const ctx = { fn: "SessionService.getSessions", email };
    console.info(ctx);

    const { id } = await this.userService.getUserByEmail(email);

    const sessions = await this.sessionRepo.getSessionsByUserId(id);

    return sessions.map((session) => ({
      id: session.id,
      calculation: session.calculation,
      createdAt: session.created_at,
    }));
  }

  public async createNewSession(
    email: string,
    calculation: string
  ): Promise<Session> {
    const ctx = { fn: "SessionService.createNewSession", email, calculation };
    console.info(ctx);

    const { id } = await this.userService.getUserByEmail(email);

    return await this.sessionRepo.createNewSession({
      userId: id,
      calculation,
    });
  }
}
