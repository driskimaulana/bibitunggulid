import {
  Grid, Backdrop, CircularProgress, Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import CardDashboard from '../../components/CardDashboard/CardDashboard';

const Dashboard = () => {
  const [dashboardData, setdashboardData] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const getData = async () => {
    // await Axios.get('https://utamibakery-backend.vercel.app/dashboard').then((response) => {
    //   setdashboardData(response.data.data);
    //   setisLoading(false);
    // });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>

      <Grid container spacing={2} justifyContent="space-evenly">

        <Grid item>
          <CardDashboard name="Produk" value={10} />
        </Grid>
        <Grid item>
          <CardDashboard name="Pengguna" value={1} />
        </Grid>
      </Grid>

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
