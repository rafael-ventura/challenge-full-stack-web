export function useStudentApi() {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const fetchStudents = async () => {
        try {
            const { data, error } = await useFetch(`${apiBaseUrl}/students`, { method: "GET" });
            if (error.value) throw new Error(error.value.message);
            return data.value || [];
        } catch (err) {
            console.error("❌ Erro ao buscar alunos:", err);
            return [];
        }
    };

    const createStudent = async (student: Student) => {
        try {
            const { data, error } = await useFetch(`${apiBaseUrl}/students`, {
                method: "POST",
                body: student,
            });
            if (error.value) throw new Error(error.value.message);
            return data.value;
        } catch (err) {
            console.error("❌ Erro ao criar aluno:", err);
            throw err;
        }
    };

    const updateStudent = async (id: number, student: Partial<Student>) => {
        try {
            const { data, error } = await useFetch(`${apiBaseUrl}/students/${id}`, {
                method: "PUT",
                body: student,
            });
            if (error.value) throw new Error(error.value.message);
            return data.value;
        } catch (err) {
            console.error("❌ Erro ao atualizar aluno:", err);
            throw err;
        }
    };

    const deleteStudent = async (id: number) => {
        try {
            const { error } = await useFetch(`${apiBaseUrl}/students/${id}`, {
                method: "DELETE",
            });
            if (error.value) throw new Error(error.value.message);
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
