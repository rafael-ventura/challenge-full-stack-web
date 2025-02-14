<template>
  <v-row align="center" class="search-bar">
    <v-col cols="9">
      <v-text-field
          :model-value="searchQuery"
          @update:model-value="updateSearch"
          label="Digite sua busca"
          variant="outlined"
          dense
          hide-details
          append-inner-icon="mdi-magnify"
      />
    </v-col>
    <v-col cols="3" class="d-flex justify-end">
      <v-btn color="primary" @click="emit('addStudent')">Cadastrar Aluno</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  searchQuery: String,
});

const emit = defineEmits(["update:searchQuery", "addStudent"]);

const updateSearch = (value) => {
  emit("update:searchQuery", value);
};
</script>

<style scoped lang="scss">
.search-bar {
  margin-bottom: 0.2rem;
}

.search-input {
  height: 2.5rem;
}

.search-btn {
  font-size: 1rem;
}
</style>
