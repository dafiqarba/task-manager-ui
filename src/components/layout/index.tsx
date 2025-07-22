import clsx from 'clsx'
import React, { useState } from 'react'
import { FiMenu, FiCheckSquare } from 'react-icons/fi'

import Breadcrumbs from '../shared/Breadcrumbs'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen text-dark bg-neutral-light">
      <aside
        className={clsx(
          'transition-all duration-300 ease-in-out bg-white shadow-md overflow-hidden',
          collapsed ? 'w-16' : 'w-56'
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-200 relative">
          <div
            className={clsx(
              'font-semibold text-lg tracking-tight text-gray-900 transition-all duration-300 origin-left',
              collapsed
                ? 'opacity-0 scale-90 translate-x-[-10px] pointer-events-none absolute'
                : 'opacity-100 scale-100 translate-x-0 relative'
            )}
          >
            TaskApp
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-100 text-gray-600 z-10 cursor-pointer"
          >
            <FiMenu size={20} />
          </button>
        </div>

        <nav className="mt-4 space-y-1">
          <SidebarItem
            active
            collapsed={collapsed}
            label="Task Management"
            icon={<FiCheckSquare size={20} />}
          />
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <Breadcrumbs />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  )
}

const SidebarItem = ({
  icon,
  label,
  active,
  collapsed,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  collapsed?: boolean
}) => {
  return (
    <div
      className={clsx(
        'group flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-all cursor-pointer',
        active
          ? 'bg-[#CDE6FE] text-[#0078D4] font-medium'
          : 'text-gray-600 hover:bg-gray-100 hover:text-[#0078D4]'
      )}
    >
      <div className="text-xl">{icon}</div>
      <span
        className={clsx(
          'whitespace-nowrap transition-all duration-300 origin-left',
          collapsed
            ? 'opacity-0 scale-90 translate-x-[-10px]'
            : 'opacity-100 scale-100 translate-x-0'
        )}
      >
        {label}
      </span>
    </div>
  )
}

export default Layout
