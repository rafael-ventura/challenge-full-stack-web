import { NextFunction, Request, Response } from 'express';
import { CreateStudent } from "../../UseCases/Student/CreateStudent";
import { CreateStudentDTO } from "../DTOs/CreateStudentDTO";
import { StudentResponseDTO } from "../DTOs/CreateStudentResponseDTO";

export class StudentController {
    private createStudentUseCase: CreateStudent;

    constructor(createStudentUseCase: CreateStudent) {
        this.createStudentUseCase = createStudentUseCase;
        this.create = this.create.bind(this);
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
}
