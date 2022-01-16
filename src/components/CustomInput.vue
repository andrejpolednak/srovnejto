<template>
    <div>
       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" :for="id">
        {{label}}
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
         :id="id"
         :value="value"
         :type="type"
         @input="$emit('valueChanged', $event.target.value, id)"
         @keyup.enter="$emit('collectionChanged', $event.target.value, id)">
      </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'CustomInput',
  emits: ['valueChanged', 'collectionChanged'],
  props: {
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      default: null
    },
    label: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">

</style>
