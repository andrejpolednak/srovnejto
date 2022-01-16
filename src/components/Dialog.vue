<template>
 <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer">
            <div class="flex justify-between">
              <button class="modal-default-button" @click="toggleModal('')">
                Cancel
              </button>
              <slot name="footer-action">
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
import useToggleModal from '../helpers/Modal'

export default defineComponent({
  name: 'Dialog',
  setup () {
    const { toggleModal } = useToggleModal()

    return {
      toggleModal
    }
  }
})
</script>

<style scoped lang="scss">
    .modal-mask {
        padding: 2em;
    }
</style>
