import {
  Box, Grid, Typography, FormControl, InputLabel,
  OutlinedInput, InputAdornment, Button, TextField,
  Backdrop, CircularProgress, Alert,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ],
};
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image',
];

const BlogEdit = () => {
  const [isLoading, setisLoading] = useState(false);
  const [title, settitle] = useState('');
  const [writer, setWriter] = useState('');
  const [img, setImg] = useState([]);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState([]);
  const [isError, setisError] = useState(false);

  const addImage = (newImg) => {
    setImg((prevImg) => [
      newImg,
    ]);
  };

  const addPreview = (newPreview) => {
    setPreview((prevPreview) => [
      newPreview,
    ]);
  };

  const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  const getData = async () => {
    await Axios.get(`https://utamibakery-backend.vercel.app/blogs/${id}`).then((response) => {
      setisLoading(false);
      console.log(response);
      settitle(response.data.data.blog.title);
      setWriter(response.data.data.blog.writer);
      addPreview(response.data.data.blog.cover);
      setContent(response.data.data.blog.content);
      setSummary(response.data.data.blog.summary);
      console.log(preview);
    });
  };

  useEffect(() => {
    setisLoading(true);
    getData();
  }, []);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!img) {
      setPreview(undefined);
      return;
    }
    if (img[0] === undefined) return;
    // if (img[0].indexOf('png') > 1 || img[0].indexOf('jpg') > 1) {
    //   return;
    // }
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
      width={600}
      height="auto"
    />
  ));
  const submitImage = async () => {
    setisLoading(true);

    if (title.length
        === 0 || summary.length === 0
        || writer.length === 0 || content.length === 0) {
      setisError(true);
      setisLoading(false);
      return;
    }
    if (img.length === 0) {
      handleSubmitBlog(preview);
      return;
    }

    const imgData = [];

    const data = new FormData();
    data.append('file', img[0]);
    data.append('upload_preset', 'utamibakerypresets');
    data.append('cloud_name', 'dscbb3cu2');

    await Axios.post('https://api.cloudinary.com/v1_1/dscbb3cu2/image/upload', data).then((response) => {
      imgData.push(response.data.secure_url);
    });

    handleSubmitBlog(imgData);
  };

  const handleSubmitBlog = async (img) => {
    const newBlog = {
      title,
      writer,
      summary,
      content,
      cover: img[0],
    };
    console.log(newBlog);
    await Axios.put(`https://utamibakery-backend.vercel.app/blogs/${id}`, newBlog).then((response) => {
      window.location.href = `/dashboard/blogs/${id}`;
    });
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '20px',
    }}
    >
      <Typography variant="h5" fontWeight="bold">
        Edit Blog
      </Typography>
      <Grid container gap={2} alignItems="center" justifyContent="start">
        <Grid item md={10}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Judul</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Judul"
              value={title}
              onChange={(newValue) => settitle(newValue.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={5}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Writer</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Writer"
              value={writer}
              onChange={(newValue) => setWriter(newValue.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={5}>
          <Button
            variant="outlined"
            component="label"
            sx={{
              height: '55px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <Icon icon="material-symbols:add-box" />
            Upload Cover Artikel
            <input
              type="file"
              hidden
              onChange={(e) => addImage(e.target.files[0])}
            />

          </Button>
        </Grid>
        <Grid item md={10}>
          {

                img
                  && prevImage

            }
        </Grid>

        <Grid item md={10}>
          <TextField
            fullWidth
            value={summary}
            onChange={(newValue) => setSummary(newValue.target.value)}
            label="Ringkasan"
            multiline
            rows={5}
          />
        </Grid>
        <Grid item md={10}>
          <Typography variant="p" fontWeight="bold">
            Content
          </Typography>
        </Grid>
        <Grid item md={10}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContent}
          />
        </Grid>
        {
          isError && (
          <Grid item md={10}>
            <Alert severity="error">
              Lengkapi semua data
            </Alert>
          </Grid>
          )
        }
        <Grid item md={10}>
          <Button variant="contained" onClick={submitImage}>
            Edit Blog
          </Button>
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

export default BlogEdit;
