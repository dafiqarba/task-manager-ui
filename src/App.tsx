import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'

import Layout from './components/layout'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/tasks-management')
  }, [])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
