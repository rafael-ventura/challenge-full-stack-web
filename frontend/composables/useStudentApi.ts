export function useStudentApi() {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const fetchStudents = async () => {
        try {
            const data = await $fetch(`${apiBaseUrl}/students`, {method: "GET"});
            return Array.isArray(data) ? data : data?.data || [];
        } catch (err) {
            console.error("❌ Erro ao buscar alunos:", err);
            return [];
        }
    };

    const createStudent = async (student: Student) => {
        try {
            const payload = {
                name: student.name,
                email: student.email
            };
            return await $fetch(`${apiBaseUrl}/students`, {
                method: "POST",
                body: payload,
            });
        } catch (err) {
            console.error("❌ Erro ao criar aluno:", err);
            throw err;
        }
    };

    const updateStudent = async (ra: string, student: Partial<Student>) => {
        try {
            return await $fetch(`${apiBaseUrl}/students/${ra}`, {
                method: "PUT",
                body: student,
            });
        } catch (err) {
            console.error("❌ Erro ao atualizar aluno:", err);
            throw err;
        }
    };

    const deleteStudent = async (id: number) => {
        try {
            return await $fetch(`${apiBaseUrl}/students/${id}`, {method: "DELETE"});
        } catch (err) {
            console.error("❌ Erro ao excluir aluno:", err);
            throw err;
        }
    };

    return {
        fetchStudents,
        createStudent,
        updateStudent,
        deleteStudent,
    };
}
