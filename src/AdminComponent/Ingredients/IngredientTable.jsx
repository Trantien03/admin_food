import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API calls
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientForm from './CreateIngredientForm';

const url = "http://localhost:8080";

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

const IngredientTable = () => {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch data from API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/ingredients`); // Replace with your API URL
        setIngredients(response.data); // Assuming the API returns an array of ingredients
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div>
      <Box>
        <Card className='mt-1'>
          <CardHeader
            action={
              <IconButton onClick={handleOpen} aria-label="settings">
                <CreateIcon />
              </IconButton>
            }
            title={"Ingredients"}
            sx={{ pt: 2, alignItems: "center" }}
          />

          {/* Table Container */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? ( // Show loading state
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  ingredients.map((ingredient, index) => (
                    <TableRow
                      key={ingredient.id || index} // Use ingredient.id if available, fallback to index
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {ingredient.id}
                      </TableCell>
                      <TableCell align="right">{ingredient.name}</TableCell>
                      <TableCell align="right">{ingredient.category}</TableCell>
                      <TableCell align="right">{ingredient.availability ? 'Available' : 'Not Available'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Modal for creating new ingredient */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateIngredientForm />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default IngredientTable;
