<template>
  <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="students"
      class="elevation-1 custom-table"
      :items-per-page="itemsPerPage"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn icon="mdi-pencil" variant="text" @click="editStudent(item)"></v-btn>
      <v-btn icon="mdi-delete" variant="text" @click="deleteStudentAction(item.id)"></v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Student } from "@/models/Student";

defineProps<{
  students: Student[];
  headers: { title: string; key: string; sortable?: boolean }[];
  loading: boolean;
  itemsPerPage: number;
  editStudent: (student: Student) => void;
  deleteStudentAction: (id: number) => void;
}>();
</script>

<style scoped lang="scss">
$red-primary: #c8102e;

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
