import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const url = "http://localhost:8080/api/v1/coupons"; // Đặt URL API ở đây

const CreateEvent = ({ open, handleClose, coupon }) => {
  const [formValues, setFormValues] = useState({
    image: null,
    name: '',
    startedAt: null,
    endsAt: null,
    discount: '',
    code: ''
  });

  useEffect(() => {
    if (coupon) {
      setFormValues({
        image: null, // Reset image nếu chỉnh sửa
        name: coupon.name,
        discount: coupon.discount,
        code: coupon.code,
        startedAt: dayjs(coupon.startedAt),
        endsAt: dayjs(coupon.endsAt),
      });
    } else {
      setFormValues({
        image: null,
        name: '',
        startedAt: null,
        endsAt: null,
        discount: '',
        code: ''
      });
    }
  }, [coupon]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dayjs(formValues.endsAt).isBefore(formValues.startedAt)) {
      alert("Ngày kết thúc không thể trước ngày bắt đầu!");
      return;
    }

    const formData = new FormData();
    formData.append('image', formValues.image);
    formData.append('name', formValues.name);
    formData.append('startedAt', formValues.startedAt);
    formData.append('endsAt', formValues.endsAt);
    formData.append('discount', formValues.discount);
    formData.append('code', formValues.code);

    try {
      if (coupon) {
        await axios.put(`${url}/${coupon.id}`, formData, config);
        toast.success("Sự kiện đã được cập nhật thành công!");
      } else {
        await axios.post(url, formData, config);
        toast.success("Sự kiện đã được tạo thành công!");
      }
      handleClose();
    } catch (error) {
      console.error('Error creating/updating event:', error);
      toast.error('Tạo/cập nhật sự kiện thất bại.');
    }
  };

  const handleFormChange = (e) => {
    if (e.target.name === 'image') {
      setFormValues({ ...formValues, image: e.target.files[0] });
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const handleDateChange = (newValue, dateType) => {
    setFormValues({ ...formValues, [dateType]: newValue });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleFormChange}
                  required={!coupon}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Tên sự kiện"
                  variant="outlined"
                  onChange={handleFormChange}
                  value={formValues.name}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="discount"
                  name="discount"
                  label="Giảm giá"
                  variant="outlined"
                  onChange={handleFormChange}
                  value={formValues.discount}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="code"
                  name="code"
                  label="Mã"
                  variant="outlined"
                  onChange={handleFormChange}
                  value={formValues.code}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Ngày bắt đầu"
                  value={formValues.startedAt}
                  onChange={(newValue) => handleDateChange(newValue, 'startedAt')}
                  inputFormat="MM/DD/YYYY hh:mm A"
                  sx={{ width: '100%' }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Ngày kết thúc"
                  value={formValues.endsAt}
                  onChange={(newValue) => handleDateChange(newValue, 'endsAt')}
                  inputFormat="MM/DD/YYYY hh:mm A"
                  sx={{ width: '100%' }}
                  required
                />
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                {coupon ? 'Cập nhật sự kiện' : 'Tạo sự kiện'}
              </Button>
            </Box>
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

export default CreateEvent;
