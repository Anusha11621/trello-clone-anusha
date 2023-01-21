import { AppBar, Toolbar, Typography,styled } from '@mui/material'
import { Box } from '@mui/system';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    
  render() {
    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-around",
        position:'sticky'
      });
    return (
      <AppBar>
        <StyledToolbar >
            
                <img src='https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif' style={{height:"20px",width:"100px"}}></img>
                
                <Link to='/' style={{textDecoration:'none',color:'white'}}><h2> Home</h2></Link>
        </StyledToolbar>
      </AppBar>
    )
  }
}
