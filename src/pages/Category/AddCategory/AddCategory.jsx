import { Icon } from '@iconify/react';
import {
  Box, Grid, TextField, Typography, FormControl, InputLabel, FilledInput, InputAdornment,
  Button, OutlinedInput, CircularProgress,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { json } from 'react-router-dom';

const AddCategory = () => {
  const [loading, setLoading] = useState(false);

  const [name, setname] = useState('');
  const [description, setdescription] = useState('');

  const handleSubmit = async (imgData) => {
    const newCategory = {
      categoryName: name,
      description,
    };
    // await Axios.post('https://utamibakery-backend.vercel.app/products/', newProduct).then((response) => {
    await Axios.post('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/category/', newCategory).then((response) => {
      window.location.href = '/dashboard/category/';
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
        Product Baru

      </Typography>
      <Grid container gap={2}>
        <Grid item md={12}>
          <TextField value={name} onChange={(newValue) => setname(newValue.target.value)} fullWidth label="Nama Kategori" />
        </Grid>

        <Grid item md={12}>
          <TextField value={description} onChange={(newValue) => setdescription(newValue.target.value)} fullWidth label="Deskripsi" />
        </Grid>

        <Grid
          item
          md={4}
        >
          { loading ? <CircularProgress />
            : (
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
                Tambah Kategori
              </Button>
            )}
        </Grid>
      </Grid>

    </Box>
  );
};

export default AddCategory;
