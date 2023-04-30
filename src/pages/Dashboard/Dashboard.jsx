import {
  Grid,
} from '@mui/material';
import CardDashboard from '../../components/CardDashboard/CardDashboard';

const Dashboard = () => (
  <Grid container spacing={2} justifyContent="space-evenly">
    <Grid item>
      <CardDashboard name="Produk" value={50} />
    </Grid>
    <Grid item>
      <CardDashboard name="Blog" value={20} />
    </Grid>
    <Grid item>
      <CardDashboard name="Pengguna" value={100} />
    </Grid>

  </Grid>
);

export default Dashboard;
