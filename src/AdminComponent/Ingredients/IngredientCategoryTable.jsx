import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API calls
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm';

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

const url = "http://localhost:8080";

const IngredientCategoryTable = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State to store categories data
  const [loading, setLoading] = useState(true); // Loading state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/ingredients_categories`); // Replace with your API URL
        setCategories(response.data); // Assuming the API returns an array of categories
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Box>
        <Card className="mt-1">
          <CardHeader
            action={
              <IconButton onClick={handleOpen} aria-label="settings">
                <CreateIcon />
              </IconButton>
            }
            title={"Ingredient Category"}
            sx={{ pt: 2, alignItems: "center" }}
          />

          {/* Table for displaying categories */}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? ( // Show loading state
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category, index) => (
                    <TableRow
                      key={category.id || index} // Use category.id if available, fallback to index
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {category.id}
                      </TableCell>
                      <TableCell align="left">{category.name}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Modal for creating new ingredient category */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateIngredientCategoryForm />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default IngredientCategoryTable;
