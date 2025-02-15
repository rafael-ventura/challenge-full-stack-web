import {GetUser} from "../../../UseCases/Auth/GetUser";
import {UserRepository} from "../../../Infrastructure/repositories/UserRepository";
import {User} from "../../../Domain/entities/User";

describe("GetUser Use Case", () => {
    let getUserUseCase: GetUser;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        getUserUseCase = new GetUser(userRepository);

        jest.spyOn(userRepository, "getAll").mockResolvedValue([
            new User("John Doe", "john.doe@example.com", "hashed_password"),
            new User("Jane Doe", "jane.doe@example.com", "hashed_password"),
        ]);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return a list of users", async () => {
        const users = await getUserUseCase.execute();

        expect(users).toHaveLength(2);
        expect(users[0].name).toBe("John Doe");
        expect(users[1].name).toBe("Jane Doe");
    });

    it("should return an empty array if no users are found", async () => {
        jest.spyOn(userRepository, "getAll").mockResolvedValue([]);

        const users = await getUserUseCase.execute();

        expect(users).toEqual([]);
    });
});
