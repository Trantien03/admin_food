import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MenuTable = () => {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);

  // URL của API (thay đổi nếu cần)
  const url = "http://localhost:8080";

  // Lấy danh sách món ăn từ API
  const fetchMenuList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/dishes`);
      if (response.data && response.data.content) {
        setMenuList(response.data.content);
      } else {
        toast.error("Error: No menu data returned");
      }
    } catch (error) {
      toast.error("Error fetching menu data");
    }
  };

  // Xoá món ăn
  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/v1/dishes/${foodId}`);
      if (response.data && response.data.message) {
        toast.success(response.data.message);
        fetchMenuList(); // Fetch lại danh sách món sau khi xoá
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Error removing food");
    }
  };

  // Gọi API khi component được load
  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <div>
      <Box>
        <Card className='mt-1'>
          <CardHeader
            action={
              <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="add-menu">
                <CreateIcon />
              </IconButton>
            }
            title={"Menu"}
            sx={{ pt: 2, alignItems: "center" }}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="menu table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Ingredients</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Availability</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <img src={`${url}/images/${item.image}`} alt={item.name} style={{ width: '50px', height: '50px' }} />
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.ingredients || 'No ingredients'}</TableCell>
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="right">{item.availability ? 'Available' : 'Not Available'}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeFood(item.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </div>
  );
};

export default MenuTable;
