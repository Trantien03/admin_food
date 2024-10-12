import { Box, Card, CardHeader, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import CreateTableForm from './CreateTableForm';
import OrderItem from '../Orders/OrderItem'; // Import component OrderItem

const url = "http://localhost:8080"; // Your API base URL

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid inherit',
  boxShadow: 24,
  p: 4,
};

const ListTables = () => {
  const [tables, setTables] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showOrders, setShowOrders] = useState(false); // Quản lý trạng thái hiển thị đơn hàng

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
    setSelectedTable(table.nameTable); // Chọn bàn để hiển thị đơn hàng
    setShowOrders(true); // Hiển thị danh sách đơn hàng
  };

  const handleBack = () => {
    setShowOrders(false);
    setSelectedTable(null); // Reset selected table
  };

  return (
    <Box>
      {!showOrders ? (
        <Card className="mt-1">
          <CardHeader
            action={
              <IconButton onClick={() => setOpen(true)} aria-label="add-table">
                <CreateIcon />
              </IconButton>
            }
            title={"Restaurant Tables"}
            sx={{ pt: 5, alignItems: "center", textAlign: "center" }}
          />
          <br />
          <br />
          <br />

          {/* Tables Grid */}
          <div className="grid grid-cols-4 gap-16 mx-8">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`relative border border-inherit rounded-lg p-8 h-24 text-center group
                  ${table.status === 'Available' ? 'bg-green-400' : 'bg-red-400'}`}
                onClick={() => handleViewOrders(table)} // Khi click vào bàn, xem các đơn hàng
              >
                <span className="block">{table.nameTable}</span>

                {/* Edit and Icons - hidden by default, shown on hover */}
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <IconButton onClick={() => handleEdit(table)} aria-label="edit-table" size="small">
                    <CreateIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(table.id)} aria-label="delete-table" size="small">
                    <HighlightOffIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        // Hiển thị danh sách đơn hàng cho bàn đã chọn
        <OrderItem selectedTable={selectedTable} onBack={handleBack} />
      )}

      {/* Modal for Adding/Editing a Table */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedTable(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateTableForm
            table={selectedTable}
            onClose={() => {
              setOpen(false);
              fetchTables();
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ListTables;
