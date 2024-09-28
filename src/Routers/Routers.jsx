import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminRoute from './AdminRoute'

const Routers = () => {
  return (
    <Routes>
      <Route path='/admin/restaurants/*' element={<AdminRoute/>}/>
      {/* <Route path='/*' element={}/> */}
    </Routes>
  )
}

export default Routers
