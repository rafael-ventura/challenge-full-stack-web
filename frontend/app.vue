<template>
  <v-app>
    <Sidebar />
    <v-main class="main-container">
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<style lang="scss">
.main-container {
  transition: margin-left 0.3s ease-in-out;
}
</style>
