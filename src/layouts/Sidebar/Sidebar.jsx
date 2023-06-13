import { Box, IconButton } from '@mui/material';
import {
  Sidebar, Menu, MenuItem, useProSidebar,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Icon } from '@iconify/react';

import Logo from '../../assets/images/logo.png';

const MySideBar = () => {
  const { collapseSidebar } = useProSidebar();

  const height = window.innerHeight;

  const handleLogout = () => {
    window.localStorage.removeItem('adminLoggedIn');
    window.location.href = '/';
  };

  return (
    <div style={{
      display: 'flex',
      height: '900px',
      position: 'fixed',
    }}
    >
      <Sidebar style={{
        // backgroundColor: '#5A236D',
        height: '100%',
        display: 'flex',
      }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '10px',
          marginBlock: '10px',
          paddingBlock: '30px',
          borderRadius: '10px',
          marginInline: '10px',
          color: '#5A236D',
          backgroundColor: 'white',
        }}
        >
          <img src={Logo} alt="logo" width="auto" height="100px" />
          <IconButton onClick={handleLogout}>
            <Icon icon="solar:logout-3-bold" color="red" />
          </IconButton>
        </Box>
        <Menu style={{
          backgroundColor: 'white',
        }}
        >
          <MenuItem component={<Link to="/dashboard/app" />} icon={<SpaceDashboardIcon style={{ color: '#0FB203' }} />}> Dashboard</MenuItem>
          <MenuItem component={<Link to="/dashboard/products" />} icon={<InventoryIcon style={{ color: '#0FB203' }} />}> Produk</MenuItem>
          <MenuItem component={<Link to="/dashboard/users" />} icon={<SupervisedUserCircleIcon style={{ color: '#0FB203' }} />}> Pengguna</MenuItem>
          <MenuItem component={<Link to="/dashboard/category" />} icon={<NewspaperIcon style={{ color: '#0FB203' }} />}> Kategory</MenuItem>
          <MenuItem component={<Link to="/dashboard/suppliers" />} icon={<Icon icon="ri:store-3-fill" height="27px" color="#0FB203" />}> Suppliers</MenuItem>
          <MenuItem component={<Link to="/dashboard/orders" />} icon={<Icon icon="icons8:buy" height="27px" color="#0FB203" />}> Orders</MenuItem>
          <MenuItem component={<Link to="/dashboard/plants" />} icon={<Icon icon="mdi:flower" height="27px" color="#0FB203" />}> Plants</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MySideBar;
