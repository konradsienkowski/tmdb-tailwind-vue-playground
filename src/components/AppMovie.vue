<template>
  <div
    class="mb-5 flex flex-row items-start rounded-md bg-gray-700 p-5 shadow-lg"
  >
    <figure
      :class="`w-[${movies.config.images?.poster_sizes[2]}px] relative flex-shrink-0`"
    >
      <img
        class="rounded-lg"
        v-if="movie.poster_path"
        :src="`${movies.config.images?.base_url}${movies.config.images?.poster_sizes[2]}${movie.poster_path}`"
      />
      <span
        :class="`absolute top-4 -right-7 z-10 h-14 w-14 rounded-full bg-gradient-to-r ${badgeColor} flex items-center justify-center text-center text-xl font-bold text-white`"
        >{{ movie.vote_average }}</span
      >
    </figure>
    <div class="ml-8 px-4 py-3">
      <div class="mb-1">
        <span
          class="text-gray-400"
          v-for="(genre, i) in movie.genre_ids"
          :key="genre"
          >{{ movies.genres[genre].name
          }}<template v-if="i < movie.genre_ids.length - 1">, </template>
        </span>
      </div>
      <h2
        class="mb-4 border-b border-b-gray-600 pb-4 text-2xl font-semibold text-white"
      >
        {{ movie.title }}
      </h2>
      <div class="text-gray-300">
        {{ useExcerpt({ content: movie.overview }) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import Pinia store
import { useMoviesStore } from '@/stores/movies';
import type { Movie } from '@/stores/movies';

// Import composables, types & functions
import { useExcerpt } from '@/composables/useExcerpt';
import { computed, type ComputedRef } from 'vue';

// Define props
const props = defineProps<{
  movie: Movie;
}>();

// Use Pinia store
const movies = useMoviesStore();

// Set vote badge color based on average score
const badgeColor: ComputedRef<string | null> = computed(() => {
  if (props.movie.vote_average >= 8) return 'from-emerald-500 to-emerald-700';
  if (props.movie.vote_average < 8 && props.movie.vote_average > 6)
    return 'from-cyan-500 to-sky-600';
  if (props.movie.vote_average <= 6 && props.movie.vote_average > 3)
    return 'from-amber-500 to-orange-600';
  if (props.movie.vote_average <= 3) return 'from-orange-700 to-red-600';
  else return null;
});
</script>
