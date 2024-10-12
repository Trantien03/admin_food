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
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const OrderTable = ({ url = `http://localhost:8080` }) => {
  const [orderItems, setOrderItems] = useState([]); // Quản lý danh sách đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng đã chọn để cập nhật
  const [openModal, setOpenModal] = useState(false); // Điều khiển modal
  const [anchorEl, setAnchorEl] = useState(null); // Để mở Menu thay đổi trạng thái
  const [currentOrderId, setCurrentOrderId] = useState(null); // Đơn hàng đang thay đổi trạng thái

  // Hàm lấy danh sách tất cả đơn hàng từ API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/orders`);
      if (response.status === 200) {
        setOrderItems(response.data.content); // Cập nhật danh sách đơn hàng
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  // Hàm lấy chi tiết đơn hàng theo ID
  const fetchOrderById = async (orderId) => {
    try {
      const response = await axios.get(`${url}/api/v1/order_item/${orderId}`);
      if (response.status === 200) {
        setSelectedOrder(response.data); // Lưu thông tin đơn hàng chi tiết
        setOpenModal(true); // Mở modal
      } else {
        toast.error("Error fetching order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("An error occurred while fetching order details");
    }
  };

  // Lấy danh sách đơn hàng khi component mount
  useEffect(() => {
    if (url) {
      fetchAllOrders();
    }
  }, [url]);

  // Mở modal và lấy chi tiết đơn hàng theo ID
  const handleOpenModal = (orderId) => {
    fetchOrderById(orderId);
  };

  // Hàm đóng Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  // Hàm mở Menu trạng thái
  const handleOpenMenu = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrderId(orderId); // Gán ID đơn hàng hiện tại
  };

  // Hàm đóng Menu trạng thái
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentOrderId(null); // Xóa ID đơn hàng hiện tại
  };

  // Hàm cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (status) => {
    try {
      const response = await axios.patch(`${url}/api/v1/orders/${currentOrderId}/status`, { status });
      if (response.status === 200) {
        toast.success("Order status updated successfully");
        fetchAllOrders(); // Reload lại danh sách đơn hàng
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
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, minHeight: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Bill Number</TableCell>
                <TableCell align="left">Table</TableCell>
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Total Price</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.length > 0 ? (
                orderItems.map((order, index) => (
                  <TableRow key={index} style={{ cursor: "pointer" }}>
                    <TableCell onClick={() => handleOpenModal(order.id)}>{order.billNumber}</TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>{order.restaurantTable.nameTable}</TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>{order.customer}</TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>${order.totalPrice}</TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>{new Date(order.createAt).toLocaleString()}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: "20px",
                          backgroundColor: order.status === "Paid" ? "green" : "gray",
                          color: "white",
                          padding: "5px 20px",
                        }}
                        onClick={(e) => handleOpenMenu(e, order.id)} // Mở Menu trạng thái
                      >
                        {order.status}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Menu thay đổi trạng thái */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => handleUpdateStatus("Pending")}>Pending</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus("Paid")}>Paid</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus("PendingPayment")}>Pending Payment</MenuItem>
      </Menu>

      {/* Modal hiển thị chi tiết đơn hàng */}
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
                Bill: {selectedOrder[0]?.order.billNumber}
              </h2>

              <div className="mb-4">
                <p><strong>Customer:</strong> {selectedOrder[0]?.order.customer}</p>
                <p><strong>Table:</strong> {selectedOrder[0]?.order.restaurantTable.nameTable}</p>
                <p>
                  <strong>Coupon:</strong> {selectedOrder[0]?.order.coupon ? selectedOrder[0]?.order.coupon.name : "None"}
                </p>
                <p><strong>Payment:</strong> {selectedOrder[0]?.order.payment}</p>
                <p><strong>Original Price:</strong> ${selectedOrder[0]?.order.originalPrice}</p>
                <p><strong>Total Discount:</strong> ${selectedOrder[0]?.order.totalDiscount}</p>
                <p><strong>Total Price:</strong> ${selectedOrder[0]?.order.totalPrice}</p>
              </div>

              <h3 className="text-lg font-semibold mb-2">Ordered Dishes:</h3>
              <div className="flex flex-col gap-4">
                {selectedOrder.map((item, index) => (
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
                    <p className="ml-auto font-semibold">${item.dish.price}</p>
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
            </div>
          </div>
        </Modal>
      )}
    </Box>
  );
};

export default OrderTable;
