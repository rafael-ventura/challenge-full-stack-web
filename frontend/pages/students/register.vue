<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="4000">
      {{ snackbar.message }}
    </v-snackbar>

    <v-card class="form-card">
      <v-card-title class="form-title">
        {{ isEditMode ? "Editar Aluno" : "Cadastro de Aluno" }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field label="Nome" v-model="student.name" :rules="[rules.required]" required/>
          <v-text-field label="E-mail" v-model="student.email" :rules="[rules.required, rules.email]" required/>
          <v-text-field
              label="RA (Registro Acadêmico)"
              v-model="student.ra"
              :rules="[rules.required, rules.numeric]"
              required
              @input="student.ra = student.ra.replace(/\D/g, '')"
          />
          <v-text-field
              label="CPF"
              v-model="student.cpf"
              :rules="[rules.required, rules.cpf]"
              required
              @input="student.cpf = student.cpf.replace(/\D/g, '')"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="grey" variant="outlined" @click="cancel">Cancelar</v-btn>
        <v-btn color="primary" variant="outlined" :disabled="!valid" class="btn-save" @click="saveStudent">
          {{ isEditMode ? "Salvar Alterações" : "Salvar" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStudentApi} from "@/composables/useStudentApi";
import {Student} from "@/models/Student";
import {getErrorMessage} from "@/utils/errorMessages";
import {useNotification} from "@/composables/useNotification";
import {validationRules} from "@/utils/validationRules"; // 🔥 Importando regras reutilizáveis

const {fetchStudents, updateStudent, createStudent} = useStudentApi();
const route = useRoute();
const router = useRouter();
const {snackbar, showNotification, closeNotification} = useNotification();

const student = ref(new Student());
const form = ref<any>(null);
const valid = ref(false);
const isEditMode = ref(false);

const rules = validationRules; // 🔥 Usando regras importadas

const saveStudent = async () => {
  if (!form.value?.validate()) return; // 🔥 Força a validação antes de salvar

  try {
    if (isEditMode.value) {
      await updateStudent(student.value.id!, {
        name: student.value.name,
        email: student.value.email,
      });
      showNotification("Aluno atualizado com sucesso!", "success");
    } else {
      await createStudent(student.value);
      showNotification("Aluno cadastrado com sucesso!", "success");
    }

    student.value = new Student();
    form.value?.resetValidation();
  } catch (error: any) {
    showNotification(getErrorMessage(error?.response?._data?.error, "Ocorreu um erro inesperado."), "error");
  }
};

const cancel = () => router.push("/students");

onMounted(async () => {
  if (route.query.id) {
    isEditMode.value = true;
    const result: Student[] = await fetchStudents();
    student.value = result.find((s: Student) => s.id === Number(route.query.id)) || new Student();
  }
});
</script>

<style scoped lang="scss">
@use "@/styles/app.scss";

.fill-height {
  height: 100vh;
}

.form-card {
  width: 80%;
  max-width: 90%;
  padding: 3%;
}

.form-title {
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
}

.btn-save {
  background-color: #c8102e !important;
  color: white !important;
  font-weight: bold;
  padding: 12px 24px;
  transition: background 0.3s;

  &:hover {
    background-color: rgba(#c8102e, 0.8) !important;
  }

  &:disabled {
    background-color: #cccccc !important;
    color: #888888 !important;
  }
}
</style>
