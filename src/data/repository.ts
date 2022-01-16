import axios from 'axios'
import { Movie } from './types'
const baseURL = 'http://localhost:3000/'

export const fetchMoviesRepo = (): Promise<Movie[]> => {
  return new Promise<Movie[]>((resolve, reject) => {
    axios.get(baseURL + 'movies').then(response => {
      resolve(response.data)
    }).catch(e => {
      reject(e)
      console.error(e)
    })
  })
}

export const updateMovieRepo = (data: Movie): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios.put(baseURL + 'movies/' + data.id, data).then(() => {
      resolve()
    }).catch(e => {
      reject(e)
      console.error(e)
    })
  })
}

export const deleteMovieRepo = (id: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios.delete(baseURL + 'movies/' + id).then(() => {
      resolve()
    }).catch(e => {
      reject(e)
      console.error(e)
    })
  })
}

export const createMovieRepo = (data: Movie): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios.post(baseURL + 'movies', data).then(() => {
      resolve()
    }).catch(e => {
      reject(e)
      console.error(e)
    })
  })
}
