import {UserRepository} from "../../Infrastructure/repositories/UserRepository";
import {AppError} from "../../shared/errors/AppError";
import bcrypt from "bcryptjs";
import {User} from "../../Domain/entities/User";
import {UserRegisterDTO} from "../../Api/DTOs/UserRegisterDTO";

export class RegisterUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userRequest: UserRegisterDTO): Promise<void> {
        const emailExists = await this.userRepository.findByEmail(userRequest.email);
        if (emailExists !== null) {
            throw new AppError("EMAIL_ALREADY_EXISTS");
        }

        const hashedPassword = await bcrypt.hash(userRequest.password, 10);
        const user = new User(userRequest.name, userRequest.email, hashedPassword);
        await this.userRepository.create(user);
    }
}
