<template>
  <v-container>
    <!-- Título com Estilização -->
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

    <!-- Barra de Pesquisa -->
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

    <!-- Tabela de Alunos -->
    <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
        class="elevation-1"
        :items-per-page="itemsPerPage"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-pencil" variant="text" @click="editStudent(item)"></v-btn>
        <v-btn icon="mdi-delete" variant="text" @click="deleteStudent(item.id)"></v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { StudentApi } from "@/composables/StudentApi";

const studentApi = new StudentApi();
const students = ref([]);
const search = ref("");
const itemsPerPage = ref(5);

const headers = [
  { title: "Registro Acadêmico", key: "ra" },
  { title: "Nome", key: "name" },
  { title: "CPF", key: "cpf" },
  { title: "Ações", key: "actions", sortable: false }
];

const editStudent = (student) => {
  console.log("Edit student:", student);
};

const deleteStudent = async (id) => {
  await studentApi.deleteStudent(id);
  students.value = await studentApi.fetchStudents();
};

onMounted(async () => {
  students.value = await studentApi.fetchStudents();
});
</script>

<style lang="scss">
.v-data-table {
  max-width: 100%;
}
</style>
