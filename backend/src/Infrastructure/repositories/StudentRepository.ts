import StudentModel from "../models/StudentModel";
import {Student} from "../../Domain/entities/Student";

export class StudentRepository {
    private mapToEntity(model: StudentModel | null): Student | null {
        if (!model) return null;
        const data = model.toJSON();
        return new Student(data.id, data.name, data.email, data.ra, data.cpf);
    }

    async create(student: Student): Promise<Student> {
        const createdStudent = await StudentModel.create({
            name: student.name,
            email: student.email,
            ra: student.ra,
            cpf: student.cpf
        });

        const studentWithId = createdStudent.toJSON();
        return new Student(studentWithId.id, studentWithId.name, studentWithId.email, studentWithId.ra, studentWithId.cpf);
    }

    async findByEmail(email: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({ where: { email } });
        return this.mapToEntity(studentModel);
    }

    async findByRA(ra: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({ where: { ra } });
        return this.mapToEntity(studentModel);
    }

    async findByCPF(cpf: string): Promise<Student | null> {
        const studentModel = await StudentModel.findOne({where: {cpf}});
        return this.mapToEntity(studentModel);
    }

    async findAll(): Promise<Student[]> {
        const studentModels = await StudentModel.findAll();
        return studentModels.map(student => this.mapToEntity(student) as Student);
    }

    async findById(id: number): Promise<Student | null> {
        const studentModel = await StudentModel.findByPk(id);
        return this.mapToEntity(studentModel);
    }

    async update(id: number, studentData: Partial<Student>): Promise<Student | null> {
        await StudentModel.update(studentData, {where: {id}});
        return this.findById(id);
    }

    async delete(id: number): Promise<number> {
        return await StudentModel.destroy({where: {id}});
    }
}
