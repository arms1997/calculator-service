import express from "express";
import { ExampleController } from "./ExampleController";

const app = express();
const exampleController = new ExampleController();

app.get("/examples", (req, res) => {
  res.send(exampleController.getExamples());
});

app.listen(3000, () => {
  console.log("express is listening ");
});
