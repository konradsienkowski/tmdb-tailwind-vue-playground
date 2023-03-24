import { defineStore } from 'pinia'

// Get API instance and useAxios composable
import { api } from '@/services/ApiService';
import { useAxios } from '@vueuse/integrations/useAxios';

// Type state
export interface Movie {
  adult?: boolean,
  backdrop_path: string,
  first_air_date?: string,
  genre_ids: number[],
  id: number,
  name?: string,
  original_name?: string,
  origin_country?: string[],
  original_language: string,
  original_title?: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date?: string,
  title?: string,
  video?: boolean,
  vote_average: number,
  vote_count: number
}
interface TMDbConfig {
  change_keys?: string[],
  images?: {
    backdrop_sizes: string[],
    base_url: string,
    logo_sizes: string[],
    poster_sizes: string[],
    profile_sizes: string[],
    secure_base_url: string,
    still_sizes: string[]
  }
}
interface State {
  config: TMDbConfig,
  genres: {
    [key: number]: {
      name: string
    }
  },
  type: 'movie' | 'tv',
  query: string,
  results: {
    list: Movie[],
    page?: number,
    total_pages?: number,
    total_results?: number
  },
  loading: boolean
}

// Define movies store
export const useMoviesStore = defineStore({
  id: 'movies',
  state: (): State => ({
    config: {},
    genres: {},
    type: 'movie',
    query: '',
    results: {
      list: []
    },
    loading: false
  }),
  actions: {
    async getConfiguration () {
      try {
        const { data } = await useAxios(`/configuration?api_key=${import.meta.env.VITE_API_KEY}`, { method: 'GET' }, api);
        if (!data.value) return;
        this.config = data.value;
      } catch (error) {
        console.error(error);
      }
    },
    async getGenres () {
      try {
        const { data } = await useAxios(`/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`, { method: 'GET' }, api);
        if (!data.value) return;
        data.value.genres.forEach((genre: { id: number, name: string }) => {
          this.genres = { ...this.genres,
            [genre.id]: {
              name: genre.name
            }
          }
        })
      } catch (error) {
        console.error (error);
      }
    },
    async search () {
      this.loading = true;
      try {
        const { data } = await useAxios(`/search/${this.type}?api_key=${import.meta.env.VITE_API_KEY}&query=${this.query}`, { method: 'GET' }, api);
        if (!data.value) return;
        this.results = {
          list: data.value.results,
          page: data.value.page,
          total_pages: data.value.total_pages,
          total_results: data.value.total_results
        }
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    }
  }
})