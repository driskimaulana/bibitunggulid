import {
  Box,
  Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import format from 'date-fns/format';

import { Icon } from '@iconify/react';
import Axios from 'axios';

const PostItem = (props) => {
  const {
    title, updatedAt, summary, cover, id,
    setIsLoading, setCount, count,
  } = props;

  const [post, setPost] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    await Axios.delete(`http://localhost:5000/blogs/${id}`).then((response) => {
      setCount(count + 1);
      setIsLoading(false);
    });
  };

  return (
    <Card sx={{
      display: 'flex',
      marginBlock: '20px',
      border: 'none',
      boxShadow: '1px 1px rgba(0, 0, 0, 0.1)',
      alignItems: 'end',
      justifyContent: 'space-between',

    }}
    >
      <CardActionArea href={`${window.location.href}/${id}`}>

        <Box sx={{
          display: 'flex',
        }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '450px',
              height: '200px',
            }}
            image={cover}
          />
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '5px',
          }}
          >
            <Typography variant="h5" fontWeight="bold">{title}</Typography>
            <Typography variant="p" fontSize="10px">{format(new Date(updatedAt), 'MMM d, yyyy')}</Typography>
            <Typography variant="p">
              {summary}
            </Typography>
          </CardContent>

        </Box>
      </CardActionArea>
      <CardActions>
        <IconButton onClick={handleDelete}>
          <Icon icon="material-symbols:delete" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostItem;
