import type { Task } from '../store/taskStore'

export type APIResponse<T> = {
  data: T | null
  error: string | null
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

let mockTasks: Task[] = [
  {
    id: 1,
    isCompleted: false,
    title: 'Brushing Teeth',
    description: 'I need to brush my teeth every morning',
  },
  {
    id: 2,
    isCompleted: true,
    title: 'Cleaning the House',
    description: 'I need to make it look tidy',
  },
]

export const taskApi = {
  getTasks: async (): Promise<APIResponse<Task[]>> => {
    await delay(300)
    return { data: [...mockTasks], error: null }
  },

  createTask: async (task: Omit<Task, 'id'>): Promise<APIResponse<Task>> => {
    await delay(300)
    const newTask: Task = {
      id: Date.now(), // Simulate unique ID
      ...task,
    }
    mockTasks.unshift(newTask)
    return { data: newTask, error: null }
  },

  toggleTask: async (id: number): Promise<APIResponse<Task>> => {
    await delay(200)
    const index = mockTasks.findIndex((t) => t.id === id)
    if (index === -1) {
      return { data: null, error: 'Task not found' }
    }
    mockTasks[index].isCompleted = !mockTasks[index].isCompleted
    return { data: mockTasks[index], error: null }
  },

  deleteTask: async (id: number): Promise<APIResponse<null>> => {
    await delay(200)
    const initialLength = mockTasks.length
    mockTasks = mockTasks.filter((t) => t.id !== id)
    const deleted = mockTasks.length < initialLength
    return deleted ? { data: null, error: null } : { data: null, error: 'Task not found' }
  },
}
