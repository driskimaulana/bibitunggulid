import {
  FormControlLabel, Box, Checkbox,
} from '@mui/material';
import { Icon } from '@iconify/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import SearchBox from '../SearchBox/SearchBox';

const FilterBox = () => {
  const [price, setPrice] = React.useState('');

  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  return (
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
          <FormControlLabel control={<Checkbox defaultChecked />} label="Terbaru" />
        </Box>
      </Box>
      <SearchBox />
    </Box>
  );
};

export default FilterBox;
