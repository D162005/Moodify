import React from 'react'
import FaceExpressionDetector from './features/expression/pages/FaceExpressionDetector'
import { AuthProvider } from './features/auth/auth.contex.jsx'
import AppRoutes from './AppRoutes'

const App = () => {

  return (
    <>
    <AuthProvider>
      <AppRoutes></AppRoutes>
    </AuthProvider>
    </>
  )
}

export default App
