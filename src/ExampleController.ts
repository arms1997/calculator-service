import { Controller, Get, Route } from "tsoa";
import { ExampleService } from "./ExampleService";

@Route("examples")
export class ExampleController extends Controller {
  constructor(
    private readonly exampleService: ExampleService = new ExampleService()
  ) {
    super();
  }

  @Get()
  public getExamples(): string[] {
    return this.exampleService.getExamples();
  }
}
