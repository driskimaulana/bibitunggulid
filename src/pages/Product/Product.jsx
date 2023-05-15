import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  Typography, Box, Grid, Fab, CircularProgress,
  FormControlLabel, Checkbox, FormControl, InputLabel,
  Select, MenuItem, TextField,
} from '@mui/material';

import { Icon } from '@iconify/react';
import Axios from 'axios';
import FilterBox from '../../components/FilterBox/FilterBox';
import ProductCard from '../../components/ProductCard/ProductCard';

const Product = () => {
  const [prods, setprods] = useState(null);
  const [price, setPrice] = React.useState('');

  const handleChange = (event) => {
    setPrice(event.target.value);
    prods.sort((a, b) => {
      if (price === 'Tertinggi') {
        return a.price - b.price;
      }
      return a.price + b.price;
    });
  };

  useEffect(() => {
    if (prods !== null) {
      console.log(price);
      setprods(prods.sort((a, b) => {
        if (price === 'Tertinggi') {
          return a.price - b.price;
        }
        return a.price + b.price;
      }));
    }
  }, [price]);

  useEffect(() => {
    Axios.get('https://utamibakery-backend.vercel.app/products').then((response) => {
      setprods(response.data.data.products);
    });
  }, []);

  return (
    <Box sx={{
      paddingInline: '50px',
    }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary">
        Produk
        {/* {' '}
        {prods[0].name} */}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderRadius: '20px',
        marginTop: '30px',
      }}
      >
        <Box sx={{
          display: 'flex',
          columnGap: '10px',
          alignItems: 'center',
        }}
        >
          <Icon icon="material-symbols:filter-list-rounded" height={20} />
          <Box sx={{
            display: 'flex',
            columnGap: '20px',
            alignItems: 'center',
          }}
          >
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
              <InputLabel id="select-harga">Harga</InputLabel>
              <Select
                labelId="price"
                id="price"
                value={price}
                label="Price"
                onChange={handleChange}
              >
                <MenuItem value="Tertinggi">Tertinggi</MenuItem>
                <MenuItem value="Terendah">Terendah</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <TextField
          sx={{
            borderRadius: '20px',
          }}
          size="small"
          InputProps={{
            endAdornment: (

              <Icon icon="ic:outline-search" />
            ),
            style: (
              {
                borderRadius: '20px',
              }
            ),
          }}
        />
      </Box>
      {
        prods == null ? <CircularProgress />
          : (
            <Grid
              container
              sx={{
                marginTop: '30px',
              }}
              spacing={2}
            >

              {
               prods.map((product, index) => (
                 <Grid key={index} item md={3}>
                   <ProductCard
                     id={product._id}
                     name={product.name}
                     price={product.price}
                     imgUrl={product.photos[0]}
                   />
                 </Grid>
               ))
            // prods.map((product, index) => (
            //   <Grid key={index} item md={3}>
            //     <ProductCard
            //       id={product._id}
            //       name={product.name}
            //       price={product.price}
            //       imgUrl={product.photos[0]}
            //     />
            //   </Grid>
            // ))
          }

            </Grid>
          )
      }
      <Fab
        sx={{
          position: 'fixed',
          top: 30,
          right: 70,
          backgroundColor: '#C678FB',
        }}
        color="secondary"
        href="/dashboard/products/add"
      >
        <Icon icon="solar:add-square-broken" color="#fff" height="30px" />
      </Fab>
    </Box>
  );
};

export default Product;
