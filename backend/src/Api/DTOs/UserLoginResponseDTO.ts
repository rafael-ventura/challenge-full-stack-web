export class UserLoginResponseDTO {
    id: number;
    name: string;
    email: string;
    token: string;

    constructor(user: { id: number; name: string; email: string }, token: string) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.token = token;
    }
}
