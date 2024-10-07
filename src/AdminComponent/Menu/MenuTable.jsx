import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Button, Pagination } from '@mui/material'; // Added Pagination here
import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateMenuForm from './CreateMenuForm'; // Form for editing menu items

const MenuTable = () => {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
  const [categories, setCategories] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false); // Control for the edit modal
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Số lượng mục trên mỗi trang

  const url = "http://localhost:8080"; // API URL

  // Fetch the list of menu items from the API
  const fetchMenuList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/dishes`);
      if (response.data.content && response.data.content.length > 0) {
        setMenuList(response.data.content);
      } else {
        toast.error("Error: No menu data returned");
      }
    } catch (error) {
      toast.error("Error fetching menu data");
      console.error('Error fetching menu:', error);
    }
  };

  // Fetch the list of categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/categories`);
      if (response.data) {
        const categoryMap = response.data.reduce((acc, category) => {
          category.dishes.forEach(dish => {
            acc[dish.id] = category.name;
          });
          return acc;
        }, {});
        setCategories(categoryMap);
      } else {
        toast.error("Error: No category data returned");
      }
    } catch (error) {
      toast.error("Error fetching category data");
      console.error('Error fetching categories:', error);
    }
  };

  // Xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Tính toán các mục sẽ hiển thị dựa trên trang hiện tại và số lượng mục trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menuList.slice(indexOfFirstItem, indexOfLastItem);

  // Remove a menu item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/v1/dishes/${foodId}`);
      if (response.data && response.data.message) {
        toast.success(response.data.message);
        fetchMenuList(); // Refresh the menu list after deletion
      } else {
        toast.error("Error deleting menu item");
      }
    } catch (error) {
      toast.error("Error deleting menu item");
      console.error('Error removing food:', error);
    }
  };

  // Handle delete button click with confirmation
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowConfirmModal(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFood(itemToDelete.id);
      setShowConfirmModal(false);
      setItemToDelete(null); // Reset after delete
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setSelectedItem(null);
    fetchMenuList(); // Refresh the menu list after editing
  };

  // Navigate to the add menu page
  const handleAddMenu = () => {
    navigate("/admin/restaurants/add-menu");
  };

  // Fetch menu data and categories when the page loads
  useEffect(() => {
    fetchMenuList();
    fetchCategories();
  }, []);

  return (
    <div>
      <Box>
        <Card className='mt-1'>
          <CardHeader
            action={
              <IconButton onClick={handleAddMenu} aria-label="add-menu">
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
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.image ? (
                        <img src={`${url}/images/${item.image}`} alt={item.name} style={{ width: '50px', height: '50px' }} />
                      ) : (
                        <span>No image available</span>
                      )}
                    </TableCell>
                    <TableCell align="left">{item.name || 'No name available'}</TableCell>
                    <TableCell align="left">{categories[item.id] || 'No category available'}</TableCell>
                    <TableCell align="right">{item.description || 'No description available'}</TableCell>
                    <TableCell align="right">${item.price || 'No price available'}</TableCell>
                    <TableCell align="right">{item.discount || 'No discount available'}</TableCell>
                    <TableCell align="right">{item.status === 'available' ? 'Available' : 'Unavailable'}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(item)}>
                        <CreateIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(item)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Component */}
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Pagination
              count={Math.ceil(menuList.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              color="primary"
            />
          </Box>

        </Card>
      </Box>

      {/* Delete confirmation modal */}
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <Box 
          sx={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2, // Add border radius for rounded corners
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center' // Center text
          }}
        >
          <h2 id="confirm-delete-title" style={{ marginBottom: '16px', fontWeight: '600' }}>Confirm Delete</h2>
          <p id="confirm-delete-description" style={{ marginBottom: '24px' }}>
            Are you sure you want to delete <strong>{itemToDelete?.name}</strong>?
          </p>
          <Box sx={{ display: 'flex', gap: 2 }}> {/* Add space between buttons */}
            <Button 
              onClick={handleConfirmDelete} 
              color="error" 
              variant="contained" // Use filled button style
              sx={{ flexGrow: 1 }} // Stretch button to fill available space
            >
              Delete
            </Button>
            <Button 
              onClick={() => setShowConfirmModal(false)} 
              color="primary" 
              variant="outlined" // Use outlined button style
              sx={{ flexGrow: 1 }} // Stretch button to fill available space
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit modal */}
      <Modal
        open={openEditModal}
        onClose={handleEditModalClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 700, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          borderRadius: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <CreateMenuForm item={selectedItem} onClose={handleEditModalClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default MenuTable;
