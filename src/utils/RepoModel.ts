import { Knex } from "knex";
import { db as dbConnection } from "..";

export abstract class RepoModel {
  constructor(protected db: Knex = dbConnection) {
    this.db = db;
  }

  protected abstract get tableName(): string;
}
