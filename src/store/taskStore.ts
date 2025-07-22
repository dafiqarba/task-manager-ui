import { create } from 'zustand'

import { taskApi } from '../utils/mockApi'

export type Task = {
  id: number
  title: string
  description?: string
  isCompleted: boolean
}

type TaskStore = {
  tasks: Task[]
  loading: boolean
  error: string | null

  fetchTasks: () => void
  addTask: (task: Omit<Task, 'id'>) => void
  editTask: (id: number, updates: Partial<Omit<Task, 'id'>>) => Promise<void>
  toggleTask: (id: number) => void
  deleteTask: (id: number) => void
  clearError: () => void
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null })
    const { data, error } = await taskApi.getTasks()
    if (error) return set({ error, loading: false })
    set({ tasks: data || [], loading: false })
  },

  addTask: async (task) => {
    const { data, error } = await taskApi.createTask(task)
    if (error) return set({ error })
    if (data) {
      set((state) => ({ tasks: [data, ...state.tasks] }))
    }
  },

  editTask: async (id, updates) => {
    set((state) => {
      const existing = state.tasks.find((t) => t.id === id)
      if (!existing) return {}

      const updatedTask = { ...existing, ...updates }

      return {
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }
    })
  },

  toggleTask: async (id) => {
    const { data, error } = await taskApi.toggleTask(id)
    if (error) return set({ error })
    if (data) {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? data : t)),
      }))
    }
  },

  deleteTask: async (id) => {
    const { error } = await taskApi.deleteTask(id)
    if (error) return set({ error })
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }))
  },

  clearError: () => set({ error: null }),
}))

export default useTaskStore
