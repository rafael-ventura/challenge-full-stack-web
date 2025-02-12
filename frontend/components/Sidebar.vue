<template>
  <v-navigation-drawer v-model="drawer" app>
    <!-- Cabeçalho do Sidebar -->
    <v-sheet class="pa-4" color="#c8102e">
      <v-avatar class="mb-4" color="grey-darken-1" size="64">
        <v-img src="https://randomuser.me/api/portraits/lego/4.jpg"></v-img>
      </v-avatar>
      <div class="text-white">john.doe@example.com</div>
    </v-sheet>

    <v-divider></v-divider>

    <!-- Título do Módulo -->
    <v-list-subheader class="text-grey-darken-1">Módulo Acadêmico</v-list-subheader>

    <!-- Lista de Navegação -->
    <v-list>
      <v-list-item prepend-icon="mdi-account-group" title="Alunos" to="/students"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
const drawer = ref(true);
</script>
