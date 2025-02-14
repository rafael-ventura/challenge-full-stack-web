import UserModel from "../models/UserModel";
import {User} from "../../Domain/entities/User";

export class UserRepository {
    async create(user: User): Promise<void> {
        await UserModel.create({
            name: user.name,
            email: user.email,
            password: user.password
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const userModel = await UserModel.findOne({where: {email}});
        if (!userModel) return null;
        return userModel.toJSON();
    }

    async getAll(): Promise<User[]> {
        const users = await UserModel.findAll();
        return users.map(user => user.toJSON());
    }
}
