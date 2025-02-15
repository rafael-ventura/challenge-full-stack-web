import {UserRepository} from "../../Infrastructure/repositories/UserRepository";
import {AppError} from "../../shared/errors/AppError";
import bcrypt from "bcryptjs";
import {User} from "../../Domain/entities/User";
import {UserRegisterDTO} from "../../Api/DTOs/UserRegisterDTO";
import {DataUtils} from "../../shared/utils/dataUtils";

export class RegisterUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userRequest: UserRegisterDTO): Promise<void> {
        await this.validateUserData(userRequest);

        const hashedPassword = await bcrypt.hash(userRequest.password, 10);
        const user = new User(userRequest.name, userRequest.email, hashedPassword);
        await this.userRepository.create(user);
    }

    private async validateUserData(userRequest: UserRegisterDTO): Promise<void> {
        const {name, email, password} = userRequest;

        if (!name || !email || !password) {
            throw new AppError("FIELD_REQUIRED");
        }

        if (!DataUtils.isValidEmail(email)) {
            throw new AppError("INVALID_EMAIL");
        }

        if (name.length < 2) {
            throw new AppError("INVALID_NAME");
        }

        if (!DataUtils.isValidPassword(password)) {
            throw new AppError("INVALID_PASSWORD");
        }

        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError("EMAIL_ALREADY_EXISTS");
        }
    }
}
