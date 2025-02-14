import {UserRepository} from "../../Infrastructure/repositories/UserRepository";
import {User} from "../../Domain/entities/User";

export class GetUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
}
