import { StrictMode } from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import './index.css'

import { routes } from './routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
    <Toaster position="bottom-center" />
  </StrictMode>
)
