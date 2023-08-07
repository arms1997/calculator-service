import { UserRepo } from "../User/UserRepo";
import { UserService } from "../User/UserService";
import { AuthService } from "./AuthService";

describe(AuthService.name, () => {
  let authService: AuthService;
  let userService: UserService;
  let userRepo: UserRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
    userService = new UserService(userRepo);
    authService = new AuthService(userService);

    userService.getUserByEmail = jest.fn().mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "test",
      password: "$2a$12$l2ZwACkp5RA6L4HXZLvIn.2/5IOTdk04oP.FDF0IhWERBl7XrPnPm",
    });

    userService.createNewUser = jest.fn().mockResolvedValue([1]);
    userService.getUserById = jest.fn().mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "test",
      password: "$2a$12$l2ZwACkp5RA6L4HXZLvIn.2/5IOTdk04oP.FDF0IhWERBl7XrPnPm",
    });

    userRepo.getUserByEmail = jest.fn().mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "test",
      password: "$2a$12$l2ZwACkp5RA6L4HXZLvIn.2/5IOTdk04oP.FDF0IhWERBl7XrPnPm",
    });
  });

  describe("AuthService.login", () => {
    it("should return a token and email", async () => {
      const result = await authService.login("test", "test");

      expect(result).toEqual({
        token: expect.any(String),
        email: "test",
      });
    });

    it("should throw an error if the password is invalid", async () => {
      userService.getUserByEmail = jest.fn().mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "test",
        password: "invalid",
      });

      await expect(authService.login("test", "test")).rejects.toThrow();
    });

    it("should throw an error if the user does not exist", async () => {
      userService.getUserByEmail = jest.fn().mockResolvedValue(null);

      await expect(authService.login("test", "test")).rejects.toThrow();
    });
  });

  describe("AuthService.register", () => {
    it("should return a token and email", async () => {
      const result = await authService.register({
        name: "John Doe",
        email: "test",
        password: "test",
      });

      expect(result).toEqual({
        token: expect.any(String),
        email: "test",
      });
    });

    it.skip("should throw an error if the user already exists", async () => {
      await expect(
        authService.register({
          name: "John Doe",
          email: "test",
          password: "test",
        })
      ).rejects.toThrow();
    });
  });
});
