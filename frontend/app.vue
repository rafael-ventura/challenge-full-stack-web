<template>
  <v-app>
    <Sidebar v-if="isAuthenticated" v-model:drawer="drawer"/>
    <v-main :class="{ 'main-expanded': drawer, 'main-collapsed': !drawer }">
      <Header v-if="isAuthenticated" @toggleSidebar="toggleSidebar"/>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import {useState} from "#app";

const drawer = ref(true);
const toggleSidebar = () => {
  drawer.value = !drawer.value;
};

const isAuthenticated = useState("isAuthenticated", () => false);

onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem("token");
    isAuthenticated.value = !!token;
  }
});

const checkAuth = () => {
  if (process.client) {
    const token = localStorage.getItem("token");
    isAuthenticated.value = !!token;

    if (!token) {
      navigateTo("/auth/login");
    }
  }
};

watchEffect(checkAuth);
</script>

<style lang="scss">
.main-expanded {
  transition: margin-left 0.3s ease-in-out;
}

.main-collapsed {
  margin-left: 0;
  transition: margin-left 0.3s ease-in-out;
}
</style>
