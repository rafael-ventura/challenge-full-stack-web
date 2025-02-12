export class StudentApi {
    private apiBaseUrl: string;

    constructor() {
        const config = useRuntimeConfig();
        this.apiBaseUrl = config.public.apiBaseUrl;
    }

    async fetchStudents() {
        try {
            const { data } = await useFetch(`${this.apiBaseUrl}/students`);
            return data.value || [];
        } catch (error) {
            console.error("Failed to fetch students:", error);
            return [];
        }
    }

    async createStudent(student: { name: string; email: string; ra: string; cpf: string }) {
        try {
            const { data } = await useFetch(`${this.apiBaseUrl}/students`, {
                method: "POST",
                body: student,
            });
            return data.value;
        } catch (error) {
            console.error("Failed to create student:", error);
        }
    }

    async updateStudent(id: number, student: { name?: string; email?: string }) {
        try {
            const { data } = await useFetch(`${this.apiBaseUrl}/students/${id}`, {
                method: "PUT",
                body: student,
            });
            return data.value;
        } catch (error) {
            console.error("Failed to update student:", error);
        }
    }

    async deleteStudent(id: number) {
        try {
            await useFetch(`${this.apiBaseUrl}/students/${id}`, { method: "DELETE" });
        } catch (error) {
            console.error("Failed to delete student:", error);
        }
    }
}
