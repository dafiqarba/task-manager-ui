import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { FiPlus, FiDownload } from 'react-icons/fi'

import Table from './Table'
import DeleteTask from './DeleteTask'
import AddNewTaskModal from './AddTask'
import { exportTasksToPdf } from '../../../utils/exportPdf'
import useTaskStore, { type Task } from '../../../store/taskStore'

const initModal = {
  add: false,
  edit: false,
  view: false,
  delete: false,
}

const TaskManagement = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [modal, setModal] = useState(initModal)
  const [editTaskData, setEditTaskData] = useState<Task | null>(null)

  const { tasks, fetchTasks, toggleTask, deleteTask } = useTaskStore()

  const handleClose = () => {
    setModal(initModal)
    setEditTaskData(null)
    setDeleteId(null)
  }

  const handleAddNewTask = () =>
    setModal((prev) => ({
      ...prev,
      add: true,
    }))

  const handleEditTask = (task: Task) => {
    setEditTaskData(task)
    setModal((prev) => ({
      ...prev,
      edit: true,
    }))
  }

  const handleConfirmDeleteTask = async () => {
    if (deleteId !== null) {
      try {
        deleteTask(deleteId)
        toast.success('Task deleted')
      } catch (error) {
        toast.error('Failed to delete task')
      } finally {
        setDeleteId(null)
      }
    }
  }

  const handleToggle = async (task: Task) => {
    const toastId = toast.loading('Updating status...')

    try {
      await toggleTask(task.id)
      toast.success(`Task marked as ${!task.isCompleted ? 'Open' : 'Completed'}`, {
        id: toastId,
      })
    } catch (error) {
      toast.error('Failed to update task status', { id: toastId })
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Task Management</h2>
          <p className="text-sm text-gray-500">
            Manage your personal or team tasks efficiently
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition cursor-pointer"
            onClick={handleAddNewTask}
          >
            <FiPlus />
            Add Task
          </button>

          <button
            onClick={() => exportTasksToPdf(tasks)}
            className="flex items-center gap-2 px-4 py-2 border text-sm rounded hover:bg-gray-100 transition cursor-pointer"
          >
            <FiDownload />
            Export PDF
          </button>
        </div>
      </div>

      <Table
        tasks={tasks}
        onEdit={handleEditTask}
        onToggle={handleToggle}
        onDeleteId={setDeleteId}
      />

      <DeleteTask
        deleteId={deleteId}
        onClose={handleClose}
        onConfirmDeleteTask={handleConfirmDeleteTask}
      />
      <AddNewTaskModal
        onClose={handleClose}
        initialData={editTaskData}
        isOpen={modal.add || modal.edit}
      />
    </div>
  )
}

export default TaskManagement
