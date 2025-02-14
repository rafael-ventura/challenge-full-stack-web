import StudentModel from "../models/StudentModel";
import {Student} from "../../Domain/entities/Student";

export class StudentRepository {
    async create(student: Student): Promise<Student> {
        const createdStudent = await StudentModel.create({
            name: student.name,
            email: student.email,
            ra: student.ra,
            cpf: student.cpf
        });

        return createdStudent.toJSON();
    }

    async findByEmail(email: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({ where: { email } });
        if (!studentModel) return null;
        return studentModel.toJSON();
    }

    async findByRA(ra: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({ where: { ra } });
        if (!studentModel) return null;
        return studentModel.toJSON();
    }

    async findByCPF(cpf: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({where: {cpf}});
        if (!studentModel) return null;
        return studentModel.toJSON();
    }

    async findAll(): Promise<Student[]> {
        const studentModels = await StudentModel.findAll();
        return studentModels.map(student => student.toJSON());
    }

    async findById(id: number): Promise<Student | null> {
        const studentModel = await StudentModel.findByPk(id);
        if (!studentModel) return null;
        return studentModel.toJSON();
    }

    async update(id: number, studentData: Partial<Student>): Promise<Student | null> {
        await StudentModel.update(studentData, {where: {id}});
        return this.findById(id);
    }

    async delete(id: number): Promise<number> {
        return await StudentModel.destroy({where: {id}});
    }
}
