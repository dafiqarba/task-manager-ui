import { createBrowserRouter } from 'react-router'

import App from './App'
import TaskManagement from './components/pages/TaskManagement'

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
    handle: { breadcrumb: 'Home' },
    children: [
      {
        index: true,
        path: 'tasks-management',
        Component: TaskManagement,
        handle: { breadcrumb: 'Task Management', href: '/tasks-management' },
      },
    ],
  },
])
