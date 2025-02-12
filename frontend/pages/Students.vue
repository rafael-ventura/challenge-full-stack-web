<template>
  <v-container class="students-container">
    <v-card class="pa-4 mb-4" elevation="2">
      <v-row align="center">
        <v-col cols="6">
          <v-card-title class="text-h6">Consulta de Alunos</v-card-title>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="primary">Cadastrar Aluno</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-row class="mb-4">
      <v-col cols="6">
        <v-text-field
            v-model="search"
            label="Digite sua busca"
            variant="outlined"
            dense
            hide-details
            append-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>

    <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

    <v-data-table
        v-if="!loading"
        :headers="headers"
        :items="filteredStudents"
        class="elevation-1 custom-table"
        :items-per-page="itemsPerPage"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-pencil" variant="text" @click="editStudent(item)"></v-btn>
        <v-btn icon="mdi-delete" variant="text" @click="deleteStudentAction(item.id)"></v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStudentApi } from "@/composables/useStudentApi";

const { fetchStudents, deleteStudent } = useStudentApi();
const students = ref([]);
const search = ref("");
const itemsPerPage = ref(5);
const loading = ref(false);

const headers = [
  { title: "Registro Acadêmico", key: "ra" },
  { title: "Nome", key: "name" },
  { title: "CPF", key: "cpf" },
  { title: "Ações", key: "actions", sortable: false },
];

const filteredStudents = computed(() => {
  if (!search.value) return students.value;
  return students.value.filter((student) =>
      student.name.toLowerCase().includes(search.value.toLowerCase()) ||
      student.ra.toLowerCase().includes(search.value.toLowerCase()) ||
      student.cpf.includes(search.value)
  );
});

const loadStudents = async () => {
  loading.value = true;
  try {
    const result = await fetchStudents();
    console.log("🔵 Dados recebidos da API:", result);

    if (Array.isArray(result)) {
      students.value = result;
    } else if (result && result.data) {
      students.value = result.data; // Caso a API retorne um objeto com { data: [...] }
    } else {
      students.value = [];
    }
  } catch (error) {
    console.error("❌ Erro ao carregar alunos:", error);
    students.value = [];
  }
  loading.value = false;
};

const editStudent = (student) => {
  console.log(`Editando aluno: ${student.name}`);
};

const deleteStudentAction = async (id) => {
  await deleteStudent(id);
  await loadStudents();
};

onMounted(loadStudents);
</script>

<style lang="scss">
$red-primary: #c8102e;
$red-light: #e63946;
$grey-light: #f5f5f5;

.students-container {
  width: calc(100% - 150px);
  transition: margin-left 0.3s ease-in-out;
}

.custom-table {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  th {
    background-color: $red-primary;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px;
  }
}
</style>
