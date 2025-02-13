<template>
  <v-row align="center" class="search-bar">
    <v-col cols="8">
      <v-text-field
          :model-value="searchQuery"
          @update:model-value="updateSearch"
          label="Digite sua busca"
          variant="outlined"
          density="comfortable"
          hide-details
          append-inner-icon="mdi-magnify"
          class="search-input"
      />
    </v-col>
    <v-col cols="4" class="d-flex justify-end">
      <v-btn color="primary" class="search-btn" @click="emit('addStudent')">
        Cadastrar Aluno
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";

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
  margin-bottom: 1rem;
}

.search-input {
  height: 2.5rem;
}

.search-btn {
  height: 2.5rem;
  min-width: 8rem;
  font-size: 0.9rem;
}
</style>
