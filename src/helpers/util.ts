// Use lodash or vuex store
export const ObjectCopy = <T>(object: T): T => {
  return JSON.parse(JSON.stringify(object))
}
