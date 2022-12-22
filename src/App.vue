<template>
  <main class="main flex min-h-screen items-center justify-center bg-gray-800">
    <div class="wrapper w-[768px] pt-20 pb-32">
      <AppSearch />
      <AppList />
      <TheFooter>Copyright &copy; 2022</TheFooter>
    </div>
  </main>
</template>

<script setup lang="ts">
// Import Pinia store
import { useMoviesStore } from './stores/movies';

// Import components
import AppSearch from './components/AppSearch.vue';
import AppList from './components/AppList.vue';
import TheFooter from './components/TheFooter.vue';
import { onMounted } from 'vue';

// Get TMDb API configuration (for retrieving images)
const movies = useMoviesStore();
onMounted(() => {
  movies.getConfiguration();
  movies.getGenres();
});
</script>
