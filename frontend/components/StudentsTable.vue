<template>
  <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="students"
      class="elevation-1 custom-table"
      :items-per-page="itemsPerPage"
      item-value="ra"
  >
    <!-- Personalizando as colunas -->
    <template v-slot:item.ra="{ item }">
      {{ item.ra || "N/A" }}
    </template>

    <template v-slot:item.name="{ item }">
      {{ item.name || "Sem Nome" }}
    </template>

    <template v-slot:item.cpf="{ item }">
      {{ item.cpf || "Sem CPF" }}
    </template>

    <template v-slot:item.actions="{ item }">
      <div class="actions-column">
        <v-btn icon="mdi-pencil" variant="text" @click="editStudent(item)"></v-btn>
        <v-btn icon="mdi-delete" variant="text" @click="confirmDelete(item)"></v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Student } from "@/models/Student";

const props = defineProps<{
  students: Student[];
  headers: { title: string; key: string; sortable?: boolean }[];
  loading: boolean;
  itemsPerPage: number;
}>();

const emit = defineEmits(["editStudent", "deleteStudent"]);

const editStudent = (student: Student) => {
  if (!student?.ra) {
    console.warn("⚠️ Nenhum RA encontrado para edição.");
    return;
  }
  console.log("✏️ Editando aluno com RA:", student.ra);
  emit("editStudent", student);
};

const confirmDelete = (student: Student) => {
  if (!student?.ra) {
    console.warn("⚠️ Nenhum RA encontrado para exclusão.");
    return;
  }
  console.log("🟡 Preparando para excluir aluno com RA:", student.ra);
  emit("deleteStudent", student.ra);
};
</script>

<style lang="scss" scoped>
/* 🔴 Aplicando cor vermelha no header */
$red-primary: #b71c1c; // Vermelho forte
$red-dark: #9a0007; // Vermelho mais escuro para hover
$white-text: #ffffff;
$grey-light: #f5f5f5;

::v-deep(.v-data-table-header th) {
  background-color: $red-primary !important;
  color: $white-text !important;
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px;
  font-size: 16px;
  text-align: center;
}

.custom-table {
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  td {
    padding: 10px;
    text-align: center;
    font-size: 14px;
  }

  .actions-column {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
}
</style>
