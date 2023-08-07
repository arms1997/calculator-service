import { RepoModel } from "../utils/RepoModel";
import type { Session, SessionData } from "./Session";

export class SessionRepo extends RepoModel {
  protected get tableName(): string {
    return "session";
  }

  public async getSessionsByUserId(userId: number): Promise<Session[]> {
    return await this.db(this.tableName).where({ userId });
  }

  public async createNewSession(sessionData: SessionData): Promise<Session> {
    return await this.db(this.tableName).insert(sessionData);
  }
}
