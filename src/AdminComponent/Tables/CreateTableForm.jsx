import React, { useEffect, useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = "http://localhost:8080"; // Your API base URL

const CreateTableForm = ({ table, onClose }) => {
  const [nameTable, setNameTable] = useState('');
  const [status, setStatus] = useState('Available'); // Default is 'Available'

  // Initialize form values if editing
  useEffect(() => {
    if (table) {
      setNameTable(table.nameTable || ''); // Ensure there's a default value
      setStatus(table.status || 'Available');
    }
  }, [table]); // Trigger whenever `table` changes

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTable = {
      nameTable: nameTable,
      status: status,
    };

    try {
      if (table) {
        // Edit existing table
        await axios.put(`${url}/api/v1/restaurantTables/${table.id}`, newTable);
        toast.success("Table updated successfully");
      } else {
        // Create new table
        await axios.post(`${url}/api/v1/restaurantTables`, newTable);
        toast.success("Table created successfully");
      }
      onClose(); // Close modal after successful action
    } catch (error) {
      toast.error("Error saving table");
    }
  };

  return (
    <>
      <h1 className="font-semibold text-2xl text-center my-5">{table ? 'Update Table' : 'Create Table'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Table Name"
          value={nameTable}
          onChange={(e) => setNameTable(e.target.value)}
          fullWidth
          margin="normal"
          required
          variant="outlined"
          className="bg-white"
        />
        <TextField
          label="Status"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
          required
          variant="outlined"
          className="bg-white"
        >
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Occupied">Occupied</MenuItem>
          <MenuItem value="Reserved">Reserved</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {table ? 'Update Table' : 'Create Table'}
        </Button>
      </form>
    </>
  );
};

export default CreateTableForm;
