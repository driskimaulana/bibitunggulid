import { Icon } from '@iconify/react';
import {
  Box, Grid, TextField, Typography, FormControl, InputLabel, FilledInput, InputAdornment,
  Button, OutlinedInput, CircularProgress,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { json } from 'react-router-dom';

const ProductAdd = () => {
  const [img, setImg] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState(0);
  const [weight, setweight] = useState(0);
  const [stock, setstock] = useState(0);

  const addImage = (newImg) => {
    setImg((prevImg) => [
      ...prevImg,
      newImg,
    ]);
  };

  const addPreview = (newPreview) => {
    setPreview((prevPreview) => [
      ...prevPreview,
      newPreview,
    ]);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!img) {
      setPreview(undefined);
      return;
    }
    if (img[img.length - 1]) {
      const objectUrl = URL.createObjectURL(img[img.length - 1]);
      addPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [img]);

  const uploadProduct = async (imgData) => {
    const newProduct = {
      name,
      description,
      photos: imgData,
      price,
      quantity: stock,
      weight,
    };
    // await Axios.post('https://utamibakery-backend.vercel.app/products/', newProduct).then((response) => {
    await Axios.post('https://utamibakery-backend.vercel.app/products/', newProduct).then((response) => {
      window.location.href = '/dashboard/products/';
    });
  };

  const submitImage = async () => {
    setLoading(true);
    const imgData = [];

    img.map(async (i, y) => {
      const data = new FormData();
      data.append('file', i);
      data.append('upload_preset', 'utamibakerypresets');
      data.append('cloud_name', 'dscbb3cu2');

      await Axios.post('https://api.cloudinary.com/v1_1/dscbb3cu2/image/upload', data).then((response) => {
        imgData.push(response.data.secure_url);
      });

      // if it's the last iteration jump to uploadProduct function
      if (y === img.length - 1) {
        uploadProduct(imgData);
      }
    });
  };

  const prevImage = preview.map((prev, i) => (
    <img
      style={{
        marginInline: '10px',
      }}
      src={prev}
      key={i}
      alt="preview"
      width={100}
      height="auto"
    />
  ));
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
          <TextField value={name} onChange={(newValue) => setname(newValue.target.value)} fullWidth label="Nama Produk" />
        </Grid>
        <Grid item md={5}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Harga</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
              label="Harga"
              value={price}
              onChange={(newValue) => setprice(newValue.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Berat</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              endAdornment={<InputAdornment position="start">Kg</InputAdornment>}
              label="Berat"
              value={weight}
              onChange={(newValue) => setweight(newValue.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Stok</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Stok"
              type="number"
              value={stock}
              onChange={(newValue) => setstock(newValue.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <TextField fullWidth value={description} onChange={(newValue) => setdescription(newValue.target.value)} label="Deskripsi" multiline rows={5} />
        </Grid>
        <Grid item md={12}>
          {

              img
                && prevImage

          }
        </Grid>
        <Grid item md={12}>
          <Button
            variant="outlined"
            component="label"
          >
            <Icon icon="material-symbols:add-box" />
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => addImage(e.target.files[0])}
            />

          </Button>
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
                  backgroundColor: '#5A236D',
                }}
                onClick={submitImage}
              >
                Tambah Produk
              </Button>
            )}
        </Grid>
      </Grid>

    </Box>
  );
};

export default ProductAdd;
