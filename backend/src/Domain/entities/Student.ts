export class Student {
    public id?: number;
    public name: string;
    public email: string;
    public ra: string;
    public cpf: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(name: string, email: string, ra: string, cpf: string) {
        this.name = name;
        this.email = email;
        this.ra = ra;
        this.cpf = cpf;
    }
}
