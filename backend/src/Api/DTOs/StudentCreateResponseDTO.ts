import { Student } from "../../Domain/entities/Student";

export class StudentCreateResponseDTO {
    id: number;
    name: string;
    email: string;
    ra: string;
    cpf: string;

    constructor(student: Student) {
        this.id = student.id || 0;
        this.name = student.name;
        this.email = student.email;
        this.ra = student.ra;
        this.cpf = student.cpf;
    }
}
