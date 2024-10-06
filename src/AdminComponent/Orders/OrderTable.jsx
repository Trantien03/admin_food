import React, { useState, useEffect } from "react";
import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";
// import { assets } from "../../assets/assets"; // Ensure assets is correctly imported

const OrderTable = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Refetch if URL changes

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Table</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Items</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.table}</TableCell>
                    <TableCell align="right">
                      <img src={assets.parcel_icon} alt="Parcel Icon" width="50" />
                    </TableCell>
                    <TableCell align="right">{order.address.firstName} {order.address.lastName}</TableCell>
                    <TableCell align="right">${order.amount}</TableCell>
                    <TableCell align="right">{order.items[0]?.name}</TableCell>
                    <TableCell align="right">
                      {order.items.map((item, index) => (
                        <span key={index}>{item.name} x {item.quantity}{index < order.items.length - 1 ? ', ' : ''}</span>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        value={order.status}
                        onChange={(event) => statusHandler(event, order._id)}
                        fullWidth
                      >
                        <MenuItem value="Food Processing">Food Processing</MenuItem>
                        <MenuItem value="Out for delivery">Out for delivery</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">No orders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrderTable;
