import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search } from "@mui/icons-material";
import { Avatar, Button, Stack,InputAdornment,
  TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons, desktopSearch }) => {
 // console.log(hasHiddenAuthButtons)
  const history = useHistory();
  const handleBackToExplore = ()=>{
    history.push("/", { from: window.location.pathname })
  }
  const handleLoginButtonClicked = () =>{
    history.push("/login", { from: "/" })
    //window.location.pathname = '/login'
  }
  const handleRegisterButtonClicked = () =>{
    history.push("/register", { from: "/" })
   // window.location.pathname = '/register'
  }

 const handleClick = ()=>{
   localStorage.clear()
   window.location.reload()
  }
 let prodctsPageButtons;
if(hasHiddenAuthButtons===true){
  prodctsPageButtons = <Button 
    className="explore-button"
    startIcon={<ArrowBackIcon />}
    variant="text"
    onClick={handleBackToExplore}
  >
   BACK TO EXPLORE
  </Button>

}else{
  if(window.location.pathname === '/' && !window.localStorage.getItem("token")){
    prodctsPageButtons =  
    
    <>
    <TextField
        className="search-desktop"
        size="small"
        
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
       
       onChange = {desktopSearch}
      /> 
    
    <Stack direction="row" spacing={2}>
             
      <Button onClick= {handleLoginButtonClicked} className="login-button">Login</Button>
     <Button onClick= {handleRegisterButtonClicked} className="register-button">Register</Button>
     
    </Stack>
    
    </>
    
    
    }else if(window.location.pathname === '/' && localStorage.getItem("username")){
     prodctsPageButtons = 
     <>
       <TextField
        className="search-desktop"
        size="small"
        
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
       
       onChange = {desktopSearch}
      /> 
     <Stack direction="row" spacing={2}>
            
            <Avatar alt={localStorage.getItem("username")} src="./avatar.png" />
            <p className="username-text">{window.localStorage.username}</p>
      <Button  onClick = {handleClick}>Logout</Button>
      
     </Stack>
     </>
     
     
     
    }

}

  
 
 
    return (


      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
     
        {children}
          
     {prodctsPageButtons}
       
      </Box>
    );
};

export default Header;
