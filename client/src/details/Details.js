import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
// import AddressForm from './components/AddressForm';
import Info from './components/Info';
import InfoMobile from './components/InfoMobile';
import EditForm from './components/EditForm';
// import Review from './components/Review';
import Button from '@mui/material/Button';

import AppTheme from '../shared-theme/AppTheme';
import { UserContext } from '../UserContext';


const balanceItems = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: 'Free',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Free plan',
    price: 'Free',
  },
  {
    name: 'Hardware',
    desc: 'Included in the Professional plan',
    price: 'Free',
  }
];
export default function Details(props) {
  // const [activeStep, setActiveStep] = React.useState(0);
  const { stateUserContext, setStateUserContext } = React.useContext(UserContext);

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };
  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  React.useEffect(() => {
    // localStorage.setItem("myCat", "Tom");
    // console.log("stateUserContext")
    // console.log(stateUserContext)

    // const storageUserData = localStorage.getItem("storageUserData");
    // console.log(JSON.parse(storageUserData))

  }, []);


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Grid
        container
        sx={{
          height:
          {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Info
              balance={stateUserContext.balance}
              balanceItems={balanceItems}
            />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
            </Box>
          </Box>
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Balance
                </Typography>
                <Typography variant="body1">
                  {stateUserContext.balance}
                </Typography>
              </div>
              <InfoMobile
                toggleDrawer={toggleDrawer}
                openToggleDrawer={open}
                balance={stateUserContext.balance}
                balanceItems={balanceItems}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >

            <EditForm toggleDrawer={toggleDrawer} />
          </Box>
          <Button variant='outlined'
            onClick={() => {
              window.location.reload();
              localStorage.clear();
            }
            }
          >Log Out</Button>
        </Grid>
      </Grid>
    </AppTheme>
  );
}
