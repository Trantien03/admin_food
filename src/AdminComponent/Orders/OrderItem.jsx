import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderItem = ({ selectedTable, onBack, url = `http://localhost:8080` }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Hàm lấy tất cả đơn hàng
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/orders`);
      console.log("Fetched Orders:", response.data.content); // Kiểm tra dữ liệu
      if (response.status === 200) {
        setOrderItems(response.data.content);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  const filteredOrders = selectedTable
    ? orderItems.filter((order) => order.restaurantTable.nameTable === selectedTable)
    : [];
  
  console.log("Filtered Orders:", filteredOrders); // Kiểm tra danh sách đơn hàng đã lọc

  const handleOpenModal = (orderId) => {
    const order = filteredOrders.find((order) => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleOpenMenu = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrderId(orderId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentOrderId(null);
  };

  const handleUpdateStatus = async (status) => {
    try {
      const response = await axios.patch(`${url}/api/v1/orders/${currentOrderId}`, null, {
        params: { status }
      });
      if (response.status === 200) {
        toast.success("Order status updated successfully");
        fetchAllOrders();
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating order status");
    }
    handleCloseMenu();
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={`Order Items for ${selectedTable}`}
          action={<Button onClick={onBack} variant="outlined" color="primary">Back</Button>}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, minHeight: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Bill Number</TableCell>
                <TableCell align="left">Table</TableCell>
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Total Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} style={{ cursor: "pointer" }}>
                    <TableCell onClick={() => handleOpenModal(order.id)}>{order.billNumber}</TableCell>
                    <TableCell>{order.restaurantTable.nameTable}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.totalPrice} VND</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        aria-controls="status-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event, order.id)}
                      >
                        {order.status}
                      </Button>
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                        <MenuItem onClick={() => handleUpdateStatus("Pending")}>Pending</MenuItem>
                        <MenuItem onClick={() => handleUpdateStatus("Paid")}>Paid</MenuItem>
                        <MenuItem onClick={() => handleUpdateStatus("PendingPayment")}>Pending Payment</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No orders available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal để xem chi tiết đơn hàng */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="order-details-modal-title"
        aria-describedby="order-details-modal-description"
      >
        <Box sx={{ padding: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3, maxWidth: 500, maxHeight: 500, margin: 'auto', marginTop: 15 }}>
          <Typography variant="h5" id="order-details-modal-title" align="center">
            Bill: {selectedOrder?.billNumber}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="subtitle1">Customer: {selectedOrder?.customer}</Typography>
          <Typography variant="subtitle1">Table: {selectedOrder?.restaurantTable?.nameTable}</Typography>
          <Typography variant="subtitle1">Coupon: {selectedOrder?.coupon || "None"}</Typography>
          <Typography variant="subtitle1">Payment: {selectedOrder?.paymentMethod}</Typography>
          <Typography variant="subtitle1">Original Price: {selectedOrder?.originalPrice} VND</Typography>
          <Typography variant="subtitle1">Total Discount: {selectedOrder?.totalDiscount} VND</Typography>
          <Typography variant="subtitle1">Total Price: {selectedOrder?.totalPrice} VND</Typography>
          <Divider sx={{ marginY: 2 }} />
          <h3 className="text-lg font-semibold mb-2">Ordered Dishes:</h3>
          <div className="flex flex-col gap-4">
            {selectedOrder?.orderedDishes && selectedOrder.orderedDishes.map((item, index) => ( // Changed to use orderedDishes
              <div
                key={index}
                className="flex items-center border-b border-gray-200 pb-2"
              >
                <img
                  src={`http://localhost:8080/images/${item.dish.image}`}
                  alt={item.dish.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{item.dish.name}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="ml-auto font-semibold">{item.dish.price} VND</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition duration-200"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderItem;
