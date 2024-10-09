import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField, MenuItem } from "@mui/material";

// Styles for modal box
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const OrderItem = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm để mở modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Hàm để đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Kiểm tra xem order có hợp lệ không
  if (!order) {
    return <div>Loading...</div>; // Hoặc có thể hiển thị thông báo khác
  }

  return (
    <div>
      <h3>{order.table}</h3>
      <p>Status: {order.status}</p>
      
      {/* Button để mở modal */}
      <button onClick={handleOpenModal}>Edit Order</button>
      
      {/* Modal hiển thị khi open=true */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Order for {order.table}
          </Typography>
          
          <form>
            {/* Input cho tên bàn */}
            <TextField 
              fullWidth 
              margin="normal" 
              label="Table Name" 
              value={order.table} 
              variant="outlined" 
              disabled 
            />
            
            {/* Dropdown cho trạng thái */}
            <TextField
              fullWidth
              margin="normal"
              select
              label="Status"
              value={order.status}
              variant="outlined"
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Occupied">Occupied</MenuItem>
            </TextField>

            {/* Button để cập nhật */}
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              onClick={handleCloseModal}
            >
              Update Order
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderItem;
