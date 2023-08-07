import { UserRepo } from "./UserRepo";
import { UserService } from "./UserService";

describe(UserService.name, () => {
  let userService: UserService;
  let userRepo: UserRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
    userService = new UserService(userRepo);
  });

  describe("UserService.createNewUser", () => {
    it("should return the new user's id", async () => {
      userRepo.getUserByEmail = jest.fn().mockResolvedValue(undefined);
      userRepo.createNewUser = jest.fn().mockResolvedValue([1]);

      const [id] = await userService.createNewUser("John Doe", "test", "test");

      expect(id).toEqual(1);
    });
  });

  describe("UserService.getUserById", () => {
    it("should return the user", async () => {
      userRepo.getUserById = jest.fn().mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "test",
        password:
          "$2a$12$l2ZwACkp5RA6L4HXZLvIn.2/5IOTdk04oP.FDF0IhWERBl7XrPnPm",
      });

      const result = await userService.getUserById(1);

      expect(result).toEqual({
        id: 1,
        name: "John Doe",
        email: "test",
        password:
          "$2a$12$l2ZwACkp5RA6L4HXZLvIn.2/5IOTdk04oP.FDF0IhWERBl7XrPnPm",
      });
    });
  });

  describe("UserService.getUserByEmail", () => {
    it("should return the user", async () => {
      userRepo.getUserByEmail = jest.fn().mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "test",
        password:
          "$2a$12$l2ZwACkp5RA6L4HXZLvIn.2/5IOTdk04oP.FDF0IhWERBl7XrPnPm",
      });

      const result = await userService.getUserByEmail("test");

      expect(result).toEqual({
        id: 1,
        name: "John Doe",
        email: "test",
        password:
          "$2a$12$l2ZwACkp5RA6L4HXZLvIn.2/5IOTdk04oP.FDF0IhWERBl7XrPnPm",
      });
    });
  });
});
