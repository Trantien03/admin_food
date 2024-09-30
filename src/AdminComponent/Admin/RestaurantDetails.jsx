import { Button, Card, CardContent, CardHeader } from '@mui/material';
import React, { useState } from 'react'; // Import useState
import { Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const RestaurantDetails = () => {
  const [isOpen, setIsOpen] = useState(true); // Define state for restaurant status

  const handleRestaurantStatus = () => {
    setIsOpen(prevIsOpen => !prevIsOpen); // Toggle the isOpen state
  };

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>Viet Nam Fast Food</h1>
        <div>
          <Button 
            color={isOpen ? "primary" : "error"} // Toggle color based on isOpen
            className='py-[1rem] px-[2rem]' 
            variant='contained'
            onClick={handleRestaurantStatus} 
            size='large'
          >
            {isOpen ? "Close" : "Open"} {/* Toggle button text */}
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
                  <p className='w-48 text-gray-800'>Owner</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>Cty TNHH mot minh tao!</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Restaurant Name</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>Food Restaurant</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Cuisine Type</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>Food restaurant</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Opening Hours</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>7:00 AM - 23:00 PM </p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Status</p>
                  <p className='text-gray-800'>
                    <span className='pr-5'>-</span>
                    {isOpen
                      ? <span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open</span>
                      : <span className='px-5 py-2 rounded-full bg-red-400 text-gray-950'>Closed</span>
                    }
                  </p>
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
                  <p className='w-48 text-gray-800'>Country</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>Việt Nam</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>City</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>Hà Nội</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Postal Code</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>0123456</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Street Address</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>8 Tôn Thất Thuyết</p>
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
                  <p className='w-48 text-gray-800'>Email</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>codefood@gmail.com</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Mobile</p>
                  <p className='text-gray-800'><span className='pr-5'>-</span>+84 0912345678</p>
                </div>
                <div className='flex'>
                  <p className='w-48 text-gray-800'>Social</p>
                  <div className='flex text-gray-950 items-center pb-3 gap-2'>
                    <span className='pr-5'>-</span>
                    <a href="/">
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="/">
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="/">
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="/">
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
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
