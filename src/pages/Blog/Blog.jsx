import {
  Box, CircularProgress, Grid, Skeleton, Typography, Backdrop, Fab,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Icon } from '@iconify/react';
import PostItem from '../../components/PostItem/PostItem';

const Blog = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const getBlogsData = async () => {
    await Axios.get('http://localhost:5000/blogs').then((response) => {
      console.log(response);
      setBlogs(response.data.data.blogs);
    });
  };

  useEffect(() => {
    getBlogsData();
  }, [count]);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        Blogs
      </Typography>
      {
        blogs === null ? <Skeleton variant="rectangular" />
          : blogs.map((blog, i) => (
            <PostItem
              key={i}
              title={blog.title}
              updatedAt={blog.updatedAt}
              summary={blog.summary}
              id={blog._id}
              cover={blog.cover}
              setIsLoading={setIsLoading}
              setCount={setCount}
              count={count}
            />
          ))
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
        href="/dashboard/blogs/add"
      >
        <Icon icon="solar:add-square-broken" color="#fff" height="30px" />
      </Fab>

    </Box>
  );
};

export default Blog;
