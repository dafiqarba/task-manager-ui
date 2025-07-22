import clsx from 'clsx'
import { FiX } from 'react-icons/fi'
import type { ReactNode } from 'react'

type ModalProps = {
  onClose: () => void
  isOpen: boolean
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

const Modal = (props: ModalProps) => {
  const { isOpen, onClose, title, children, size = 'md' } = props

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 backdrop-blur-sm bg-black/10">
      <div
        className={clsx(
          sizeClasses[size],
          'bg-white rounded-lg shadow-lg w-full transition-all'
        )}
      >
        <div className="flex items-center justify-between border-b border-b-gray-200 px-4 py-3">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
