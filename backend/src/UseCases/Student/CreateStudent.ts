import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';
import {AppError} from '../../shared/errors/AppError';
import {Student} from '../../Domain/entities/Student';
import {StudentCreateDTO} from "../../Api/DTOs/StudentCreateDTO";

export class CreateStudent {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(studentData: StudentCreateDTO): Promise<Student> {
        await this.validateStudentData(studentData);

        const student = new Student(
            undefined,
            studentData.name,
            studentData.email,
            studentData.ra,
            studentData.cpf
        );

        return await this.studentRepository.create(student);
    }

    private async validateStudentData(studentData: StudentCreateDTO): Promise<void> {
        const {name, email, ra, cpf} = studentData;

        if (!name || !email || !ra || !cpf) {
            throw new AppError('FIELD_REQUIRED');
        }

        if (name.length < 2) {
            throw new AppError('INVALID_NAME');
        }

        if (!this.isValidEmail(email)) {
            throw new AppError('INVALID_EMAIL');
        }

        if (!this.isValidCPF(cpf)) {
            throw new AppError('INVALID_CPF');
        }

        const emailExists = await this.studentRepository.findByEmail(studentData.email);
        if (emailExists) {
            throw new AppError('EMAIL_ALREADY_EXISTS');
        }

        const raExists = await this.studentRepository.findByRA(studentData.ra);
        if (raExists) {
            throw new AppError('RA_ALREADY_EXISTS');
        }

        const cpfExists = await this.studentRepository.findByCPF(studentData.cpf);
        if (cpfExists) {
            throw new AppError('CPF_ALREADY_EXISTS');
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidCPF(cpf: string): boolean {
        const cpfRegex = /^\d{11}$/;
        return cpfRegex.test(cpf);
    }
}
