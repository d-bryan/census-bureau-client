import React from 'react';
import './App.css';
import {Link, useRoutes} from 'react-router-dom'
import withContext from './Context';
import {
  Box, AppBar, Toolbar, Container, Typography
} from "@mui/material";


function NavBar() {

  return (
    <AppBar position="static">
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
            <Link
              to="/unemployment"
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <Typography variant="h6" sx={{paddingRight: 2}}>Unemployment</Typography>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function Home() {
  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        <Box p={2}>
          <Typography variant="h4">
            Select a page to get started
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

function Apportionment(props) {
  const { context } = props;
  const [apportionment, setApportionment] = React.useState([]);

  React.useEffect(() => {
    return () => {
      if (apportionment.length === 0){
        context.actions.totalApportionment().then(res => {
          setApportionment(res);
        })
      }
    }
  }, [apportionment.length, context.actions]);
  console.log(apportionment);

  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        <Box p={2}>
          <Typography variant="h4">
            Apportionment
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

function NotFound() {
  return (
    <header className="main-header">
      <h1>404</h1>
      <p>Page not found</p>
    </header>
  )
}

function App() {
  const HomeWithContext = withContext(Home);
  const ApportionmentWithContext = withContext(Apportionment);
  let element = useRoutes([
    {
      path: '/',
      element: <HomeWithContext/>,
    },
    {
      path: '/apportionment',
      element: <ApportionmentWithContext/>,
    },
    {
      path: '/itemized-taxes',
      element: <ItemizedTaxes/>,
    },
    {
      path: '/unemployment',
      element: <Unemployment/>,
    },
    {
      path: '*',
      element: <NotFound/>,
    }
  ]);
  return (
    <div className="main-container">
      {element}
    </div>
  );
}

export default App;
