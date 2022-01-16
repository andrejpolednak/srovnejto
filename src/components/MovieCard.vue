<template>
  <div class="card flex ">
    <div class="flex justify-start md:justify-between p-3 w-full text-left md:text-center flex-col md:flex-row grow items-center">
      <p class="w-full md:w-1/4 text-xl font-bold">
          {{ movie.name }}
      </p>
      <p class="w-full md:w-1/4 text-xl ">
          {{ movie.director }}
      </p>
      <p class="w-full md:w-1/4 text-xl ">
          {{ movie.year }}
      </p>
    </div>
    <div class="flex items-center p-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="toggleModal('movieDetail-'+ movie.name)">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="toggleModal('confirmRemove-'+ movie.name)">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>

  <Dialog v-if="hasName('movieDetail-'+ movie.name)">
      <template #header>
        <h3 ref="movieDetail"> Edit: {{movie.name}} </h3>
      </template>
      <template #body>
        <MovieDetail :movie="movie" ref="detailRef" />
      </template>
      <template #footer-action>
          <button class="modal-default-button" @click="updateMovie">
            Save
          </button>
      </template>
  </Dialog>

  <Dialog v-if="hasName('confirmRemove-'+ movie.name)">
      <template #body>
        <p> Are you sure that you want to delete <span class=" text-xl font-bold"> {{ movie.name }} </span> record? </p>
      </template>
      <template #footer-action>
        <button class="modal-default-button" @click="deleteMovie">
          Ok
        </button>
      </template>
  </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Movie } from '@/data/types'
import Dialog from './Dialog.vue'
import MovieDetail from './MovieDetail.vue'
import useToggleModal from '../helpers/Modal'
import { deleteMovieRepo, updateMovieRepo } from '@/data/repository'

export default defineComponent({
  name: 'MovieCard',
  components: {
    Dialog,
    MovieDetail
  },
  emits: ['reloadMovies'],
  props: {
    movie: {
      type: Object as () => Movie,
      default: null
    }
  },
  setup (props, context) {
    const detailRef = ref<InstanceType<typeof MovieDetail>>()
    const { toggleModal, hasName } = useToggleModal()
    const deleteMovie = (): void => {
      deleteMovieRepo(props.movie.id).then(() => {
        context.emit('reloadMovies')
        toggleModal('')
      })
    }

    const updateMovie = (): void => {
      const createData = detailRef.value?.localMovie
      if (createData) {
        updateMovieRepo(createData).then(() => {
          context.emit('reloadMovies')
          toggleModal('')
        })
      }
    }

    return {
      toggleModal,
      hasName,
      deleteMovie,
      updateMovie,
      detailRef
    }
  }
})
</script>

<style scoped lang='scss'>
.card {
  min-height: 80px;
  margin: 10px 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);

  p {
    text-align: left;
  }
  .grow {
    flex-grow: 1;
  }
}

</style>
