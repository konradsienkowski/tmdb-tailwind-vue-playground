<template>
  <footer class="mt-6 flex flex-row flex-wrap items-center justify-between">
    <div class="text-gray-400">
      <slot />
    </div>
    <div class="flex flex-row items-center text-sm text-gray-500">
      <span class="mr-4">Based on API by</span>
      <img :src="tmdbLogo" alt="The Movie DB" class="h-4 w-auto" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import tmdbLogo from '@/assets/img/tmdb.svg';
</script>
