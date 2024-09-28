import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './Routers/AdminRoute'

const App = () => {
  return (
    <div> 
      <Routes>
      <Route path='/admin/restaurants/*' element={<AdminRoute/>}/>      
      </Routes>
    </div>
  )
}

export default App
