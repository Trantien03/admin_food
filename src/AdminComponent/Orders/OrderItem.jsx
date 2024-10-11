import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";

const OrderItem = ({ url = `http://localhost:8080`, tableId }) => {
  const [orderItems, setOrderItems] = useState([]); // Quản lý danh sách đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null); // Quản lý đơn hàng được chọn
  const [open, setOpen] = useState(false); // Trạng thái modal

  // Hàm lấy danh sách đơn hàng từ API theo ID của bàn
  const fetchOrdersByTable = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/orders/nameTable?nameTable=${tableId}`);
      if (response.status === 200) {
        setOrderItems(response.data); // Cập nhật danh sách đơn hàng
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  // Lấy danh sách đơn hàng khi component mount
  useEffect(() => {
    if (url && tableId) {
      fetchOrdersByTable(); // Gọi API để lấy các đơn hàng của bàn cụ thể
    }
  }, [url, tableId]);

  // Hàm trả về kiểu dáng dựa trên trạng thái đơn hàng
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: '#00BFFF', color: 'white' }; // Blue
      case 'Food Processing':
        return { backgroundColor: '#FFA500', color: 'white' }; // Orange
      case 'Out for delivery':
        return { backgroundColor: '#FFD700', color: 'white' }; // Gold
      case 'Delivered':
        return { backgroundColor: '#32CD32', color: 'white' }; // Green
      case 'Completed':
        return { backgroundColor: '#800080', color: 'white' }; // Purple
      case 'Error':
        return { backgroundColor: 'transparent', color: 'red' }; // Red text
      default:
        return { backgroundColor: '#808080', color: 'white' }; // Gray
    }
  };

  // Hàm mở modal để xem chi tiết đơn hàng
  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  // Hàm đóng modal
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={`Orders for Table ${tableId}`} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell style={getStatusStyle(order.status)}>{order.status}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpen(order)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4 
        }}>
          {selectedOrder && (
            <>
              <Typography variant="h6" component="h2">
                Order Details
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Order ID:</strong> {selectedOrder.id}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Customer:</strong> {selectedOrder.customer}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Status:</strong> {selectedOrder.status}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Total Price:</strong> {selectedOrder.totalPrice}
              </Typography>
              {/* Có thể thêm thông tin chi tiết khác ở đây */}
              <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderItem;
