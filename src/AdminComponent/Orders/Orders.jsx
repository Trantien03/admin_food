import React, { useState } from 'react';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import OrderTable from './OrderTable';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Paid", value: "PAID" },
  { label: "All", value: "ALL" }
];

const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL"); // Giá trị mặc định là "ALL"

  const handleFilter = (e) => {
    setFilterValue(e.target.value); // Cập nhật trạng thái khi chọn giá trị lọc
  };

  return (
    <div className='px-2'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
          Order Status
        </Typography>
        <FormControl>
          <RadioGroup
            onChange={handleFilter}
            row
            name='category'
            value={filterValue}>
            {orderStatus.map((item) => (
              <FormControlLabel
                key={item.label}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
      {/* Truyền filterValue vào OrderTable */}
      <OrderTable filterValue={filterValue} />
    </div>
  );
};

export default Orders;
