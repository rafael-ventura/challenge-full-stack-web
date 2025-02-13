<template>
  <v-navigation-drawer
      :model-value="drawer"
      @update:model-value="emit('update:drawer', $event)"
      app
      width="300"
  >
    <v-sheet class="pa-4 sidebar-header">
      <v-img
          src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
          class="logo"
          contain
      ></v-img>

      <v-avatar class="mb-2 avatar-overlay" size="64">
        <v-img src="https://randomuser.me/api/portraits/lego/8.jpg"></v-img>
      </v-avatar>

      <div class="text-white user-email">john.doe@example.com</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list-subheader class="subheader">Módulo Acadêmico</v-list-subheader>

    <v-list>
      <v-list-item
          prepend-icon="mdi-account-group"
          title="Alunos"
          to="/students"
          class="nav-item"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  drawer: Boolean,
});

const emit = defineEmits(["update:drawer"]);
</script>


<style scoped lang="scss">
$red-primary: #c8102e;
$red-dark: #a00d26;
$red-light: #e63946;
$grey-light: #f5f5f5;

.v-sheet {
  background-color: rgba($red-primary, 0.55);
}

.v-navigation-drawer {
  background-color: $grey-light;
  width: 30%;
}

.sidebar-header {
  text-align: center;
  padding: 16px;
  position: relative;
  width: 100%;
}

.logo {
  max-width: 120px;
  margin: 0 auto 10%;
}

.avatar-overlay {
  border: 3px solid white;
  margin-top: 5%;
}

.user-email {
  font-size: 1.2rem;
  margin-top: 3%;
}

.nav-item {
  color: #333;

  &:hover {
    background-color: rgba($red-light, 0.9);
    color: white;
  }
}

.subheader {
  padding-left: 10px;
  font-weight: bold;
  color: $red-dark;
  text-transform: uppercase;
}
</style>
