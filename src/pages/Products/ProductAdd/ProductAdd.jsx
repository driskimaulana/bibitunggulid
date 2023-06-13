import { Icon } from '@iconify/react';
import {
  Box, Grid, TextField, Typography, FormControl, InputLabel, FilledInput, InputAdornment,
  Button, OutlinedInput, CircularProgress, Autocomplete, Accordion,
  AccordionSummary, AccordionDetails, Divider, Backdrop,
} from '@mui/material';

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Category } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProductAdd = () => {
  const [img, setImg] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState(0);
  const [weight, setweight] = useState(0);
  const [stock, setstock] = useState(0);
  const [suppliers, setsuppliers] = useState(null);
  const [category, setcategory] = useState(null);
  const [planId, setplanId] = useState(null);
  const [suppliersSelected, setsuppliersSelected] = useState(null);
  const [categorySelected, setcategorySelected] = useState(null);
  const [imgToBeScan, setimgToBeScan] = useState([]);
  const [triggerAI, setTriggerAI] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [localName, setlocalName] = useState('');
  const [about, setabout] = useState('');
  const [scienceName, setscienceName] = useState('');
  const [family, setfamily] = useState('');
  const [kingdom, setkingdom] = useState('');
  const [order, setorder] = useState('');

  const adminLoggedIn = JSON.parse(window.localStorage.getItem('adminLoggedIn'));

  const [plantDetails, setplantDetails] = useState(null);

  const addImage = (newImg) => {
    setImg((prevImg) => [
      ...prevImg,
      newImg,
    ]);

    console.log(img);
  };
  const addImgToBeScan = (newImg) => {
    setimgToBeScan((prevImg) => [
      ...prevImg,
      newImg,
    ]);
    setTriggerAI(triggerAI + 1);
  };

  const getPlantsDataUsingImage = async () => {
    // setisLoading(true);
    if (imgToBeScan.length === 0) {
      setisLoading(false);
      return;
    }
    setisLoading(true);
    const data = new FormData();
    data.append('file', imgToBeScan[0]);
    await Axios.post('https://ml-bibitunggulid-zldx7crkfq-et.a.run.app/', data).then((response) => {
      setisLoading(false);
      console.log(response);
      setplanId(response.data.scienceName);
      setlocalName(response.data.localName);
      setabout(response.data.about);
      setscienceName(response.data.scienceName);
      setfamily(response.data.family);
      setkingdom(response.data.kingdom);
      setorder(response.data.kingdom);
      setname(response.data.localName);
      setdescription(`${response.data.about}\n\nLocal Name: ${response.data.localName}\nScientific Name: ${response.data.scienceName}\nFamily: ${response.data.family}\nKingdom: ${response.data.kingdom}\nOrder: ${response.data.order}`);
      setisLoading(false);
      setimgToBeScan([]);
    });
  };

  useEffect(() => {
    console.log(triggerAI);
    getPlantsDataUsingImage();
  }, [triggerAI]);

  const addPreview = (newPreview) => {
    setPreview((prevPreview) => [
      ...prevPreview,
      newPreview,
    ]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    console.log(planId);

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
    // eslint-disable-next-line no-unused-expressions
    planId !== null && data.append('planId', planId);
    img.map((e) => data.append('pictures', e));
    // data.append('pictures');
    const config = {
      headers: { Authorization: `Bearer ${adminLoggedIn.token}` },
    };

    // await Axios.post('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/product/', data, config).then((response) => {
    await Axios.post('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/product/', data, config).then((response) => {
      console.log(response);
      window.location.href = '/dashboard/products';
    }).catch((error) => console.error(error));
  };

  const getInputData = async () => {
    await Axios.get('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/suppliers/').then((response) => {
      const responsedata = response.data.data.map((e) => ({ label: e.companyName, id: e.id }));
      console.log(responsedata);
      setsuppliers(responsedata);
    });

    await Axios.get('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/category/').then((response) => {
      const responsedata = response.data.data.map((e) => ({ label: e.categoryName, id: e.id }));
      console.log(responsedata);
      setcategory(responsedata);
    });
  };

  useEffect(() => {
    getInputData();
  }, []);

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
        <Grid item md={12}>
          <Accordion>
            <AccordionSummary expandIcon={<Icon icon="raphael:arrowright" />}>
              <Typography fontWeight="600">Automatic Plant Details Input Using AI (Optional)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                isLoading ? <CircularProgress /> : (
                  <Button
                    variant="outlined"
                    component="label"
                  >
                    <Icon icon="material-symbols:add-box" />
                    Upload Plant Image
                    <input
                      type="file"
                      hidden
                      onChange={(e) => addImgToBeScan(e.target.files[0])}
                    />
                  </Button>
                )
              }
              <Divider sx={{ marginBlock: '20px' }}>
                <Typography variant="p" fontWeight={500}>
                  Plant Details (Non Editable)
                </Typography>
              </Divider>
              <Grid container rowGap={2} alignItems="center" justifyContent="center">
                <Grid item md={6} paddingRight={2}>
                  <TextField fullWidth label="Local Name" value={localName} disabled />
                </Grid>
                <Grid item md={6} paddingLeft={2}>
                  <TextField fullWidth label="Scientific Name" value={scienceName} disabled />
                </Grid>
                <Grid item md={12}>
                  <TextField fullWidth label="About" multiline value={about} rows={5} disabled />
                </Grid>
                <Grid item md={4} paddingRight={2}>
                  <TextField fullWidth label="Family" value={family} disabled />
                </Grid>
                <Grid item md={4} paddingLeft={0}>
                  <TextField fullWidth label="Kingdom" value={kingdom} disabled />
                </Grid>
                <Grid item md={4} paddingLeft={2}>
                  <TextField fullWidth label="Order" value={order} disabled />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
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
                  backgroundColor: '#0FB203',
                  color: 'white',
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

export default ProductAdd;
