import { Button, Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';
import { Grid } from '@mui/material'; // Correctly importing Grid
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const RestaurantDetails = () => {
  const handleRestaurantStatus = () => {
    // Implement the functionality for handling restaurant status here
  };

  const isOpen = true; // Example variable to determine status (can be replaced with state)

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>Viet Nam Fast Food</h1>
        <div>
          <Button 
            color={isOpen ? "primary" : "error"} // Use a variable to toggle color
            className='py-[1rem] px-[2rem]' 
            variant='contained'
            onClick={handleRestaurantStatus} 
            size='large'
          >
            {isOpen ? "Close" : "Open"} {/* Use the same variable for button text */}
          </Button>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className='text-gray-800'>Restaurant</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-400'>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Owner</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Restaurant Name</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Cuisine Type</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Opening Hours</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Status</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'>
                    <span className='pr-5'>-</span>
                    {true?<span className='px-5 py-2 rounded-full bg-green-400 
                    text-gray-950'>Open</span>
                    :<span className='px-5 py-2 rounded-full bg-red-400 
                    text-gray-950'>Closed</span>}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-800'>Address</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-400'>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Country</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>City</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Postal Code</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Street Address</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-800'>Contact</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-400'>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Email</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Mobile</p> {/* Added ':' for clarity */}
                  <p className='text-gray-800'><span className='pr-5'>-</span>Code With ABC</p> {/* Removed nested <p> */}
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Social</p> {/* Added ':' for clarity */}
                  <div className='flex text-gray-950 items-center pb-3 gap-2'>
                      <span className='pr-5'>-</span>
                      <a href="/">
                      <InstagramIcon sx={{fontSize:"3rem"}}/>
                      </a>
                      <a href="/">
                      <TwitterIcon sx={{fontSize:"3rem"}}/>
                      </a>
                      <a href="/">
                      <LinkedInIcon sx={{fontSize:"3rem"}}/>
                      </a>
                      <a href="/">
                      <FacebookIcon sx={{fontSize:"3rem"}}/>
                      </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDetails;
