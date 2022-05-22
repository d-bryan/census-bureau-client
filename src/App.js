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

function App() {
  const HomeWithContext = withContext(Home);
  const ApportionmentWithContext = withContext(Apportionment);
  const ItemizedTaxesWithContext = withContext(ItemizedTaxes);

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
