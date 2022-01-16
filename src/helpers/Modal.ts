import { reactive, readonly } from 'vue'

type DialogState = {
  isOpen: boolean,
  type: string
}
const modal = reactive({
  name: [] as DialogState[]
})

// eslint-disable-next-line
export default function useToggleModal () {
  const toggleModal = (name = ''): void => {
    if (hasName(name) || name === '') {
      modal.name.pop()
    } else {
      modal.name.push({ type: name, isOpen: true })
    }
  }

  const hasName = (name = ''): boolean => {
    if (name === '') return false
    const findName = modal.name.find(currentName =>
      currentName.type === name
    )
    if (findName === undefined) return false

    return !!(findName.type === name && findName.isOpen === true)
  }

  return {
    state: readonly(modal),
    toggleModal,
    hasName
  }
}
