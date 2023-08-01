import { ExampleService } from "./ExampleService";

describe("ExampleService", () => {
  let exampleService: ExampleService;

  beforeEach(() => {
    exampleService = new ExampleService();
  });

  it("should return a list of examples", () => {
    expect(exampleService.getExamples()).toStrictEqual([
      "shrey",
      "zain",
      "vish",
      "armeen",
    ]);
  });
});
