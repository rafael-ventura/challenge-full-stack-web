import {CreateStudent} from "../../src/UseCases/Student/CreateStudent";
import {StudentRepository} from "../../src/Infrastructure/repositories/StudentRepository";
import {jest} from "@jest/globals";
import {Student} from "../../src/Domain/entities/Student";
import {StudentCreateDTO} from "../../src/Api/DTOs/StudentCreateDTO";

describe("Create Student Use Case", () => {
    let createStudentUseCase: CreateStudent;
    let studentRepository: StudentRepository;

    beforeEach(() => {
        studentRepository = new StudentRepository();
        createStudentUseCase = new CreateStudent(studentRepository);

        jest.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
        jest.spyOn(studentRepository, "findByRA").mockResolvedValue(null);
        jest.spyOn(studentRepository, "findByCPF").mockResolvedValue(null);
        jest.spyOn(studentRepository, "create").mockResolvedValue(
            new Student("John Doe", "john.doe@example.com", "12345", "12345678901")
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("✅ should create a student successfully", async () => {
        const studentDto: StudentCreateDTO = {
            name: "John Doe",
            email: "john.doe@example.com",
            ra: "14578",
            cpf: "12345678901",
        };

        const student = await createStudentUseCase.execute(studentDto);

        expect(student).toBeInstanceOf(Student);
        expect(student.name).toBe("John Doe");
        expect(student.email).toBe("john.doe@example.com");
    });

    it("❌ should throw an error when required fields are missing", async () => {
        const studentDto: StudentCreateDTO = {
            name: "",
            email: "",
            ra: "",
            cpf: "",
        };

        await expect(createStudentUseCase.execute(studentDto)).rejects.toMatchObject({
            internalCode: "VALIDATION_ERROR",
        });
    });

    it("❌ should throw an error if name is too short", async () => {
        const studentDto: StudentCreateDTO = {
            name: "J",
            email: "john.doe@example.com",
            ra: "12345",
            cpf: "12345678901",
        };
        await expect(createStudentUseCase.execute(studentDto)).rejects.toMatchObject({
            internalCode: "INVALID_NAME",
        })
    });

    it("❌ should throw an error if email is invalid", async () => {
        const studentDto: StudentCreateDTO = {
            name: "John Doe",
            email: "invalid-email",
            ra: "12345",
            cpf: "12345678901",
        };

        await expect(createStudentUseCase.execute(studentDto)).rejects.toMatchObject({internalCode: "INVALID_EMAIL"});
    });

    it("❌ should throw an error if CPF is invalid", async () => {
        const studentDto: StudentCreateDTO = {
            name: "John Doe",
            email: "john.doe@example.com",
            ra: "12345",
            cpf: "1234",
        };

        await expect(createStudentUseCase.execute(studentDto)).rejects.toMatchObject({internalCode: "INVALID_CPF"});
    });

    it("❌ should throw an error if email already exists", async () => {
        jest.spyOn(studentRepository, "findByEmail").mockResolvedValue(
            new Student("Existing User", "test@example.com", "67890", "98765432100")
        );

        const studentDto: StudentCreateDTO = {
            name: "John Doe",
            email: "test@example.com",
            ra: "12345",
            cpf: "12345678901",
        };

        await expect(createStudentUseCase.execute(studentDto)).rejects.toMatchObject({internalCode: "EMAIL_ALREADY_EXISTS"});
    });

    it("❌ should throw an error if RA already exists", async () => {
        jest.spyOn(studentRepository, "findByRA").mockResolvedValue(
            new Student("Another User", "another@example.com", "12345", "11122233344")
        );

        const studentDto: StudentCreateDTO = {
            name: "John Doe",
            email: "john.doe@example.com",
            ra: "12345",
            cpf: "12345678901",
        };

        await expect(createStudentUseCase.execute(studentDto)).rejects.toMatchObject({internalCode: "RA_ALREADY_EXISTS"});
    });

    it("❌ should throw an error if CPF already exists", async () => {
        jest.spyOn(studentRepository, "findByCPF").mockResolvedValue(
            new Student("User Exists", "existing@example.com", "54321", "12345678901")
        );

        const studentDto: StudentCreateDTO = {
            name: "John Doe",
            email: "john.doe@example.com",
            ra: "54321",
            cpf: "12345678901",
        };

        await expect(createStudentUseCase.execute(studentDto)).rejects.toMatchObject({internalCode: "CPF_ALREADY_EXISTS"});
    });
});
