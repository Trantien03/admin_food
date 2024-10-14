import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
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
    if (url) {
      fetchAllOrders();
    }
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
        params: { status },
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
                    <TableCell onClick={() => handleOpenModal(order.id)}>{order.restaurantTable.nameTable}</TableCell>
                    <TableCell onClick={() => handleOpenModal(order.id)}>{order.customer}</TableCell>
                    <TableCell onClick={() => handleOpenModal(order.id)}>{order.totalPrice} $</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={
                          order.status === "Paid"
                            ? "success"
                            : order.status === "Pending"
                            ? "warning"
                            : "info"
                        }
                        aria-controls="status-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event, order.id)}
                        startIcon={
                          order.status === "Paid" ? (
                            <i className="fas fa-check" /> // Biểu tượng cho "Paid"
                          ) : order.status === "Pending" ? (
                            <i className="fas fa-hourglass-half" /> // Biểu tượng cho "Pending"
                          ) : (
                            <i className="fas fa-clock" /> // Biểu tượng cho "PendingPayment"
                          )
                        }
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
      {selectedOrder && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 md:mx-auto overflow-y-auto max-h-[100vh]">
              <h2 className="text-xl font-bold mb-4 text-center" id="modal-modal-title">
                Bill: {selectedOrder.billNumber}
              </h2>
              <div className="mb-4">
                <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                <p><strong>Table:</strong> {selectedOrder.restaurantTable.nameTable}</p>
                <p><strong>Coupon:</strong> {selectedOrder.coupon ? selectedOrder.coupon.name : "None"}</p>
                <p><strong>Payment:</strong> {selectedOrder.payment}</p>
                <p><strong>Original Price:</strong> ${selectedOrder.originalPrice}</p>
                <p><strong>Total Discount:</strong> ${selectedOrder.totalDiscount}</p>
                <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
              </div>

              <h3 className="text-lg font-semibold mb-2">Ordered Dishes:</h3>
              {selectedOrder.orderItems && selectedOrder.orderItems.length > 0 ? (
                <Table>
                  <TableBody>
                    {selectedOrder.orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <img
                            src={`http://localhost:8080/images/${item.dish.image}`}
                            alt={item.dish.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </TableCell>
                        <TableCell>{item.dish.name}</TableCell>
                        <TableCell>Quantity: {item.quantity}</TableCell>
                        <TableCell>${item.dish.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No items found in this order.</p>
              )}

              <div className="flex justify-end mt-6">
                <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Box>
  );
};

export default OrderItem;
