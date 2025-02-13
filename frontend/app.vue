<template>
  <v-app>
    <Sidebar v-model:drawer="drawer" />
    <v-main :class="{ 'main-expanded': drawer }">
      <Header @toggleSidebar="toggleSidebar" />
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

const drawer = ref(true);

const toggleSidebar = () => {
  drawer.value = !drawer.value;
};
</script>

<style lang="scss">
.main-expanded {
  transition: margin-left 0.3s ease-in-out;
}
</style>
