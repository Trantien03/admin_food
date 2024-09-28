import React from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues, setFormValues] = React.useState({
    image: "",
    location: "",
    name: "",
    startedAt: null, // Initialize as null
    endsAt: null,    // Initialize as null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit",formValues);
    
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    if (dayjs(date).isValid()) {
      setFormValues({ ...formValues, [dateType]: date });
    } else {
      setFormValues({ ...formValues, [dateType]: null });
    }
  };

  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>
          Create New Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id='image'
                      name='image'
                      label='Image URL'
                      variant='outlined'
                      onChange={handleFormChange}
                      value={formValues.image}
                      required // Optional: make field required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id='location'
                      name='location'
                      label='Location'
                      variant='outlined'
                      onChange={handleFormChange}
                      value={formValues.location}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id='name'
                      name='name'
                      label='Name'
                      variant='outlined'
                      onChange={handleFormChange}
                      value={formValues.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date and Time"
                      value={formValues.startedAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startedAt")
                      }
                      inputFormat="MM/DD/YYYY hh:mm A"
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date and Time"
                      value={formValues.endsAt} // Corrected from startedAt
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endsAt")
                      }
                      inputFormat="MM/DD/YYYY hh:mm A"
                      sx={{ width: "100%" }}
                      required
                    />
                  </Grid>
                </Grid>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button variant='contained' color='primary' type='submit'>
                    Submit
                  </Button>
                </Box>
              </form>
            </LocalizationProvider>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
