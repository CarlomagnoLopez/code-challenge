import * as React from 'react';
// import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function Info(props) {
  // console.log("props")
  // console.log(props.balanceItems)
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Balance
      </Typography>
      <Typography variant="h4" gutterBottom>
        {props.balance}
      </Typography>
      <List disablePadding>
        {props && props.balanceItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

// Info.propTypes = {
//   balance: PropTypes.string.isRequired,
// };

export default Info;
