import StudentModel from '../models/StudentModel';
import {Student} from '../../Domain/entities/Student';

export class StudentRepository {
    async create(student: Student): Promise<Student> {
        const createdStudent = await StudentModel.create({
            name: student.name,
            email: student.email,
            ra: student.ra,
            cpf: student.cpf,
        });

        return new Student(
            createdStudent.getDataValue('name'),
            createdStudent.getDataValue('email'),
            createdStudent.getDataValue('ra'),
            createdStudent.getDataValue('cpf')
        );
    }

    async findByEmail(email: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({ where: { email } });


        if (!studentModel) return null;

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

    async findAll(): Promise<Student[]> {
        const studentModels = await StudentModel.findAll();

        return studentModels.map(studentModel => new Student(
            studentModel.getDataValue('name'),
            studentModel.getDataValue('email'),
            studentModel.getDataValue('ra'),
            studentModel.getDataValue('cpf')
        ));
    }

    async findById(id: number): Promise<Student | null> {
        const studentModel = await StudentModel.findByPk(id);

        if (!studentModel) return null;

        return new Student(
            studentModel.getDataValue('name'),
            studentModel.getDataValue('email'),
            studentModel.getDataValue('ra'),
            studentModel.getDataValue('cpf')
        );
    }

    async update(id: number, student: Student): Promise<Student> {
        const [updated] = await StudentModel.update(
            {name: student.name, email: student.email},
            {where: {id}, returning: true}
        );

        if (!updated) throw new Error("Failed to update student");

        const updatedStudent = await this.findById(id);
        if (!updatedStudent) throw new Error("Failed to retrieve updated student");

        return updatedStudent;
    }

}
