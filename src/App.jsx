import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './Routers/AdminRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div> 
      <ToastContainer />
      <Routes>
      <Route path='/admin/restaurants/*' element={<AdminRoute/>}/>      
      </Routes>
    </div>
  )
}

export default App
