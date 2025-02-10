import { Student } from "../../Domain/entities/Student";

export class StudentResponseDTO {
    name: string;
    email: string;
    ra: string;
    cpf: string;

    constructor(student: Student) {
        this.name = student.name;
        this.email = student.email;
        this.ra = student.ra;
        this.cpf = student.cpf;
    }
}
