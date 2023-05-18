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
      height,
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
          <img src={Logo} alt="logo" width="auto" height="50px" />
          <h3>Utami Bakery</h3>
          <IconButton onClick={handleLogout}>
            <Icon icon="solar:logout-3-bold" color="red" />
          </IconButton>
        </Box>
        <Menu style={{
          backgroundColor: 'white',
        }}
        >
          <MenuItem component={<Link to="/dashboard/app" />} icon={<SpaceDashboardIcon style={{ color: '#5A236D' }} />}> Dashboard</MenuItem>
          <MenuItem component={<Link to="/dashboard/products" />} icon={<InventoryIcon style={{ color: '#5A236D' }} />}> Produk</MenuItem>
          <MenuItem component={<Link to="/dashboard/users" />} icon={<SupervisedUserCircleIcon style={{ color: '#5A236D' }} />}> Pengguna</MenuItem>
          <MenuItem component={<Link to="/dashboard/blogs" />} icon={<NewspaperIcon style={{ color: '#5A236D' }} />}> Blog</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MySideBar;
