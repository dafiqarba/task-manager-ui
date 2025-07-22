import axios, { AxiosError } from 'axios'

const instance = axios.create({
  // Since Backend API is not provided, I define this for example purposes
  baseURL: import.meta.env.VITE_API_BASE || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export type APIResponse<T> = {
  data: T | null
  error: string | null
}

export async function apiRequest<T>(
  promise: Promise<{ data: T }>
): Promise<APIResponse<T>> {
  try {
    const response = await promise
    return { data: response.data, error: null }
  } catch (err) {
    const error = err as AxiosError
    return {
      data: null,
      error: error.message || 'Unknown error',
    }
  }
}

export default instance
