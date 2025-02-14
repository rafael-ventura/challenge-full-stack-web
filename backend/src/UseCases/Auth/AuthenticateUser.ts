import {UserRepository} from "../../Infrastructure/repositories/UserRepository";
import {AppError} from "../../shared/errors/AppError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User} from "../../Domain/entities/User";
import {UserLoginDTO} from "../../Api/DTOs/UserLoginDTO";

export class AuthenticateUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userRequest: UserLoginDTO): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(userRequest.email);
        if (!user) {
            throw new AppError("EMAIL_NOT_FOUND");
        }
        console.log("senha 1", userRequest.password);
        console.log("senha 2", user.password);
        console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);
        const isPasswordValid = await bcrypt.compare(userRequest.password, user.password);
        if (!isPasswordValid) {
            throw new AppError("PASSWORD_INCORRECT");
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string);

        return {user, token};
    }
}
