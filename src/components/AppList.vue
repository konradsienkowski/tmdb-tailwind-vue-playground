<template>
  <div class="spinner mt-6 flex flex-row justify-center" v-if="movies.loading">
    Loading...
  </div>
  <div
    class="list mt-6 flex flex-col"
    v-if="!movies.loading && movies.results.list.length"
  >
    <AppMovie
      v-for="movie in movies.results.list"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
// Import Pinia store
import { useMoviesStore } from '@/stores/movies';

// Import components
import AppMovie from './AppMovie.vue';

const movies = useMoviesStore();
</script>
