import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./generatedRoutes/routes";
import { ErrorHandlingMiddleware } from "./middleware/ErrorHandlingMiddleware";
import cors from "cors";
import dotenv from "dotenv";
import knex from "knex";
import { PORT } from "./Env";

dotenv.config();

const config = require("../knexfile");

const app = express();

export const db = knex(config.development);

app.use(cors());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log("express is listening");
});
