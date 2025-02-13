<template>
  <v-dialog v-model="modelValue" max-width="500px">
    <v-card>
      <v-card-title>Editar Aluno</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field label="Nome" v-model="student.name" :rules="[rules.required]" required/>
          <v-text-field label="E-mail" v-model="student.email" type="email" required/>
          <v-text-field label="RA (Registro Acadêmico)" v-model="student.ra" disabled/>
          <v-text-field label="CPF" v-model="student.cpf" disabled/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" variant="outlined" @click="closeModal">Cancelar</v-btn>
        <v-btn color="primary" variant="outlined" :disabled="!valid" class="btn-save" @click="saveChanges">
          Salvar Alterações
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, ref, watch} from "vue";
import {useStudentApi} from "@/composables/useStudentApi";
import {Student} from "@/models/Student";

const {updateStudent} = useStudentApi();
const props = defineProps<{ modelValue: boolean; student: Student | null }>();
const emit = defineEmits(["update:modelValue", "studentUpdated"]);

const student = ref<Student | null>(null);
const valid = ref(false);

watch(() => props.student, (newValue) => {
  student.value = newValue ? {...newValue} : null;
});

const rules = {required: (v: string) => !!v || "Este campo é obrigatório."};

const saveChanges = async () => {
  if (student.value) {
    await updateStudent(student.value.id!, student.value);
    emit("studentUpdated");
    closeModal();
  }
};

const closeModal = () => emit("update:modelValue", false);
</script>

