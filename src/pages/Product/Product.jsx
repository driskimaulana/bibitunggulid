import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  Typography, Box, Grid, Fab, CircularProgress,
} from '@mui/material';

import { Icon } from '@iconify/react';
import Axios from 'axios';
import FilterBox from '../../components/FilterBox/FilterBox';
import ProductCard from '../../components/ProductCard/ProductCard';

const Product = () => {
  const [prods, setprods] = useState(null);
  useEffect(() => {
    Axios.get('https://utamibakery-backend.vercel.app/products').then((response) => {
      setprods(response.data.data.products);
      console.log(response);
      console.log(response.data.data.products);
      console.log(prods);
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
      <FilterBox />
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
          }

            </Grid>
          )
      }
      <Fab
        sx={{
          position: 'fixed',
          bottom: 30,
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
