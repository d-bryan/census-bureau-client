import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
          >
            <Link
              to="/"
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <Typography variant="h6" sx={{paddingRight: 2}}>Home</Typography>
            </Link>
            <Link
              to="/apportionment"
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <Typography variant="h6" sx={{paddingRight: 2}}>Apportionment</Typography>
            </Link>
            <Link
              to="/itemized-taxes"
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <Typography variant="h6" sx={{paddingRight: 2}}>Itemized Taxes</Typography>
            </Link>
            {/*<Link*/}
            {/*  to="/unemployment"*/}
            {/*  style={{textDecoration: 'none', color: 'inherit'}}*/}
            {/*>*/}
            {/*  <Typography variant="h6" sx={{paddingRight: 2}}>Unemployment</Typography>*/}
            {/*</Link>*/}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
