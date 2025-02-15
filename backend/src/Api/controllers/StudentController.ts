import {NextFunction, Request, Response} from "express";
import {CreateStudent} from "../../UseCases/Student/CreateStudent";
import {ListStudents} from "../../UseCases/Student/ListStudents";
import {UpdateStudent} from "../../UseCases/Student/UpdateStudent";
import {DeleteStudent} from "../../UseCases/Student/DeleteStudent";
import {StudentCreateDTO} from "../DTOs/StudentCreateDTO";
import {StudentCreateResponseDTO} from "../DTOs/StudentCreateResponseDTO";
import {StudentUpdateDTO} from "../DTOs/StudentUpdateDTO";

export function StudentController(
    createStudentUseCase: CreateStudent,
    listStudentsUseCase: ListStudents,
    updateStudentUseCase: UpdateStudent,
    deleteStudentUseCase: DeleteStudent
) {
    return {
        create: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const studentData: StudentCreateDTO = req.body;
                const student = await createStudentUseCase.execute(studentData);

                return res.status(201).json(new StudentCreateResponseDTO(student));
            } catch (error) {
                next(error);
            }
        },

        getAll: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const students = await listStudentsUseCase.execute();
                return res.status(200).json(students);
            } catch (error) {
                next(error);
            }
        },


        update: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const studentId = parseInt(req.params.id);
                const studentData: StudentUpdateDTO = req.body;
                const updatedStudent = await updateStudentUseCase.execute(
                    studentId,
                    studentData
                );
                return res.status(200).json(new StudentCreateResponseDTO(updatedStudent));
            } catch (error) {
                next(error);
            }
        },

        delete: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const studentId = parseInt(req.params.id);
                await deleteStudentUseCase.execute(studentId);
                return res.status(204).send();
            } catch (error) {
                next(error);
            }
        },
    };
}
