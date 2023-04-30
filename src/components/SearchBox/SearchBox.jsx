import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';

const SearchBox = () => (
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
);

export default SearchBox;
