import { FiTrash2, FiEdit3 } from 'react-icons/fi'

import type { Task } from '../../../store/taskStore'

type TableProps = {
  tasks: Task[]
  onToggle: (task: Task) => void
  onEdit: (task: Task) => void
  onDeleteId: (id: number | null) => void
}
const tableHead = ['Title', 'Description', 'Status', 'Action']

const Table = (props: TableProps) => {
  const { onDeleteId, onEdit, onToggle, tasks } = props

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {tableHead.map((head) => (
              <th key={head} className="px-4 py-3">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className={task.isCompleted ? 'line-through text-gray-500' : ''}>
                {task.title}
              </td>
              <td className="px-4 py-3">{task.description ? task.description : '-'}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggle(task)}
                  title="Mark this task as completed."
                  className={`text-xs px-3 py-1 rounded-full transition underline cursor-pointer ${
                    task.isCompleted
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  {task.isCompleted ? 'Completed' : 'Open'}
                </button>
              </td>
              <td className="px-4 py-3 flex items-center gap-2">
                <button
                  title="Edit this task."
                  onClick={() => onEdit(task)}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                >
                  <FiEdit3 />
                </button>
                <button
                  title="Delete this task."
                  onClick={() => onDeleteId(task.id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
