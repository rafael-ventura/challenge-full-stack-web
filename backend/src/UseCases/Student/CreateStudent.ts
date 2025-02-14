import {StudentRepository} from '../../Infrastructure/repositories/StudentRepository';
import {AppError} from '../../shared/errors/AppError';
import {Student} from '../../Domain/entities/Student';
import {StudentCreateDTO} from "../../Api/DTOs/StudentCreateDTO";
import {DataUtils} from "../../shared/utils/dataUtils";

export class CreateStudent {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async execute(studentData: StudentCreateDTO): Promise<Student> {
        await this.validateStudentData(studentData);

        const student = new Student(studentData.name, studentData.email, studentData.ra, studentData.cpf);

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

        if (!DataUtils.isValidEmail(email)) {
            throw new AppError('INVALID_EMAIL');
        }

        if (!DataUtils.isValidCPF(cpf)) {
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
}
