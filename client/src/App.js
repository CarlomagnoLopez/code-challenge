// import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import SignIn from './sign-in/SignIn';
import Details from './details/Details';
import { UserContext } from './UserContext';



function App() {
  const [stateUserContext, setStateUserContext] = React.useState("no data..");
  // console.log('Current Data: ')
  // console.log(stateUserContext)
  const currentLoggedIn = localStorage.getItem("storageUserData") ? true : false;
  const storageUserData = localStorage.getItem("storageUserData");
  // console.log("JSON.parse(storageUserData)")
  // console.log(JSON.parse(currentLoggedIn))
 
  
  
  React.useEffect(() => {
    if(currentLoggedIn) {
      // console.log(JSON.parse(storageUserData))
      setStateUserContext(JSON.parse(storageUserData));
    }
  }, []);
  // console.log(stateLogInContext)
  return (
    <UserContext.Provider value={{
      stateUserContext, setStateUserContext
    }}>
      {stateUserContext && !stateUserContext.loginUser && !currentLoggedIn &&

        <SignIn
          stateUserContext
        >

        </SignIn>
      }

      {stateUserContext && stateUserContext.loginUser && currentLoggedIn &&

        // <div>login
        //   <span>{stateUserContext._id} </span>

        // </div>
        <Details></Details>

      }


    </UserContext.Provider>
  );
}

export default App;
