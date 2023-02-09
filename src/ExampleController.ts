import { ExampleService } from "./ExampleService";

export class ExampleController {
  constructor(private exampleService: ExampleService = new ExampleService()) {}

  public getExamples() {
    return this.exampleService.getExamples();
  }
}
