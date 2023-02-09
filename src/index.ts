import express from "express";
import { RegisterRoutes } from "./generatedRoutes/routes";

const app = express();

RegisterRoutes(app);

app.listen(3000, () => {
  console.log("express is listening ");
});
