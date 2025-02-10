import StudentModel from '../models/StudentModel';
import { Student } from '../../Domain/entities/Student';

export class StudentRepository {
    async create(student: Student): Promise<Student> {
        const createdStudent = await StudentModel.create({
            name: student.name,
            email: student.email,
            ra: student.ra,
            cpf: student.cpf,
        });

        // 🔥 Retornando a entidade `Student` sem alterar a model
        return new Student(
            createdStudent.getDataValue('name'),
            createdStudent.getDataValue('email'),
            createdStudent.getDataValue('ra'),
            createdStudent.getDataValue('cpf')
        );
    }

    async findByEmail(email: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({ where: { email } });

        // 🔥 Se não encontrou, retorna `null`
        if (!studentModel) return null;

        // 🔥 Retornando a entidade `Student`
        return new Student(
            studentModel.getDataValue('name'),
            studentModel.getDataValue('email'),
            studentModel.getDataValue('ra'),
            studentModel.getDataValue('cpf')
        );
    }

    async findByRA(ra: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({ where: { ra } });

        if (!studentModel) return null;

        return new Student(
            studentModel.getDataValue('name'),
            studentModel.getDataValue('email'),
            studentModel.getDataValue('ra'),
            studentModel.getDataValue('cpf')
        );
    }
}
