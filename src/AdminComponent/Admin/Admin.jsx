import React from 'react'
import {AdminSideBar} from './AdminSideBar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Orders from '../Orders/Orders'
import Events from '../Events/Events'
import Menu from '../Menu/Menu'
import Ingredients from '../Ingredients/Ingredients'
import Logout from '../Logout/Logout'
import RestaurantDetails from './RestaurantDetails'
import FoodCategory from '../FoodCategory/FoodCategory'
import CreateRestaurantForm from '../CreateRestaurantForm/CreateRestaurantForm'
import CreateMenuForm from '../Menu/CreateMenuForm'

const Admin = () => {
    const handleClose = ()=>{

    }
  return (
    <div>
      <div className='lg:flex justify-between'>
        <div>
          <AdminSideBar handleClose={handleClose}/>
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<CreateRestaurantForm/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/category' element={<FoodCategory/>}/>
            <Route path='/ingredients' element={<Ingredients/>}/>
            <Route path='/event' element={<Events/>}/>
            <Route path='/details' element={<RestaurantDetails/>}/>
            <Route path='/add-menu' element={<CreateMenuForm/>}/>
            <Route path='/logout' element={<Logout/>}/>
          </Routes>

        </div>

      </div>
    </div>
  )
}

export default Admin
