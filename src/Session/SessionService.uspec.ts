import { UserService } from "../User/UserService";
import { SessionRepo } from "./SessionRepo";
import { SessionService } from "./SessionService";

describe(SessionService.name, () => {
  let sessionService: SessionService;
  let userService: UserService;
  let sessionRepo: SessionRepo;

  beforeEach(() => {
    userService = new UserService();
    sessionRepo = new SessionRepo();
    sessionService = new SessionService(sessionRepo, userService);
  });

  describe("SessionService.getSessions", () => {
    it("should return the user's sessions", async () => {
      userService.getUserByEmail = jest.fn().mockResolvedValue({
        id: 1,
      });
      sessionRepo.getSessionsByUserId = jest.fn().mockResolvedValue([
        {
          id: 1,
          user_id: 1,
          calculation: "1 + 1 = 2",
          created_at: "2021-07-07T00:00:00.000Z",
        },
      ]);

      const result = await sessionService.getSessions("test");

      expect(result).toEqual([
        {
          id: 1,
          calculation: "1 + 1 = 2",
          createdAt: "2021-07-07T00:00:00.000Z",
        },
      ]);
    });
  });

  describe("SessionService.createNewSession", () => {
    it("should return the new session", async () => {
      userService.getUserByEmail = jest.fn().mockResolvedValue({
        id: 1,
      });
      sessionRepo.createNewSession = jest.fn().mockResolvedValue([1]);

      await sessionService.createNewSession("test", "1 + 1");

      expect(sessionRepo.createNewSession).toHaveBeenCalledWith({
        userId: 1,
        calculation: "1 + 1",
      });
    });
  });
});
