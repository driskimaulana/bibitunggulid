import {
  Box, Typography, Grid, Divider, TextField, Backdrop, CircularProgress,
  Button, Autocomplete,
} from '@mui/material';
import { useState } from 'react';

import Axios from 'axios';

const AddPlant = () => {
  const [localName, setlocalName] = useState('');
  const [about, setabout] = useState('');
  const [scienceName, setscienceName] = useState('');
  const [family, setfamily] = useState('');
  const [kingdom, setkingdom] = useState('');
  const [order, setorder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const newPlant = {
      localName, about, scienceName, family, kingdom, order,
    };
    const adminLoggedIn = JSON.parse(window.localStorage.getItem('adminLoggedIn'));

    const config = {
      headers: { Authorization: `Bearer ${adminLoggedIn.token}` },
    };

    await Axios.post('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/plants', newPlant, config).then(() => {
      window.location.href = '/dashboard/plants';
      setIsLoading(false);
    });
  };

  return (
    <Box sx={{
      marginInline: '100px',
    }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          marginBottom: '40px',
        }}
      >
        Bunga Baru

      </Typography>
      <Grid container rowGap={2}>

        <Grid item md={12} sx={{ marginBlock: '20px' }}>
          <Divider>
            <Typography variant="p" fontWeight={500}>
              Detail Bunga
            </Typography>
          </Divider>
        </Grid>
        <Grid item md={6} pr={1}>
          <TextField value={localName} onChange={(newValue) => setlocalName(newValue.target.value)} fullWidth label="Local Name" />
        </Grid>
        <Grid item md={6}>
          <TextField value={scienceName} onChange={(newValue) => setscienceName(newValue.target.value)} fullWidth label="Science Name" />
        </Grid>
        <Grid item md={12}>
          <TextField value={about} onChange={(newValue) => setabout(newValue.target.value)} multiline rows={3} fullWidth label="About" />
        </Grid>
        <Grid item md={4}>
          <TextField value={family} onChange={(newValue) => setfamily(newValue.target.value)} fullWidth label="Family" />
        </Grid>
        <Grid item md={4} pl={1} pr={1}>
          <TextField value={kingdom} onChange={(newValue) => setkingdom(newValue.target.value)} fullWidth label="Kingdom" />
        </Grid>
        <Grid item md={4}>
          <TextField value={order} onChange={(newValue) => setorder(newValue.target.value)} fullWidth label="Order" />
        </Grid>

        <Grid
          item
          md={4}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              backgroundColor: '#0FB203',
              color: 'white',
            }}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Tambah Bunga
          </Button>

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

export default AddPlant;
