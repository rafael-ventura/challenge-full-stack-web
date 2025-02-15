import {NextFunction, Request, Response} from "express";
import {AuthenticateUser} from "../../UseCases/Auth/AuthenticateUser";
import {RegisterUser} from "../../UseCases/Auth/RegisterUser";
import {UserRepository} from "../../Infrastructure/repositories/UserRepository";
import {UserLoginDTO} from "../DTOs/UserLoginDTO";
import {UserRegisterDTO} from "../DTOs/UserRegisterDTO";
import {GetUser} from "../../UseCases/Auth/GetUser";
import {UserLoginResponseDTO} from "../DTOs/UserLoginResponseDTO";

const userRepository = new UserRepository();
const authUserUseCase = new AuthenticateUser(userRepository);
const registerUserUseCase = new RegisterUser(userRepository);
const getUserUseCase = new GetUser(userRepository);

export const AuthenticateController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRequest: UserLoginDTO = req.body;
            const response: UserLoginResponseDTO = await authUserUseCase.execute(userRequest);
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRequest: UserRegisterDTO = req.body;
            await registerUserUseCase.execute(userRequest);
            return res.status(201).json({message: "User created successfully"});
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await getUserUseCase.execute();
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
};
