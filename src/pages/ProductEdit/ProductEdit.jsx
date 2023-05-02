import { Icon } from '@iconify/react';
import {
  Box, Grid, TextField, Typography, FormControl, InputLabel, InputAdornment,
  Button, OutlinedInput, CircularProgress, IconButton,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const ProductEdit = () => {
  const [img, setImg] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState(0);
  const [weight, setweight] = useState(0);
  const [stock, setstock] = useState(0);

  const [product, setProduct] = useState(null);
  const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  useEffect(() => {
    Axios.get(`https://utamibakery-backend.vercel.app/products/${id}`).then((response) => {
      console.log(response.data.data.product);
      setProduct(response.data.data.product);
      setname(response.data.data.product.name);
      setprice(response.data.data.product.price);
      setweight(response.data.data.product.weight);
      setstock(response.data.data.product.quantity);
      setdescription(response.data.data.product.description);
    });
  }, []);

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

  const deleteImage = (index) => {
    product.photos.splice(index, 1);
    console.log(product.photos);
    setProduct((prevProduct) => ({
      ...prevProduct,
      photos: product.photos,
    }));
  };

  const uploadProduct = async (imgData) => {
    const newProduct = {
      name,
      description,
      photos: [
        ...product.photos,
        ...imgData,
      ],
      price,
      quantity: stock,
      weight,
    };
    console.log(newProduct);
    await Axios.put(`https://utamibakery-backend.vercel.app/products/${id}`, newProduct).then((response) => {
      console.log(response.data);
      window.location.href = 'http://localhost:3000/dashboard/products/';
    });
  };

  const submitImage = async () => {
    setLoading(true);
    const imgData = [];

    if (img.length === 0) {
      uploadProduct(imgData);
    }

    img.map(async (i, y) => {
      const data = new FormData();
      data.append('file', i);
      data.append('upload_preset', 'utamibakerypresets');
      data.append('cloud_name', 'dscbb3cu2');

      console.log('Proces upload');
      console.log(data);

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
    product == null ? <CircularProgress />
      : (
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
            {/* <Grid item md={12}> */}
            {
                    product.photos.map((img, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <img
                          style={{
                            marginInline: '10px',
                          }}
                          src={img}
                          alt="preview"
                          width={100}
                          height="auto"
                        />
                        <IconButton onClick={() => { deleteImage(i); }}><Icon icon="material-symbols:delete" color="#be0e17" /></IconButton>
                      </Box>
                    ))
                }
            {/* </Grid> */}
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
            md={12}
            sx={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            {

                img
                  && prevImage

            }
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

        </Box>
      )
  );
};

export default ProductEdit;
