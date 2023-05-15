import {
  Grid, Backdrop, CircularProgress, Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import CardDashboard from '../../components/CardDashboard/CardDashboard';

const Dashboard = () => {
  const [dashboardData, setdashboardData] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const getData = async () => {
    await Axios.get('http://localhost:5000/dashboard').then((response) => {
      setdashboardData(response.data.data);
      setisLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      {
        dashboardData !== null
    && (
    <Grid container spacing={2} justifyContent="space-evenly">

      <Grid item>
        <CardDashboard name="Produk" value={dashboardData.products} />
      </Grid>
      <Grid item>
        <CardDashboard name="Blog" value={dashboardData.blogs} />
      </Grid>
      <Grid item>
        <CardDashboard name="Pengguna" value={dashboardData.users} />
      </Grid>
    </Grid>
    )
      }
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Dashboard;
