import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

import Modal from '../../base/Modal'
import useTaskStore, { type Task } from '../../../store/taskStore'

type Props = {
  isOpen: boolean
  onClose: () => void
  initialData?: Task | null
}

const TaskFormModal = ({ isOpen, onClose, initialData = null }: Props) => {
  const { addTask, editTask } = useTaskStore()

  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setDescription(initialData.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
    setError('')
  }, [initialData, isOpen])

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required')
      toast.error('Title is required')
      return
    }

    const toastId = toast.loading(initialData ? 'Updating task...' : 'Creating task...')

    try {
      if (initialData?.id) {
        await editTask(initialData.id, { title, description })
        toast.success('Task updated successfully', { id: toastId })
      } else {
        await addTask({ title, description, isCompleted: false })
        toast.success('Task created successfully', { id: toastId })
      }

      setTitle('')
      setDescription('')
      setError('')
      onClose()
    } catch (err) {
      toast.error('Something went wrong', { id: toastId })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Task' : 'Add New Task'}
    >
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Title *</label>
          <input
            value={title}
            placeholder="Enter task title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            placeholder="Optional description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 text-sm rounded bg-primary text-white hover:bg-blue-600 cursor-pointer"
          >
            {initialData ? 'Update Task' : 'Save Task'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default TaskFormModal
