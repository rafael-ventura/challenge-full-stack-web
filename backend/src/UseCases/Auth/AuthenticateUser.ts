import {UserRepository} from "../../Infrastructure/repositories/UserRepository";
import {AppError} from "../../shared/errors/AppError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {UserLoginDTO} from "../../Api/DTOs/UserLoginDTO";
import {DataUtils} from "../../shared/utils/dataUtils";
import {UserLoginResponseDTO} from "../../Api/DTOs/UserLoginResponseDTO";

export class AuthenticateUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userRequest: UserLoginDTO): Promise<UserLoginResponseDTO> {
        const user = await this.userRepository.findByEmail(userRequest.email);
        await this.validateUserCredentials(user, userRequest.password);

        const token = jwt.sign({id: user!.id}, process.env.JWT_SECRET as string, {expiresIn: "1h"});

        return new UserLoginResponseDTO(
            {
                id: user!.id!,
                name: user!.name,
                email: user!.email
            },
            token
        );
    }

    private async validateUserCredentials(user: any, password: string): Promise<void> {
        if (!user) {
            throw new AppError("EMAIL_NOT_FOUND");
        }

        if (!DataUtils.isValidPassword(password)) {
            throw new AppError("INVALID_PASSWORD");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("INCORRECT_PASSWORD");
        }
    }
}
