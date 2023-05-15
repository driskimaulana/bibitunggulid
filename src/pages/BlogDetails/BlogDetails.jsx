import {
  Typography, Box, Backdrop, CircularProgress, Divider, Fab,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import Axios from 'axios';
import { format } from 'date-fns';

const BlogDetails = () => {
  const [isLoading, setisLoading] = useState(false);
  const [blog, setblog] = useState(null);

  const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  const getData = async () => {
    await Axios.get(`https://utamibakery-backend.vercel.app/blogs/${id}`).then((response) => {
      setisLoading(false);
      setblog(response.data.data.blog);
    });
  };

  useEffect(() => {
    setisLoading(true);
    getData();
  }, []);

  return (
    <Box>
      {
        blog !== null && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          rowGap: '20px',
        }}
        >
          <Typography variant="h4">
            {blog.title}
          </Typography>
          <Box sx={{
            display: 'flex',
            columnGap: '20px',
          }}
          >
            <Typography variant="p" fontSize="10px">
              {blog.writer}
            </Typography>
            <Divider orientation="vertical" color="black" />
            <Typography variant="p" fontSize="10px">
              {format(new Date(blog.updatedAt), 'MMM d, yyyy')}
            </Typography>
          </Box>
          <img
            src={blog.cover}
            alt="cover"
            height={400}
            width="auto"
            style={{
              objectFit: 'cover',
            }}
          />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Box>
        )
}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Fab
        sx={{
          position: 'fixed',
          top: 30,
          right: 70,
          backgroundColor: '#C678FB',
        }}
        color="secondary"
        href={`/dashboard/blogs/edit/${id}`}
      >
        <Icon icon="material-symbols:edit" color="#fff" height="30px" />
      </Fab>
    </Box>
  );
};

export default BlogDetails;
