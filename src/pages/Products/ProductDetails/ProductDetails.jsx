import {
  Box, CircularProgress, Typography, ImageList, ImageListItem, Grid, Divider, Fab,
  Backdrop,
} from '@mui/material';
import { Icon } from '@iconify/react';

import { useState, useEffect } from 'react';
import Axios from 'axios';
import FsLightbox from 'fslightbox-react';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    Axios.get(`https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/product/${id}`).then((response) => {
      setProduct(response.data.data);
    });
  }, []);

  const handleDelete = async () => {
    setisLoading(true);
    await Axios.delete(`https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/product/${id}`).then((response) => {
      console.log(response);
      window.location.href = '/dashboard/products';
    });
  };

  return (

    product == null ? <CircularProgress />
      : (
        <Grid
          container
          sx={{
            marginLeft: '50px',
          }}
        >
          <Grid item md={12} />
          <Grid
            item
            md={4}
          >
            <img src={product.pictures[0]} width={400} alt={product.pictures[0]} />
            <ImageList sx={{ width: 500, height: 450 }} variant="quilted" cols={4} rowHeight={121}>
              {product.pictures.map((item) => (
                <ImageListItem key={item.img} onClick={() => setToggler(!toggler)}>
                  <img
                    src={`${item}`}
                    srcSet={`${item}`}
                    alt={item}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          <Grid
            item
            md={6}
            sx={{
              marginLeft: '50px',
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
            }}
            >
              <Typography variant="h5" fontWeight="bold">{product.productName}</Typography>

              <Typography variant="h6" fontWeight="600" color="gray">
                {'Rp '}
                {product.unitPrice}
              </Typography>

              <Typography variant="p">{product.productDescription}</Typography>

              <Divider />

              <Grid container>

                <Grid
                  item
                  md={5}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                  }}
                >
                  <Icon icon="game-icons:weight" />
                  <Typography variant="p">
                    Berat:
                    {' '}
                    {product.unitWeight}
                    {' Kg'}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />

            </Box>
          </Grid>
          <Fab
            sx={{
              position: 'fixed',
              top: 30,
              right: 70,
              backgroundColor: '#C678FB',
            }}
            color="secondary"
            href={`/dashboard/products/edit/${id}`}
          >
            <Icon icon="material-symbols:edit" color="#fff" height="30px" />
          </Fab>
          <Fab
            sx={{
              position: 'fixed',
              top: 30,
              right: 140,
              backgroundColor: '#9A2A3C',
            }}
            color="secondary"
            onClick={handleDelete}
          >
            <Icon icon="material-symbols:delete" color="#fff" height="30px" />
          </Fab>

          <FsLightbox
            toggler={toggler}
            sources={product.pictures}
          />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
      )

  );
};

export default ProductDetails;
