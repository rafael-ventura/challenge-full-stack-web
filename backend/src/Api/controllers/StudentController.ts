import {NextFunction, Request, Response} from 'express';
import {CreateStudent} from "../../UseCases/Student/CreateStudent";
import {ListStudents} from "../../UseCases/Student/ListStudents";
import {UpdateStudent} from "../../UseCases/Student/UpdateStudent";
import {CreateStudentDTO} from "../DTOs/CreateStudentDTO";
import {StudentResponseDTO} from "../DTOs/CreateStudentResponseDTO";
import {UpdateStudentDTO} from "../DTOs/UpdateStudentDTO";

export class StudentController {
    private createStudentUseCase: CreateStudent;
    private listStudentsUseCase: ListStudents;
    private updateStudentUseCase: UpdateStudent;

    constructor(createStudentUseCase: CreateStudent, listStudentsUseCase: ListStudents, updateStudentUseCase: UpdateStudent) {
        this.listStudentsUseCase = listStudentsUseCase;
        this.createStudentUseCase = createStudentUseCase;
        this.updateStudentUseCase = updateStudentUseCase;

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const studentData: CreateStudentDTO = req.body;
            const student = await this.createStudentUseCase.execute(studentData);
            return res.status(201).json(new StudentResponseDTO(student));
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const students = await this.listStudentsUseCase.execute();
            return res.status(200).json(students);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const studentId = parseInt(req.params.id);
            const studentData: UpdateStudentDTO = req.body;

            const updatedStudent = await this.updateStudentUseCase.execute(studentId, studentData);
            return res.status(200).json(new StudentResponseDTO(updatedStudent));
        } catch (error) {
            next(error);
        }
    }
}
