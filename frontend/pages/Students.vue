<template>
  <v-container class="students-container">
    <v-card class="pa-4 mb-4" elevation="2">
      <SearchBar :searchQuery="search" @update:searchQuery="search = $event" @addStudent="openAddStudentModal"/>
    </v-card>

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
import {computed, onMounted, ref} from "vue";
import {useStudentApi} from "@/composables/useStudentApi";
import SearchBar from "@/components/SearchBar.vue";

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
  students.value = await fetchStudents();
  loading.value = false;
};

const openAddStudentModal = () => {
  console.log("Abrir modal de cadastro de aluno");
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
