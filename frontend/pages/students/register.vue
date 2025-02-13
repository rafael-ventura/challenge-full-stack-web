<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-card class="form-card">
      <v-card-title class="form-title">Cadastro de Aluno</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
              label="Nome"
              v-model="student.name"
              :rules="[rules.required]"
          />
          <v-text-field
              label="E-mail"
              v-model="student.email"
              :rules="[rules.required, rules.email]"
          />
          <v-text-field
              label="RA"
              v-model="student.ra"
              :rules="[rules.required]"
          />
          <v-text-field
              label="CPF"
              v-model="student.cpf"
              :rules="[rules.required, rules.cpf]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="grey" variant="outlined" @click="cancel">Cancelar</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="saveStudent">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStudentApi } from "@/composables/useStudentApi";
import { useRouter } from "vue-router";
import { useSnackbar } from "@/composables/useSnackbar";

const { createStudent } = useStudentApi();
const { showSnackbar } = useSnackbar();
const router = useRouter();

const student = ref({ name: "", email: "", ra: "", cpf: "" });
const form = ref(null);
const valid = ref(false);

const rules = {
  required: v => !!v || "Este campo é obrigatório.",
  email: v => /.+@.+\..+/.test(v) || "E-mail inválido.",
  cpf: v => /^\d{11}$/.test(v) || "CPF deve conter 11 números."
};

const saveStudent = async () => {
  if (!valid.value) return;
  try {
    await createStudent(student.value);
    showSnackbar("Aluno cadastrado com sucesso!", "success");
    router.push("/students"); // Volta para a listagem
  } catch (error) {
    showSnackbar("Erro ao cadastrar aluno!", "error");
  }
};

const cancel = () => {
  router.push("/students");
};
</script>

<style scoped lang="scss">
@import "@/styles/app.scss";

.fill-height {
  height: 100vh;
}

.form-card {
  width: 500px;
  padding: 20px;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>
