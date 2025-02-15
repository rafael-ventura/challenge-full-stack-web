import {RegisterUser} from "../../../UseCases/Auth/RegisterUser";
import {UserRepository} from "../../../Infrastructure/repositories/UserRepository";
import {UserRegisterDTO} from "../../../Api/DTOs/UserRegisterDTO";
import {AppError} from "../../../shared/errors/AppError";
import bcrypt from "bcryptjs";

describe("RegisterUser Use Case", () => {
    let registerUserUseCase: RegisterUser;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        registerUserUseCase = new RegisterUser(userRepository);

        jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null);
        (jest.spyOn(bcrypt, "hash") as jest.Mock).mockResolvedValue("hashed_password");
        jest.spyOn(userRepository, "create").mockResolvedValue(undefined);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should register a user successfully", async () => {
        const registerDto: UserRegisterDTO = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "ValidPass123"
        };

        await expect(registerUserUseCase.execute(registerDto)).resolves.not.toThrow();
    });

    it("should throw an error if required fields are missing", async () => {
        const registerDto: UserRegisterDTO = {name: "", email: "", password: ""};

        await expect(registerUserUseCase.execute(registerDto))
            .rejects.toThrow(new AppError("FIELD_REQUIRED"));
    });

    it("should throw an error if email is invalid", async () => {
        const registerDto: UserRegisterDTO = {name: "John Doe", email: "invalid-email", password: "ValidPass123"};

        await expect(registerUserUseCase.execute(registerDto))
            .rejects.toThrow(new AppError("INVALID_EMAIL"));
    });

    it("should throw an error if name is too short", async () => {
        const registerDto: UserRegisterDTO = {name: "J", email: "john.doe@example.com", password: "ValidPass123"};

        await expect(registerUserUseCase.execute(registerDto))
            .rejects.toThrow(new AppError("INVALID_NAME"));
    });

    it("should throw an error if email already exists", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValue({
            id: 1,
            name: "Existing User",
            email: "existing@example.com",
            password: "hashed_password"
        });

        const registerDto: UserRegisterDTO = {
            name: "John Doe",
            email: "existing@example.com",
            password: "ValidPass123"
        };

        await expect(registerUserUseCase.execute(registerDto))
            .rejects.toThrow(new AppError("EMAIL_ALREADY_EXISTS"));
    });

    it("should throw an error if password does not meet requirements", async () => {
        const registerDto: UserRegisterDTO = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "123"
        };

        await expect(registerUserUseCase.execute(registerDto))
            .rejects.toThrow(new AppError("INVALID_PASSWORD"));
    });
});
