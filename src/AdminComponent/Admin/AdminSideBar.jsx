import React from 'react';
import { useMediaQuery, Drawer, Divider } from '@mui/material';
import { Dashboard, ShoppingBag } from '@mui/icons-material';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 

// Define the menu items
const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
  { title: "Events", icon: <EventIcon />, path: "/event" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "logout", icon: <LogoutIcon />, path: "/login" },
];

export const AdminSideBar = ({ handleClose }) => {
  // Use media query to handle responsiveness
  const isSmallScreen = useMediaQuery('(max-width:1080px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate=(item)=>{
    navigate(`/admin/restaurants${item.path}`)
    if(item.title==="Logout"){
        navigate("/");
        dispatch(logout())
        handleClose()
}
  }

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}  // Use the handleClose function passed as a prop
        open={true}
        anchor='left'
        sx={{ zIndex: 1 }}
      >
        <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
          {/* Render the menu items */}
          {menu.map((item, index) => (
            <React.Fragment key={index}>
              <div onClick={()=>handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer'>
                {item.icon}
                <span>{item.title}</span>
              </div>
              {index !== menu.length-1 &&  <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export default AdminSideBar;
