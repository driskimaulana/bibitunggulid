import * as React from 'react';

import {
  Typography, Card, CardContent, CardMedia,
} from '@mui/material';

const ProductCard = (props) => {
  const { name, price, imgUrl } = props;

  return (
    <Card sx={{
      maxWidth: '300px',
      backgroundColor: '#fbfbfb',
    }}
    >
      <CardMedia image={imgUrl} sx={{ height: '250px' }} />
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Typography variant="p" fontWeight="600" fontSize="14pt">{name}</Typography>
        <Typography variant="p" fontWeight="800" fontSize="18pt" color="#5A236D" sx={{ }}>{price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
