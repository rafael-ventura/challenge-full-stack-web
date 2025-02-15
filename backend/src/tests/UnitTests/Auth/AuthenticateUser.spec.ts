import {AuthenticateUser} from "../../../UseCases/Auth/AuthenticateUser";
import {UserRepository} from "../../../Infrastructure/repositories/UserRepository";
import {User} from "../../../Domain/entities/User";
import jwt from "jsonwebtoken";
import {UserLoginDTO} from "../../../Api/DTOs/UserLoginDTO";
import {UserLoginResponseDTO} from "../../../Api/DTOs/UserLoginResponseDTO";
import {AppError} from "../../../shared/errors/AppError";
import bcrypt from "bcryptjs";


describe("AuthenticateUser Use Case", () => {
    let authenticateUserUseCase: AuthenticateUser;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        authenticateUserUseCase = new AuthenticateUser(userRepository);

        jest.spyOn(userRepository, "findByEmail").mockResolvedValue(
            new User("John Doe", "john.doe@example.com", "hashed_password")
        );

        (jest.spyOn(bcrypt, "compare") as jest.Mock).mockResolvedValue(true);
        jest.spyOn(jwt, "sign").mockImplementation(() => "mocked_jwt_token");

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should authenticate a user successfully", async () => {
        const loginDto: UserLoginDTO = {email: "john.doe@example.com", password: "Password.123"};

        const response: UserLoginResponseDTO = await authenticateUserUseCase.execute(loginDto);

        expect(response.name).toBe("John Doe");
        expect(response.token).toBe("mocked_jwt_token");
    });

    it("should throw an error if email is not found", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null);

        await expect(authenticateUserUseCase.execute({email: "notfound@example.com", password: "password"}))
            .rejects.toThrow(new AppError("EMAIL_NOT_FOUND"));
    });

    it("should throw an error if password is incorrect", async () => {
        (jest.spyOn(bcrypt, "compare") as jest.Mock).mockResolvedValue(false);

        await expect(authenticateUserUseCase.execute({email: "john.doe@example.com", password: "Password.123"}))
            .rejects.toThrow(new AppError("INCORRECT_PASSWORD"));
    });
});
