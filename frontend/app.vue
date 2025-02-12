<template>
  <v-app>
    <Sidebar />
    <v-container fluid class="main-container">
      <Header />
      <NuxtPage />
    </v-container>
  </v-app>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<style lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
