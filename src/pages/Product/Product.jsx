import * as React from 'react';

import {
  Typography, Box, Grid, Fab,
} from '@mui/material';

import { Icon } from '@iconify/react';
import FilterBox from '../../components/FilterBox/FilterBox';
import ProductCard from '../../components/ProductCard/ProductCard';

import products from '../../utils/products_data';

const Product = () => (
  <Box sx={{
    paddingInline: '50px',
  }}
  >
    <Typography variant="h5" fontWeight="bold" color="primary">Produk</Typography>
    <FilterBox />
    <Grid
      container
      sx={{
        marginTop: '30px',
      }}
      spacing={2}
    >

      {
          products.map((product, index) => (
            <Grid key={index} item md={3}>
              <ProductCard name={product.name} price={product.price} imgUrl={product.imgUrl} />
            </Grid>
          ))
        }

    </Grid>
    <Fab
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 70,
        backgroundColor: '#C678FB',

      }}
      color="secondary"
    >
      <Icon icon="solar:add-square-broken" color="#fff" height="30px" />
    </Fab>
  </Box>
);

export default Product;
