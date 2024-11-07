import * as React from 'react';
// import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import Info from './Info';

function InfoMobile(props) {
  // const [open, setOpen] = React.useState(false);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };

  const DrawerList = (
    <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
      <IconButton
        onClick={props.toggleDrawer(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Info balance={props.balance}
        balanceItems={props.balanceItems}
      />
    </Box>
  );

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ExpandMoreRoundedIcon />}
        onClick={props.toggleDrawer(true)}
      >
        Balance details
      </Button>
      <Drawer
        open={props.openToggleDrawer}
        anchor="top"
        onClose={props.toggleDrawer(false)}
        PaperProps={{
          sx: {
            top: 'var(--template-frame-height, 0px)',
            backgroundImage: 'none',
            backgroundColor: 'background.paper',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default InfoMobile;