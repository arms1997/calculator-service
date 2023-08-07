import type { Knex } from "knex";
import { DATABASE_PASSWORD, DATABASE_USER } from "./src/Env";

const config: Record<string, Knex.Config> = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: "calculator",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

module.exports = config;
