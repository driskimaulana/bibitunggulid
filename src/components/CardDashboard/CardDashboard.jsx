import {
  Avatar,
  Card, CardContent, Stack, Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';

const CardDashboard = (props) => {
  let color = '';
  if (props.name === 'Produk') {
    color = '#5A236D';
  } else if (props.name === 'Blog') {
    color = 'green';
  } else {
    color = '#FFAC1C';
  }
  return (

    <Card sx={{
      width: '350px',
    }}
    >
      <CardContent>
        <Stack alignItems="flex-start" justifyContent="space-between" direction="row">
          <Stack>
            <Typography variant="p">{props.name}</Typography>
            <Typography variant="h2" color={color} fontWeight="bold">{props.value}</Typography>
          </Stack>
          <Avatar sx={{
            backgroundColor: `${color}`,
            padding: '5px',
          }}
          >
            { props.name === 'Produk' && <Icon icon="icon-park-solid:bread" /> }
            { props.name === 'Pengguna' && <Icon icon="mdi:account-arrow-up" /> }
            { props.name === 'Blog' && <Icon icon="dashicons:welcome-write-blog" /> }
          </Avatar>
        </Stack>

      </CardContent>
    </Card>
  );
};

export default CardDashboard;
