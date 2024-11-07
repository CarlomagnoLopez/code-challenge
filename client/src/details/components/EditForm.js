import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { UserContext } from '../../UserContext';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';



const EditContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: '1px solid ',
  borderColor: (theme.vars || theme).palette.divider,
  background:
    'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
  boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
  [theme.breakpoints.up('xs')]: {
    height: 400,
  },
  [theme.breakpoints.up('sm')]: {
    height: 400,
  },
  ...theme.applyStyles('dark', {
    background:
      'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
    boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
  }),
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function EditForm(props) {
  const [disableInput, setDisableInput] = React.useState(true);
  const { stateUserContext, setStateUserContext } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [editButton, setEditButton] = React.useState(true);
  const [severiryAlert, setSeveriryAlert] = React.useState('warning');
  const [textAlert, setTextAlert] = React.useState('You can edit the details');


  const [firstName, setFirstName] = React.useState(stateUserContext.name.first);
  const [lastName, setLastName] = React.useState(stateUserContext.name.last);
  const [age, setAge] = React.useState(stateUserContext.age);
  const [eyeColor, setEyeColor] = React.useState(stateUserContext.eyeColor);
  const [email, setEmail] = React.useState(stateUserContext.email);
  const [phone, setPhone] = React.useState(stateUserContext.phone);
  const [address, setAddress] = React.useState(stateUserContext.address);

  const enableInputs = () => {

    setDisableInput(!disableInput)
    setOpen(true)
    setSeveriryAlert('warning')
    setTimeout(() => {
      setOpen(false)
    }, 2000);
    setEditButton(false)
    setTextAlert('You can edit the details')


  }
  const fetchPost = async (user) => {
    // console.log("getting data by");
    // console.log(user);
    const response = await fetch(
      `http://localhost:8000/users/${user}`,
    );

    const data = await response.json();
    console.log("data");
    console.log(data);
    // data.loginUser = false
    // {
    //   "loginUser":false
    // }
    setStateUserContext(data);
    return data;
  };

  const fetchPut = async (newDataUser) => {
    const response = await fetch(
      `http://localhost:8000/users`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          _id: newDataUser._id,
          body: newDataUser
        }
      )
    }
    );

    const data = await response.json();

    await fetchPost(stateUserContext.email)
    console.log(data);
  };

  const saveNewData = async () => {

    console.log(stateUserContext);
    const newDataUser = {
      ...stateUserContext
    }
    newDataUser.name.first = firstName !== '' ? firstName : stateUserContext.name.first;
    newDataUser.name.last = lastName !== '' ? lastName : stateUserContext.name.last;
    newDataUser.age = age !== '' ? age : stateUserContext.age;
    newDataUser.eyeColor = eyeColor !== '' ? eyeColor : stateUserContext.eyeColor;
    newDataUser.email = email !== '' ? email : stateUserContext.email;
    newDataUser.phone = phone !== '' ? phone : stateUserContext.phone;
    newDataUser.address = address !== '' ? address : stateUserContext.address;
    // console.log(newDataUser);
    await fetchPut(newDataUser)
    setDisableInput(!disableInput)
    setOpen(true)
    setSeveriryAlert('success')
    setTimeout(() => {
      setOpen(false)
    }, 2000);
    setEditButton(true)
    setTextAlert('Saved data')



  }

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <Alert severity={severiryAlert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {textAlert}
          </Alert>
        </Collapse>
      </Box>
      <Avatar
        sx={{ width: 100, height: 100, margin: '0 auto' }}
        alt="userAvatar" src={stateUserContext.picture} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <ButtonGroup
          sx={{ display: 'flex' }}
          variant="outlined" aria-label="Basic button group" fullWidth>
          <Button onClick={props.toggleDrawer(true)}>Balance</Button>
          {editButton &&
            <Button onClick={
              enableInputs
            }>
              Edit
            </Button>
          }

          {!editButton &&
            <Button
              onClick={
                saveNewData
              }>Save</Button>
          }

        </ButtonGroup>

        {/* <ButtonGroup
          sx={{ display: 'flex' }}
          variant="outlined" aria-label="Basic button group" fullWidth>
          <Button onClick={props.toggleDrawer(true)}>Balance</Button>
          <Button>Save</Button>
        </ButtonGroup> */}
      </Box>

      {/* {formType === 'creditCard' && ( */}
      <Box className='nameform'
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <EditContainer>
          {/* <Box sx={{ display: 'flex', margin: '0 auto', justifyContent: 'space-between' }}>
              <Typography variant="h5">User profile account</Typography>
            </Box> */}
          <Box sx={{ display: 'flex', margin: '0 auto', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">Employee of: {stateUserContext.company}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              {/* <FormLabel htmlFor="email">Username</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              /> */}
              <FormLabel htmlFor="user-name">
                User Name
              </FormLabel>
              <OutlinedInput
                disabled={disableInput}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                //  error={emailError}
                //  helperText={emailErrorMessage}
                id="user-name"
                //  type="email"
                name="user-name"
                placeholder="First Name"
                autoComplete="user-name"
                autoFocus
                // required
                fullWidth
                variant="outlined"
              //  color={emailError ? 'error' : 'primary'}
              />
            </FormGrid>
            <FormGrid sx={{ maxWidth: '50%' }}>
              <FormLabel htmlFor="user-last">
                Last Name
              </FormLabel>
              <OutlinedInput
                disabled={disableInput}
                // value={stateUserContext.name.last}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                id="user-last"
                autoComplete="user-last"
                placeholder="123"
                // required
                size="small"
              // value={cvv}
              // onChange={handleCvvChange}
              />
            </FormGrid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="user-age" >
                Age
              </FormLabel>
              <OutlinedInput
                disabled={disableInput}
                // value={stateUserContext.age}
                value={age}
                onChange={e => setAge(e.target.value)}
                //  error={emailError}
                //  helperText={emailErrorMessage}
                id="user-age"
                //  type="email"
                name="user-age"
                placeholder="Age"
                autoComplete="user-age"
                autoFocus
                // required
                fullWidth
                variant="outlined"
              //  color={emailError ? 'error' : 'primary'}
              />
            </FormGrid>
            <FormGrid sx={{ maxWidth: '50%' }}>
              <FormLabel htmlFor="user-eyeColor" >
                Eye Color
              </FormLabel>
              <OutlinedInput
                disabled={disableInput}
                // value={stateUserContext.eyeColor}

                value={eyeColor}
                onChange={e => setEyeColor(e.target.value)}
                id="user-eyeColor"
                autoComplete="user-eyeColor"
                placeholder="123"
                // required
                size="small"
              // value={cvv}
              // onChange={handleCvvChange}
              />
            </FormGrid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="user-email" >
                Email
              </FormLabel>
              <OutlinedInput
                disabled={disableInput}
                // value={stateUserContext.email}


                value={email}
                onChange={e => setEmail(e.target.value)}
                //  error={emailError}
                //  helperText={emailErrorMessage}
                id="user-email"
                //  type="email"
                name="user-email"
                placeholder="Age"
                autoComplete="user-email"
                autoFocus
                // required
                fullWidth
                variant="outlined"
              //  color={emailError ? 'error' : 'primary'}
              />
            </FormGrid>
            <FormGrid sx={{ maxWidth: '50%' }}>
              <FormLabel htmlFor="user-phone" >
                Phone
              </FormLabel>
              <OutlinedInput
                disabled={disableInput}
                // value={stateUserContext.phone}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                id="user-eyeColor"
                autoComplete="user-eyeColor"
                placeholder="Eye Color"
                // required
                size="small"
              // value={cvv}
              // onChange={handleCvvChange}
              />
            </FormGrid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="user-address" >
                Address
              </FormLabel>
              <OutlinedInput
                disabled={disableInput}
                // value={stateUserContext.address}
                value={address}
                onChange={e => setAddress(e.target.value)}
                //  error={emailError}
                //  helperText={emailErrorMessage}
                id="user-address"
                //  type="email"
                name="user-address"
                placeholder="Address"
                autoComplete="user-address"
                autoFocus
                // required
                fullWidth
                variant="outlined"
              //  color={emailError ? 'error' : 'primary'}
              />
            </FormGrid>
          </Box>
        </EditContainer>
        {/* <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label="Remember credit card details for next time"
          /> */}
      </Box>
      {/* )} */}
      {/* {formType === 'bankTransfer' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Your order will be processed once we receive the funds.
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Bank account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please transfer the payment to the bank account details shown below.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Bank:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              Mastercredit
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Account number:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              123456789
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Routing number:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              987654321
            </Typography>
          </Box>
        </Box>
      )} */}
    </Stack>
  );
}
