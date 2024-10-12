import { Box, Card, CardHeader, IconButton, Typography, Fade, Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableBarIcon from '@mui/icons-material/TableBar';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import CreateTableForm from './CreateTableForm';
import OrderItem from '../Orders/OrderItem';

const url = "http://localhost:8080";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const ListTables = () => {
  const [tables, setTables] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showOrders, setShowOrders] = useState(false);

  // Fetch tables from API
  const fetchTables = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/restaurantTables`);
      if (response.data) {
        setTables(response.data);
      } else {
        toast.error("Error: No data returned");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // Handle viewing orders for a specific table
  const handleViewOrders = (table) => {
    setSelectedTable(table.nameTable);
    setShowOrders(true);
  };

  const handleBack = () => {
    setShowOrders(false);
    setSelectedTable(null);
  };

  // Handle delete table
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/v1/restaurantTables/${id}`);
      fetchTables();
      toast.success("Table deleted successfully");
    } catch (error) {
      toast.error("Error deleting table");
    }
  };

  // Handle edit table
  const handleEdit = (table) => {
    setSelectedTable(table);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f0f4f7', minHeight: '100vh' }}>
      {!showOrders ? (
        <Card sx={{ mt: 2, p: 3, bgcolor: '#ffffff', boxShadow: 3 }}>
          <CardHeader
            action={
              <IconButton onClick={() => setOpen(true)} aria-label="add-table">
                <AddCircleIcon sx={{ fontSize: 35, color: '#1976d2' }} />
              </IconButton>
            }
            title={
              <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
                Restaurant Tables
              </Typography>
            }
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mt: 4 }}>
            {tables.map((table) => (
              <Box
                key={table.id}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  bgcolor: table.status === 'Available' ? '#b2dfdb' : '#ef9a9a',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 5,
                  },
                  cursor: 'pointer',
                }}
                onClick={() => handleViewOrders(table)}
              >
                <TableBarIcon sx={{ fontSize: 60, color: '#ffffff' }} />
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  {table.nameTable}
                </Typography>
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleEdit(table)} size="small">
                    <EditIcon sx={{ fontSize: 20, color: '#fff' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(table.id)} size="small">
                    <DeleteIcon sx={{ fontSize: 20, color: '#fff' }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>
      ) : (
        <OrderItem selectedTable={selectedTable} onBack={handleBack} />
      )}

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedTable(null);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <CreateTableForm
              table={selectedTable}
              onClose={() => {
                setOpen(false);
                fetchTables();
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ListTables;
