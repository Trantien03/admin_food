import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';
import { Line } from 'react-chartjs-2'; // Thay đổi import từ Bar sang Line
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các scale và các thành phần biểu đồ cần thiết
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dữ liệu cho doanh thu theo ngày
  const dailyRevenueData = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], // Ngày
    datasets: [
      {
        label: 'Doanh thu theo ngày',
        data: [1000, 1500, 1200, 2000, 1800, 2500, 3000, 2200, 2700, 2300],
        backgroundColor: 'rgba(0, 123, 255, 0.6)', // Màu xanh dương nhạt
        borderColor: 'rgba(0, 123, 255, 1)', // Màu xanh dương đậm
        borderWidth: 2,
        fill: true, // Đổ đầy màu dưới đường
      },
    ],
  };

  // Dữ liệu cho doanh thu theo tháng
  const monthlyRevenueData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Doanh thu theo tháng',
        data: [5000, 7000, 8000, 6000, 9000, 12000],
        backgroundColor: 'rgba(255, 165, 0, 0.6)', // Màu cam nhạt
        borderColor: 'rgba(255, 165, 0, 1)', // Màu cam đậm
        borderWidth: 2,
        fill: true, // Đổ đầy màu dưới đường
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 p-6 bg-gray-100">
        {/* Dashboard Content */}
        <div className="w-full lg:w-4/4 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Welcome to Your Dashboard</h2>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className="shadow-md">
                <CardHeader
                  title="Doanh thu theo ngày"
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Line data={dailyRevenueData} /> {/* Biểu đồ doanh thu theo ngày */}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className="shadow-md">
                <CardHeader title="Doanh thu theo tháng" />
                <CardContent>
                  <Line data={monthlyRevenueData} /> {/* Biểu đồ doanh thu theo tháng */}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className="shadow-md">
                <CardHeader title="Recent Activities" />
                <Divider />
                <CardContent>
                  <ul className="list-disc pl-4">
                    <li className="mb-2">Activity 1: Description here</li>
                    <li className="mb-2">Activity 2: Description here</li>
                    <li className="mb-2">Activity 3: Description here</li>
                    <li className="mb-2">Activity 4: Description here</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card className="shadow-md">
                <CardHeader title="Card 1" />
                <CardContent>
                  <Typography variant="body2">
                    Some information here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card className="shadow-md">
                <CardHeader title="Card 2" />
                <CardContent>
                  <Typography variant="body2">
                    Some information here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card className="shadow-md">
                <CardHeader title="Card 3" />
                <CardContent>
                  <Typography variant="body2">
                    Some information here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
