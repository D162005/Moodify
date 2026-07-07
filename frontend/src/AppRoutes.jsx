import React from 'react'
import{Route, Routes, BrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpressionDetector from './features/expression/pages/FaceExpressionDetector'


const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<FaceExpressionDetector/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
