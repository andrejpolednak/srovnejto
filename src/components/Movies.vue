<template>
  <div class="flex justify-between px-5">
    <h1 class="text-5xl text-green-600">Movies list</h1>
    <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-600 rounded"
      @click="toggleModal('insertMovie')">
      Add movie
    </button>
  </div>
  <MovieCard v-for="movie of movies"
             :key="movie.name"
             :movie="movie"
             @reload-movies="fetchMovies" />

  <Dialog v-if="hasName('insertMovie')">
      <template #header>
        <h3> Add new movie </h3>
      </template>
      <template #body>
        <MovieDetail :movie={} ref="detailRef" />
      </template>
      <template #footer-action>
          <button class="modal-default-button" @click="createMovie">
            Save
          </button>
      </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MovieCard from './MovieCard.vue'
import useToggleModal from '../helpers/Modal'
import Dialog from './Dialog.vue'
import MovieDetail from './MovieDetail.vue'
import { fetchMoviesRepo, createMovieRepo } from '../data/repository'
import { Movie } from '@/data/types'

export default defineComponent({
  name: 'Movies',
  components: {
    MovieCard,
    MovieDetail,
    Dialog
  },
  setup () {
    const movies = ref([] as Movie[])
    const detailRef = ref<InstanceType<typeof MovieDetail>>()

    const { toggleModal, hasName } = useToggleModal()

    const fetchMovies = () => {
      fetchMoviesRepo().then(response => {
        movies.value = response
      })
    }

    const createMovie = (): void => {
      const createData = detailRef.value?.localMovie
      if (createData) {
        createMovieRepo(createData).then(() => {
          fetchMovies()
          toggleModal('')
        })
      }
    }

    fetchMovies()

    return {
      movies,
      toggleModal,
      hasName,
      fetchMovies,
      createMovie,
      detailRef
    }
  }

})
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
