import { Box, Card, CardActions, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateFoodCategoryForm from './CreateFoodCategoryForm';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const url = "http://localhost:8080"; // Your API base URL

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FoodCategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/categories`);
      if (response.data) {
        setCategories(response.data);
      } else {
        toast.error("Error: No categories data returned");
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/v1/categories/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories(); // Update list after deletion
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div>
      <Box>
        <Card className='mt-1'>
          <CardHeader
            action={
              <IconButton onClick={() => setOpen(true)} aria-label="settings">
                <CreateIcon />
              </IconButton>
            }
            title={"Food Categories"}
            sx={{ pt: 2, alignItems: "center" }}
          />
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category.id}
                    </TableCell>
                    <TableCell align="left">
                      {category.image ? (
                        <img src={`${url}/images/${category.image}`} alt={category.name} style={{ width: '50px', height: '50px' }} />
                      ) : (
                        <p>No Image</p>
                      )}
                    </TableCell>
                    <TableCell align="left">{category.name}</TableCell>
                    <TableCell align="left">
                      <IconButton onClick={() => handleEdit(category)}>
                        <CreateIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(category.id)}>
                        {/* Replace with a delete icon as necessary */}
                        <span><HighlightOffIcon/></span>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Modal
          open={open}
          onClose={() => { setOpen(false); setSelectedCategory(null); }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateFoodCategoryForm category={selectedCategory} onClose={() => { setOpen(false); fetchCategories(); }} />
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default FoodCategoryTable;
