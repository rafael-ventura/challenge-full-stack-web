<template>
  <v-sheet class="pa-4 sidebar-header">
    <v-img src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg" class="logo" contain></v-img>

    <v-avatar class="mb-2 avatar-overlay" size="64">
      <v-img src="https://randomuser.me/api/portraits/lego/8.jpg"></v-img>
    </v-avatar>

    <div class="text-white user-email">john.doe@example.com</div>
  </v-sheet>

  <v-divider></v-divider>
</template>

<style scoped lang="scss">
@use "@/styles/app.scss" as app;

.sidebar-header {
  text-align: center;
  padding: 16px;
  position: relative;
  width: 100%;
  background-color: app.$red-light;
}

.logo {
  max-width: 30%;
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
</style>
