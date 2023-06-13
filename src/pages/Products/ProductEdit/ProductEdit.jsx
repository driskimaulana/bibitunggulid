import { Icon } from '@iconify/react';
import {
  Box, Grid, TextField, Typography, FormControl, InputLabel, InputAdornment,
  Button, OutlinedInput, CircularProgress, Autocomplete, Divider, Backdrop,
  IconButton,
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
  const [suppliers, setsuppliers] = useState(0);
  const [category, setcategory] = useState(0);
  const [suppliersSelected, setsuppliersSelected] = useState(0);
  const [categorySelected, setcategorySelected] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const [product, setProduct] = useState(null);
  const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  const getInputData = async () => {
    await Axios.get('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/suppliers/').then((response) => {
      const responsedata = response.data.data.map((e) => ({ label: e.companyName, id: e.id }));
      setsuppliers(responsedata);
    });

    await Axios.get('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/category/').then((response) => {
      const responsedata = response.data.data.map((e) => ({ label: e.categoryName, id: e.id }));
      setcategory(responsedata);
    });
    await Axios.get(`https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/product/${id}`).then((response) => {
      setsuppliersSelected(response.data.data.supplierId);
      setcategorySelected(response.data.data.categoryId);
      console.log(response.data.data);
      setProduct(response.data.data);
      setname(response.data.data.productName);
      setprice(response.data.data.unitPrice);
      setweight(response.data.data.unitWeight);
      // setname(response.data);
      setdescription(response.data.data.productDescription);
      setisLoading(false);
    });
  };

  useEffect(() => {
    setisLoading(true);
    getInputData();
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

  const handleSubmit = async () => {
    setLoading(true);

    // eslint-disable-next-line prefer-const
    let data = new FormData();
    // data.append('pictures', img);
    data.append('supplierId', suppliersSelected);
    data.append('productName', name);
    data.append('productDescription', description);
    data.append('categoryId', categorySelected);
    data.append('unitPrice', price);
    data.append('unitWeight', weight);
    data.append('isAvailable', true);
    product.pictures.map((e) => data.append('oldPictures', e));
    // data.append('oldPictures', product.pictures);

    console.log(product.pictures);
    // eslint-disable-next-line no-unused-expressions

    img.map((e) => data.append('pictures', e));
    // data.append('pictures');
    const adminLoggedIn = JSON.parse(window.localStorage.getItem('adminLoggedIn'));

    const config = {
      headers: { Authorization: `Bearer ${adminLoggedIn.token}` },
    };

    // await Axios.post('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/product/', data, config).then((response) => {
    await Axios.put(`https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/product/${id}`, data, config).then((response) => {
      console.log(response);
      window.location.href = '/dashboard/products';
    });
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
    product.pictures.splice(index, 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      pictures: product.pictures,
    }));
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
      <Grid container rowGap={2}>

        <Grid item md={12} sx={{ marginBlock: '20px' }}>
          <Divider>
            <Typography variant="p" fontWeight={500}>
              Product Details
            </Typography>
          </Divider>
        </Grid>
        <Grid item md={12}>
          <TextField value={name} onChange={(newValue) => setname(newValue.target.value)} fullWidth label="Nama Produk" />
        </Grid>
        <Grid item md={5}>
          <FormControl fullWidth>
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
        <Grid item md={4} paddingLeft={2} paddingRight={2}>
          <FormControl fullWidth>
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
          <FormControl fullWidth>
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
        <Grid item md={6} paddingRight={2}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={suppliers}
            // sx={{ width: 300 }}
            onChange={(event, newInputValue) => {
              setsuppliersSelected(newInputValue.id);
            }}
            renderInput={(params) => <TextField {...params} label="Suppliers" />}
          />
        </Grid>
        <Grid item md={6} paddingLeft={2}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={category}
            onChange={(event, newInputValue) => {
              setcategorySelected(newInputValue.id);
            }}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Kategori" />}
          />

        </Grid>

        {
          product !== null
            ? product.pictures.map((img, i) => (
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
            )) : <CircularProgress />
        }

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
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Tambah Produk
              </Button>
            )}
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

export default ProductEdit;
