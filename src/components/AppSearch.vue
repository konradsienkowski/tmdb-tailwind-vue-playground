<template>
  <form class="search flex h-12 flex-row" @submit="search">
    <input
      class="mr-3 flex-1 rounded-lg px-4 text-gray-800 placeholder-gray-500 outline-none"
      type="search"
      placeholder="Enter movie title..."
      v-model="movies.query"
    />
    <button type="submit" class="btn-primary">Search</button>
  </form>
</template>

<script setup lang="ts">
import { watch } from 'vue';

// Use Pinia store
import { useMoviesStore } from '@/stores/movies';
const movies = useMoviesStore();

// Handle search submit
const search = (e: Event) => {
  e.preventDefault();
  movies.search();
};

// Clear search results if query was cleared
watch(
  () => movies.query,
  (query) => {
    if (!query) movies.results.list = [];
  }
);
</script>
