import React from 'react';
import './App.css';
import {useRoutes} from 'react-router-dom'
import withContext from './Context';
import {Container} from "@mui/material";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Apportionment from "./components/Apportionment";
import ItemizedTaxes from "./components/ItemizedTaxes";
import Unemployment from "./components/Unemployment";

function App() {
  const HomeWithContext = withContext(Home);
  const ApportionmentWithContext = withContext(Apportionment);
  const ItemizedTaxesWithContext = withContext(ItemizedTaxes);
  const UnemploymentWithContext = withContext(Unemployment);

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
      element: <ItemizedTaxesWithContext/>,
    },
    {
      path: '/unemployment',
      element: <UnemploymentWithContext/>,
    },
    {
      path: '*',
      element: <NotFound/>,
    }
  ]);
  return (
    <Container maxWidth="xl" className="main-container">
      <NavBar />
      {element}
    </Container>
  );
}

export default App;
