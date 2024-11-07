import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { SitemarkIcon } from '../shared-theme/CustomIcons';
import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  // const [open, setOpen] = React.useState(false);
  // const [currentUser, setCurrentUser] = React.useState([]);
  const { stateUserContext, setStateUserContext } = React.useContext(UserContext);
  // const { stateLogInContext, setStateLogInContext } = React.useContext(LogInContext);
  // const [stateUserContext, setStateUserContext] = React.useState("");


  React.useEffect(() => {
    //   fetch('http://localhost:8000/users',{
    //     method:'put',
    //     headers:{'Content-Type': 'application/json'},
    //     body:JSON.stringify(
    //       {
    //         _id:"5410953eb0e0c0ae25608277",
    //         isActive:false
    //       }
    //     )
    //   }
    // )
    // // .then((res) => {
    // //   if(res.ok) {
    // //     console.log(res.json())
    // //   }
    // // })
    // .then((response) => {
    //   console.log(response.json())
    // })
    // fetchPut()
  }, []);

  // const fetchPut = async () => {
  //   const response = await fetch(
  //     `http://localhost:8000/users`, {
  //     method: 'put',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       {}
  //     )
  //   }
  //   );

  //   const data = await response.json();
  //   console.log(data);
  // };
  const fetchPost = async (user) => {
    // console.log("getting data by");
    // console.log(user);
    const response = await fetch(
      `http://localhost:8000/users/${user}`,
    );

    const data = await response.json();
    // console.log(data);
    data.loginUser = false
    // {
    //   "loginUser":false
    // }
    setStateUserContext(data);
    return data;
  };

  const verifyUserData = async (user, pass) => {
    // console.log("verifyng data by");
    const getDataUser = await fetchPost(user);

    // console.log("got data by");
    // console.log(getDataUser);
    const { error } = getDataUser.status;

    if (error) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a registered mail to log in.');
      // console.log("error data by");
      // console.log(getDataUser);
      return error
    }

    if (getDataUser.password !== pass) {

      setPasswordError(true);
      setPasswordErrorMessage('Password error try it again');
      setEmailError(true);
      setEmailErrorMessage('Email error try it again');
      // setStateLogInContext({ 'login': true })
      // console.log("error login by");


      return true;
    }
    // console.log("user data by");
    // console.log(getDataUser);
    if (!getDataUser.isActive) {
      setEmailError(true);
      setEmailErrorMessage('Your user is not currently active');
      return true;
    }

    getDataUser.loginUser = true

    localStorage.setItem("storageUserData", JSON.stringify(getDataUser));

    // console.log(getDataUser);

    return error
  }


  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleSubmit = (event) => {
  //   if (emailError || passwordError) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const data = new FormData(event.currentTarget);
  //   // console.log({
  //   //   email: data.get('email'),
  //   //   password: data.get('password'),
  //   // });
  // };

  const validateInputs = async () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValidInputFields = true;
    let isValidUserData = false;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValidInputFields = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValidInputFields = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    // console.log('before get data')

    if (isValidInputFields) {
      isValidUserData = await verifyUserData(email.value, password.value);
      // fetchPost(email.value,password.value);
      // console.log("isValidUserData");
      console.log(isValidUserData);
      // console.log(stateUserContext)
      isValidInputFields = false;
      // return isValidUserData;
    }



    // console.log('after get data')





    return isValidInputFields;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
        <Card variant="outlined">
          <SitemarkIcon width={150} className={"signInLogoItem"} />
          {/* <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', margin: '0 auto' ,fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Log In
          </Typography> */}
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Username</FormLabel>
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
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Log In
            </Button>
            {/* <ForgotPassword open={open} handleClose={handleClose} />
            
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link> */}
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
