import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import TabsList, { buttonClasses, tabClasses } from '@mui/base';

import {
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import { Button } from '@mui/material';
import Dashboard from './Dashboard/Dashboard';
import Product from './Product/Product';
import Account from './Account/Account';
import Blog from './Blog/Blog';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const testClick = (toIndex) => {
    setValue(toIndex);
    console.log(value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1, bgcolor: 'background.paper', display: 'flex', boxShadow: '0px 4px 30px lightGrey', borderRadius: '10px', padding: '10px',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', borderRadius: '10px' }}
      >
        <StyledTab label="Dashboard" {...a11yProps(0)} component={Link} to="/dashboard/app" />
        <StyledTab label="Products" {...a11yProps(1)} component={Link} to="/dashboard/products" />
        <StyledTab label="Account" {...a11yProps(2)} />
        <StyledTab label="Blog" {...a11yProps(3)} />

      </Tabs>
    </Box>
  );
}

const StyledTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  color: black;

  &:hover {
    background-color: white;
  }

  &.${tabClasses.selected} {
    background-color: #662577;
    color: #fff};
  }

`;
