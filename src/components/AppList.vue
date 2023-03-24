<template>
  <div
    class="spinner mt-8 mb-12 flex flex-row items-center justify-center text-gray-400"
    v-if="movies.loading"
  >
    <img :src="spinner" class="mr-3" />
    Loading...
  </div>
  <div
    class="list mt-8 flex flex-col"
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
// Import spinner img
import spinner from '@/assets/img/spinner.gif';

// Import Pinia store
import { useMoviesStore } from '@/stores/movies';

// Import components
import AppMovie from './AppMovie.vue';

const movies = useMoviesStore();
</script>
