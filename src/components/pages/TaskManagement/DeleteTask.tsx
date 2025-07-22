import Modal from '../../base/Modal'


type DeleteTaskProps = {
  deleteId: number | null
  onClose: () => void
  onConfirmDeleteTask: () => void
}

const DeleteTask = (props: DeleteTaskProps) => {
  const { deleteId, onClose, onConfirmDeleteTask } = props

  return (
    <Modal isOpen={!!deleteId} onClose={onClose} title="Delete Task">
      <p className="text-sm text-gray-700 mb-4">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirmDeleteTask}
          className="px-3 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteTask
