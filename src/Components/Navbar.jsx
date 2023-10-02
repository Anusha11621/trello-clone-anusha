import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    const StyledToolbar = styled(Toolbar)({
      display: "flex",
      position: "sticky",
      gap : "10px",
      
    });
    return (
      <AppBar>
        <StyledToolbar>
        <AppsIcon />
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <img
              src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif"
              style={{ height: "20px", width: "100px" }}
            ></img>
          </Link>
        </StyledToolbar>
      </AppBar>
    );
  }
}
