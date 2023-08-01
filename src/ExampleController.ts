import { Controller, Get, Route } from "tsoa";
import { ExampleService } from "./ExampleService";

@Route("examples")
export class ExampleController extends Controller {
  constructor(private exampleService: ExampleService = new ExampleService()) {
    super();
  }

  @Get()
  public getExamples() {
    return this.exampleService.getExamples();
  }
}
