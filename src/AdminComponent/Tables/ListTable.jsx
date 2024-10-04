import { Box, Card, CardActions, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateTableForm from './CreateTableForm';

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

const ListTables = () => {
  const [tables, setTables] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

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

  const handleEdit = (table) => {
    setSelectedTable(table);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/v1/restaurantTables/${id}`);
      toast.success("Table deleted successfully");
      fetchTables(); // Update list after deletion
    } catch (error) {
      toast.error("Failed to delete table");
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
            title={"Restaurant Tables"}
            sx={{ pt: 2, alignItems: "center" }}
          />
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables.map((table) => (
                  <TableRow
                    key={table.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {table.id}
                    </TableCell>
                    <TableCell align="left">{table.nameTable}</TableCell>
                    <TableCell align="left">{table.status}</TableCell>
                    <TableCell align="left">
                      <IconButton onClick={() => handleEdit(table)}>
                        <CreateIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(table.id)}>
                        <HighlightOffIcon />
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
          onClose={() => { setOpen(false); setSelectedTable(null); }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateTableForm table={selectedTable} onClose={() => { setOpen(false); fetchTables(); }} />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default ListTables;
