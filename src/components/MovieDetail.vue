<template>
 <div class="container mx-auto  ">
     <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
         <CustomInput id="name" label="Name" :value="localMovie.name" @value-changed="valueChanged"/>
         <CustomInput id="year" label="Year" type="number" :value="localMovie.year" @value-changed="valueChanged"/>
         <CustomInput id="runtime" label="Runtime" type="number" :value="localMovie.runtime" @value-changed="valueChanged"/>
         <CustomInput id="director" label="Director" :value="localMovie.director" @value-changed="valueChanged"/>
     </div>
     <div class="grid grid-cols-1 pt-4">
         <div>
            <CustomInput id="categories" label="Categories"  @collection-changed="collectionChanged"/>
            <div class="flex flex-wrap">
                <span v-for="category in localMovie.categories" :key="category"
                    class="inline-flex items-center justify-center px-2 mb-1 py-1 mr-2 text-xs text-green-100 bg-green-600 rounded-full">{{category}}
                    <span class="hover:text-white cursor-pointer hover:text-bold text-green-100  ml-2 bg-green-600"
                        @click="removeFromCollection(category, 'categories')"> x </span>
                </span>
            </div>
         </div>
         <div>
            <CustomInput id="actors" label="Actors"  @collection-changed="collectionChanged"/>
            <div class="flex flex-wrap">
                <span v-for="actor in localMovie.actors" :key="actor"
                    class="inline-flex items-center justify-center px-2 mb-1 py-1 mr-2 text-xs text-green-100 bg-green-600 rounded-full">{{actor}}
                    <span class="hover:text-white cursor-pointer hover:text-bold text-green-100  ml-2 bg-green-600"
                        @click="removeFromCollection(actor, 'actors')"> x </span>
                </span>
            </div>
         </div>
        <CustomInput id="storyline" label="Storyline" type="textarea" :value="localMovie.storyline" @value-changed="valueChanged"/>

     </div>
 </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { defineComponent, ref } from '@vue/runtime-core'
import { Movie } from '@/data/types'
import { ObjectCopy } from '../helpers/util'
import CustomInput from './CustomInput.vue'

export default defineComponent({
  name: 'MovieDetail',
  components: {
    CustomInput
  },
  props: {
    movie: {
      type: Object as () => Movie,
      default: null
    },
    type: {
      type: String,
      default: 'edit'
    }
  },
  setup (props) {
    const localMovie = ref(ObjectCopy(props.movie))

    const valueChanged = (value: string | number, key: string): void => {
      if (value != null && key != null && key !== '') {
        (localMovie as Record<string, any>).value[key] = value
      }
    }

    const collectionChanged = (value: string | number, key: string): void => {
      if (value != null && key != null && key !== '') {
        // adding new movie and property is undefined
        if ((localMovie as Record<string, any>).value[key] == null) {
          (localMovie as Record<string, any>).value[key] = [value]
        } else {
          (localMovie as Record<string, any>).value[key].push(value)
        }
      }
    }

    const removeFromCollection = (value: string | number, key: string): void => {
      const index = (localMovie as Record<string, any>).value[key].findIndex((x: string | number) => x === value)

      if (index !== -1) {
        (localMovie as Record<string, any>).value[key].splice(index, 1)
      }
    }

    return {
      localMovie,
      valueChanged,
      collectionChanged,
      removeFromCollection
    }
  }
})
</script>

<style scoped lang="scss">

</style>
