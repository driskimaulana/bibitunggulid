import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box, Button, Divider, Grid, Typography, Dialog, DialogActions,
  DialogTitle, DialogContent, DialogContentText, TextField, InputLabel,
  Backdrop, CircularProgress,
  OutlinedInput, InputAdornment,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment/moment';
import { Icon } from '@iconify/react';

const OrderCard = (props) => {
  const [isloading, setisloading] = useState(false);

  const [courierName, setcourierName] = useState('');
  const [whatsappContact, setwhatsappContact] = useState('');
  const [estimatedDeliveryTime, setestimatedDeliveryTime] = useState(0);
  const [deliveryTime, setdeliveryTime] = useState(null);
  const [estimatedReceiveTime, setestimatedReceiveTime] = useState(null);

  const { order, setreloadCount } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setisloading(true);
    console.log(deliveryTime);
    console.log(estimatedReceiveTime);
    console.log(courierName);
    const adminLoggedIn = JSON.parse(window.localStorage.getItem('adminLoggedIn'));

    const config = {
      headers: { Authorization: `Bearer ${adminLoggedIn.token}` },
    };
    await Axios.put(`https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/orders/onshipping/${order.id}`, {
      phone: whatsappContact,
      courierName,
      estimatedReceiveTime,
      delieveryTime: deliveryTime,
    }, config).then((response) => {
      setisloading(false);
      setreloadCount(Math.random());
      handleClose();
    }).catch((error) => {
      setisloading(false);
    });
  };

  const handleEstimatedTimeChange = (e) => {
    setestimatedDeliveryTime(e);
    if (!deliveryTime) {
      return;
    }
    // eslint-disable-next-line new-cap
    const time = new moment(deliveryTime, 'HH:mm');

    setestimatedReceiveTime(moment(time).add(e, 'minutes').format('HH:mm'));
  };

  const handleTimeChange = (e) => {
    setdeliveryTime(e);
    // eslint-disable-next-line new-cap
    const time = new moment(e, 'HH:mm');
    setestimatedReceiveTime(moment(time).add(estimatedDeliveryTime, 'minutes').format('HH:mm'));
    console.log(time);
    console.log(moment(time).add(estimatedDeliveryTime, 'minutes').format('HH:mm'));
  };

  let totalPrice = order.freight;
  order.products.map((e) => { totalPrice += e.unitPrice * e.quantity; });

  return (

    <Box display="flex" marginY={2} flexDirection="column">
      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="ic:baseline-play-arrow" />}>
          <Box display="flex" alignItems="center" columnGap={2}>
            <Typography variant="h6">
              Order #
              {order.id}
            </Typography>
            <Box border={1} borderRadius="50px">
              <Typography variant="p" fontSize="12px" paddingX={1} height={2}>
                {order.statusName}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Typography variant="p" fontSize={12}>
                Rp.
                {' '}
                {totalPrice}
              </Typography>
              <Typography variant="p" fontSize={12}>
                Kp. Cikancung 03/01, Margalaksana, Cilawu 44181
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                height="20px"
                sx={{ fontSize: '10px', padding: '5px', color: 'white' }}
                disabled={order.statusName !== 'Waiting For Shipment'}
                onClick={() => { setOpen(true); }}
              >
                Add Shipment Data
              </Button>

            </Box>
          </Box>
          <Divider />

          {
            order.products.map((p, i) => (
              <Box key={i} display="flex" columnGap={2} marginTop={2}>
                {
                  p.pictures && <img src={p.pictures[0]} width={100} alt="prods" />
                }
                <Box display="flex" flexDirection="column">
                  <Typography variant="p" fontWeight="500" fontSize={13}>
                    {p.productName}
                    {' '}
                    x
                    {p.quantity}
                  </Typography>
                  <Typography variant="p" fontWeight="500" fontSize={10}>
                    Rp.
                    {' '}
                    {p.unitPrice}
                  </Typography>

                </Box>
              </Box>
            ))
        }

        </AccordionDetails>
      </Accordion>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Masukan Data Pengiriman</DialogTitle>
        <DialogContent>

          <Grid container rowGap={2} alignItems="center" justifyContent="center">
            <Grid marginTop={1} item md={6} paddingRight={1}>
              <TextField
                fullWidth
                label="Nama Pengirim"
                value={courierName}
                onChange={(newValue) => setcourierName(newValue.target.value)}
              />
            </Grid>
            <Grid marginTop={1} item md={6} paddingLeft={1}>
              <TextField
                fullWidth
                label="Kontak WhatsApp"
                value={whatsappContact}
                onChange={(newValue) => setwhatsappContact(newValue.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ fontSize: '10px' }}
              >
                Estimasi waktu kirim

              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                type="number"
                endAdornment={<InputAdornment position="start">menit</InputAdornment>}
                value={estimatedDeliveryTime}
                onChange={(newValue) => handleEstimatedTimeChange(newValue.target.value)}
              />
              {/* <TextField fullWidth label="Estimasi Waktu Kirim" value={family} /> */}
            </Grid>
            <Grid item md={4} paddingLeft={1} paddingRight={1}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ fontSize: '10px' }}
              >
                Waktu Pengiriman

              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                type="time"
                onChange={(newValue) => handleTimeChange(newValue.target.value)}
              />
              {/* <TextField fullWidth label="Estimasi Waktu Kirim" value={family} /> */}
            </Grid>
            <Grid item md={4}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ fontSize: '10px' }}
              >
                Estimasi Waktu Sampai

              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                disabled
                type="time"
                value={estimatedReceiveTime}
                onChange={(newValue) => setdeliveryTime(newValue.target.value)}
              />
              {/* <TextField fullWidth label="Estimasi Waktu Kirim" value={family} /> */}
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kembali</Button>
          {
            isloading ? <CircularProgress />
              : (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    color: 'white',
                  }}
                >
                  Kirim Data

                </Button>
              )
          }
        </DialogActions>
      </Dialog>

    </Box>

  );
};

const OrderList = () => {
  const [orders, setorders] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [reloadCount, setreloadCount] = useState(0);

  useEffect(() => {
    getOrderData();
  }, [reloadCount]);

  const getOrderData = async () => {
    setisLoading(true);
    const adminLoggedIn = JSON.parse(window.localStorage.getItem('adminLoggedIn'));

    const config = {
      headers: { Authorization: `Bearer ${adminLoggedIn.token}` },
    };
    await Axios.get('https://dev-bibitunggulid-zldx7crkfq-et.a.run.app/orders/', config).then((response) => {
      console.log(response.data.data);
      setorders(response.data.data);
      setisLoading(false);
    });
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <Box>
      <Typography variant="h5">
        Pesanan
      </Typography>
      <Divider />
      {
        orders != null
        && orders.map((e, i) => (<OrderCard order={e} setreloadCount={setreloadCount} key={i} />))
      }

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </Box>
  );
};

export default OrderList;
