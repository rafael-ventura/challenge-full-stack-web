export class Student {
    public id?: number;
    public name: string;
    public email: string;
    public ra: string;
    public cpf: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(id: number | undefined, name: string, email: string, ra: string, cpf: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.ra = ra;
        this.cpf = cpf;
    }
}
