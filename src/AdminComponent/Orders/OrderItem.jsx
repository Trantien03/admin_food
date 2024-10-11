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
  Menu,
  MenuItem,
  Select
} from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";

const OrderItem = ({ url = `http://localhost:8080` }) => {
  const [orderItems, setOrderItems] = useState([]); // Quản lý danh sách đơn hàng
  const [anchorEl, setAnchorEl] = useState(null); // Điều khiển menu trạng thái
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng đã chọn để cập nhật

  // Hàm lấy danh sách tất cả đơn hàng từ API
  const fetchAllOrders = async (tableName) => { // Nhận tableName như một tham số
    
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/orders/nameTable`, {
        params: { nameTable: b2 }, // Truyền tham số nameTable
      });
  
      if (response.status === 200) {
        console.log(response.data);
        setOrderItems(response.data); // Cập nhật danh sách đơn hàng
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while fetching orders");
    }
  };
  

  // Hàm cập nhật trạng thái đơn hàng
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/v1/orders/${id}`, null, {
        params: { status: newStatus },
      });
  
      // Check if the response is successful
      if (response.status === 200) {
        // Optionally, check the response data
        
         
        
        fetchAllOrders();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      
    }
  };

  // Lấy danh sách đơn hàng khi component mount
  useEffect(() => {
    if (url) {
      fetchAllOrders();
    }
  }, [url]);

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

  // Mở menu trạng thái khi nhấn vào nút "Update"
  const handleStatusClick = (event, order) => {
    setSelectedOrder(order);
    setAnchorEl(event.currentTarget); // Lưu vị trí nút đã nhấn
  };

  // Đóng menu trạng thái
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Danh sách các trạng thái có thể cập nhật
  const statuses = [
    "Pending",
    "Food Processing",
    "Completed",
  ];

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Bill Number</TableCell>
                <TableCell align="left">Table</TableCell>
                
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Price</TableCell>
                {/* <TableCell align="left">Dish</TableCell>
                <TableCell align="left">Quantity</TableCell> */}
                <TableCell align="left">Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.length > 0 ? (
                orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.billNumber}</TableCell>
                    <TableCell align="left">{item.restaurantTable.nameTable}</TableCell>
                    
                    <TableCell align="left">{item.customer}</TableCell>
                    <TableCell align="left">{item.totalPrice}</TableCell>

                    <TableCell align="right">
                      <Select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)} // Gọi hàm khi thay đổi trạng thái
                      >
                        <MenuItem value="PendingPayment">Pending Payment</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                      </Select>
                    </TableCell>

                    {/* <TableCell align="left">
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: '20px',
                          ...getStatusStyle(item.order.status),
                          padding: '5px 20px',
                        }}
                      >
                        {item.order.status}
                      </Button>
                    </TableCell> */}
                    {/* <TableCell align="left">
                      <Button
                        onClick={(event) => handleStatusClick(event, item.order)} // Mở menu khi nhấn Update
                      >
                        <p className="text-red-600">Status</p>
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">No orders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Menu chọn trạng thái */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {statuses.map((status) => (
          <MenuItem key={status} onClick={() => {
            if (selectedOrder) {
              statusHandler(selectedOrder.id, status);
            }
          }}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default OrderItem;
