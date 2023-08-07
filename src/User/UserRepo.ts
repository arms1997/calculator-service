import { db } from "../db";
import { RepoModel } from "../utils/RepoModel";
import { UserData, User } from "./User";

export class UserRepo extends RepoModel {
  constructor() {
    super(db);
  }

  protected get tableName(): string {
    return "user";
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.db(this.tableName).where({ email }).first();
  }

  public async getUserById(id: number): Promise<User> {
    return await this.db(this.tableName).where({ id }).first();
  }

  public async createNewUser(userData: UserData): Promise<number[]> {
    return await this.db(this.tableName).insert(userData);
  }

  public async updateUserById(id: number, userData: UserData): Promise<User> {
    return await this.db(this.tableName).where({ id }).update(userData);
  }
}
