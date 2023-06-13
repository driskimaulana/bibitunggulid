import {
  Box, Typography, Grid, Divider, TextField, Backdrop, CircularProgress,
  Button, Autocomplete,
} from '@mui/material';
import { useState } from 'react';

import Axios from 'axios';

const AddUser = () => {
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');
  const [userName, setuserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rolesSelected, setrolesSelected] = useState('');

  const roles = [
    {
      label: 'Product Admin',
    },
    {
      label: 'Suppliers Admin',
    },
    {
      label: 'Order Admin',
    },
    {
      label: 'Viewer',
    },
    {
      label: 'Editor',
    },

  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    const newAdmin = {
      fullName, email, userName, password, phone, role: rolesSelected,
    };
    const adminLoggedIn = JSON.parse(window.localStorage.getItem('adminLoggedIn'));

    const config = {
      headers: { Authorization: `Bearer ${adminLoggedIn.token}` },
    };

    await Axios.post('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/admin', newAdmin, config).then(() => {
      window.location.href = '/dashboard/users';
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
        Admin Baru

      </Typography>
      <Grid container rowGap={2}>

        <Grid item md={12} sx={{ marginBlock: '20px' }}>
          <Divider>
            <Typography variant="p" fontWeight={500}>
              Admin Details
            </Typography>
          </Divider>
        </Grid>
        <Grid item md={6} pr={1}>
          <TextField value={fullName} onChange={(newValue) => setfullName(newValue.target.value)} fullWidth label="Nama Admin" />
        </Grid>
        <Grid item md={6} pl={1}>
          <TextField value={userName} onChange={(newValue) => setuserName(newValue.target.value)} fullWidth label="Username" />
        </Grid>
        <Grid item md={4}>
          <TextField value={email} onChange={(newValue) => setemail(newValue.target.value)} fullWidth label="Email" />
        </Grid>
        <Grid item md={4} pl={1} pr={1}>
          <TextField value={phone} onChange={(newValue) => setphone(newValue.target.value)} fullWidth label="Phone" />
        </Grid>
        <Grid item md={4}>
          <TextField value={password} onChange={(newValue) => setpassword(newValue.target.value)} fullWidth label="Password" type="password" />
        </Grid>
        <Grid item md={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={roles}
            onChange={(event, newInputValue) => {
              if (newInputValue) {
                setrolesSelected(newInputValue.label);
              }
            }}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Role" />}
          />

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
            }}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Tambah Admin
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

export default AddUser;
