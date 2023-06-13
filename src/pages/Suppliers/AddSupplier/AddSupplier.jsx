import { Icon } from '@iconify/react';
import {
  Box, Grid, TextField, Typography, FormControl, InputLabel, FilledInput, InputAdornment,
  Button, OutlinedInput, CircularProgress, Divider,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { json } from 'react-router-dom';

const SupplierCard = () => {

};

const AddSupplier = () => {
  const [img, setImg] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [companyName, setcompanyName] = useState('');
  const [contactName, setcontactName] = useState('');
  const [email, setemail] = useState('');
  const [contactPhone, setcontactPhone] = useState('');
  const [bio, setbio] = useState('');
  const [province, setprovince] = useState('');
  const [city, setcity] = useState('');
  const [subDistrict, setsubDistrict] = useState('');
  const [fullAddress, setfullAddress] = useState('');
  const [postalCode, setpostalCode] = useState('');

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

  const handleSubmit = async (e) => {
    setLoading(true);
    // eslint-disable-next-line prefer-const
    let data = new FormData();
    // data.append('pictures', img);
    data.append('companyName', companyName);
    data.append('contactName', contactName);
    data.append('email', email);
    data.append('bio', bio);
    // eslint-disable-next-line no-unused-expressions
    img.length !== 0
    && data.append('pictures', img[0]);
    data.append('isActive', true);
    data.append('contactPhone', contactPhone);
    data.append('province', province);
    data.append('city', city);
    data.append('subDistrict', subDistrict);
    data.append('fullAddress', fullAddress);
    data.append('postalCode', postalCode);

    await Axios.post('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/suppliers/', data).then((response) => {
      console.log(response);
      setLoading(false);
      window.location.href = '/dashboard/suppliers';
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
        Suppliers Baru

      </Typography>
      <Grid container gap={2}>
        <Grid item md={12}>

          <Typography variant="p">Detail Toko</Typography>
          <Divider />

        </Grid>
        <Grid item md={12}>
          <TextField value={companyName} onChange={(newValue) => setcompanyName(newValue.target.value)} fullWidth label="Nama Toko" />
        </Grid>
        <Grid item md={12}>
          <TextField value={bio} onChange={(newValue) => setbio(newValue.target.value)} fullWidth label="Bio Toko" multiline rows={5} />
        </Grid>
        <Grid item md={12}>
          <TextField value={contactName} onChange={(newValue) => setcontactName(newValue.target.value)} fullWidth label="Nama Kontak" />
        </Grid>

        <Grid item md={5}>
          <TextField value={email} onChange={(newValue) => setemail(newValue.target.value)} fullWidth label="Email" />
        </Grid>

        <Grid item md={5}>
          <TextField value={contactPhone} onChange={(newValue) => setcontactPhone(newValue.target.value)} fullWidth label="Nomor WhatsApp" />
        </Grid>

        <Grid item md={12}>

          <Typography variant="p">Alamat Toko</Typography>
          <Divider />

        </Grid>

        <Grid item md={3}>
          <TextField value={province} onChange={(newValue) => setprovince(newValue.target.value)} fullWidth label="Provinsi" />
        </Grid>

        <Grid item md={3}>
          <TextField value={city} onChange={(newValue) => setcity(newValue.target.value)} fullWidth label="Kota/Kabupaten" />
        </Grid>
        <Grid item md={3}>
          <TextField value={subDistrict} onChange={(newValue) => setsubDistrict(newValue.target.value)} fullWidth label="Kecamatan" />
        </Grid>
        <Grid item md={2}>
          <TextField value={postalCode} onChange={(newValue) => setpostalCode(newValue.target.value)} fullWidth label="Kode Pos" />
        </Grid>

        <Grid item md={12}>
          <TextField value={fullAddress} onChange={(newValue) => setfullAddress(newValue.target.value)} fullWidth label="Alamat Lengkap" />
        </Grid>

        <Grid item md={12}>

          <Typography variant="p">Logo Toko (Optional)</Typography>
          <Divider />

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
              multiple="multiple"
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
                Tambah Suppliers
              </Button>
            )}
        </Grid>
      </Grid>

    </Box>
  );
};

export default AddSupplier;
