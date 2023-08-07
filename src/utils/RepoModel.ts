import { Knex } from "knex";

export abstract class RepoModel {
  constructor(protected db: Knex) {
    this.db = db;
  }

  protected abstract get tableName(): string;
}
