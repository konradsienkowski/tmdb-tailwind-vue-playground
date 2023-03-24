<template>
  <form class="search flex flex-row flex-wrap" @submit="search">
    <input
      class="mr-3 h-12 flex-1 rounded-lg px-4 text-gray-800 placeholder-gray-500 outline-none"
      type="search"
      name="movie-title"
      placeholder="Enter movie title..."
      v-model="movies.query"
    />
    <button type="submit" class="btn-primary h-12">Search</button>
    <div class="mt-4 flex w-full flex-row">
      <div class="mr-4 flex flex-row items-center">
        <input
          type="radio"
          id="movie"
          name="type"
          value="movie"
          v-model="movies.type"
          checked
          class="mr-2"
        />
        <label for="movie" class="text-sm text-gray-400">Movies</label>
      </div>
      <div class="mr-4 flex flex-row items-center">
        <input
          type="radio"
          id="tv"
          name="type"
          value="tv"
          v-model="movies.type"
          class="mr-2"
        />
        <label for="tv" class="text-sm text-gray-400">TV shows</label>
      </div>
    </div>
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
