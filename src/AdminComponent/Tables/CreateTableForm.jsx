import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = "http://localhost:8080"; // Your API base URL

const CreateTableForm = ({ table, onClose }) => {
  const [nameTable, setNameTable] = useState('');
  const [status, setStatus] = useState('Available'); // Mặc định là Available

  // Khởi tạo giá trị cho form nếu đang chỉnh sửa
  useEffect(() => {
    if (table) {
      setNameTable(table.nameTable);
      setStatus(table.status);
    } else {
      setNameTable('');
      setStatus('Available');
    }
  }, [table]);

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTable = {
      nameTable: nameTable,
      status: status,
    };

    try {
      if (table) {
        // Chỉnh sửa bảng hiện có
        await axios.put(`${url}/api/v1/restaurantTables/${table.id}`, newTable);
        toast.success("Table updated successfully");
      } else {
        // Tạo bảng mới
        await axios.post(`${url}/api/v1/restaurantTables`, newTable);
        toast.success("Table created successfully");
      }
      onClose(); // Đóng modal sau khi thực hiện thành công
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
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Reserved">Reserved</option>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {table ? 'Update Table' : 'Create Table'}
        </Button>
      </form>
    </>
  );
};

export default CreateTableForm;
