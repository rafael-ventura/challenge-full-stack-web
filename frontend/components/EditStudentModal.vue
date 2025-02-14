<template>
  <v-dialog :model-value="modelValue" max-width="500px" @update:modelValue="emit('update:modelValue', $event)">
    <v-card>
      <v-card-title>Editar Aluno</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field label="Nome" v-model="student.name" :rules="[rules.required]" required/>
          <v-text-field label="E-mail" v-model="student.email" :rules="[rules.required, rules.email]" required/>
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
import {useNotification} from "@/composables/useNotification";
import {validationRules} from "@/utils/validationRules"; // 🔥 Importando regras de validação

const {snackbar, showNotification, closeNotification} = useNotification();
const { updateStudent } = useStudentApi();
const props = defineProps<{ modelValue: boolean; student: Student | null }>();
const emit = defineEmits(["update:modelValue", "studentUpdated"]);

const student = ref<Student | null>(null);
const form = ref<any>(null);
const valid = ref(false);

watch(() => props.student, (newValue) => {
  student.value = newValue ? { ...newValue } : null;
});

const rules = validationRules;

const saveChanges = async () => {
  if (!form.value?.validate()) return;

  if (student.value) {
    try {
      await updateStudent(student.value.id!, student.value);
      showNotification("Aluno atualizado com sucesso!", "success", 5000);
      emit("studentUpdated");
      closeModal();
    } catch (error) {
      showNotification("Erro ao atualizar aluno!", "error", 5000);
    }
  }
};

const closeModal = () => emit("update:modelValue", false);
</script>
