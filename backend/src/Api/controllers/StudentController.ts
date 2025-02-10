import {NextFunction, Request, Response} from 'express';
import {CreateStudent} from "../../UseCases/Student/CreateStudent";
import {ListStudents} from "../../UseCases/Student/ListStudents";
import {CreateStudentDTO} from "../DTOs/CreateStudentDTO";
import {StudentResponseDTO} from "../DTOs/CreateStudentResponseDTO";

export class StudentController {
    private createStudentUseCase: CreateStudent;
    private listStudentsUseCase: ListStudents;

    constructor(createStudentUseCase: CreateStudent, listStudentsUseCase: ListStudents) {
        this.createStudentUseCase = createStudentUseCase;
        this.listStudentsUseCase = listStudentsUseCase;

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
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
}
