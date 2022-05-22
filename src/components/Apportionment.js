import React from "react";
import {Box, Grid, Typography} from "@mui/material";
import ApportionmentMap from "./maps/ApportionmentMap";
import {editStateName} from "../middleware";
import Legend from "./Legend";

export default function Apportionment(props) {
  const { context } = props;
  const [apportionment, setApportionment] = React.useState([]);

  function mapStateName(currentData) {
    currentData = currentData.map((state) => {
      return {
        ...state,
        state: editStateName(state.state),
      }
    });
    return currentData;
  }

  React.useEffect(() => {
    function fetchData() {
      context.actions.apportionmentYear('2020').then(res => {
        res = mapStateName(res);
        setApportionment(res);
      });
    }
    if (apportionment.length === 0) {
      fetchData()
    }
  }, [apportionment.length, context.actions])

  const legendData = [
    {
      name: '50 or more',
      color: '#62F59F'
    },
    {
      name: '30 to 50',
      color: '#9411F2'
    },
    {
      name: '20 to 30',
      color: '#A61C70'
    },
    {
      name: '10 to 20',
      color: '#F2119A'
    },
    {
      name: '5 to 10',
      color: '#F2D729'
    },
    {
      name: '1 to 5',
      color: '#40698b'
    }
  ];

  const legendStyles = {
    right: '150px',
    bottom: '0px',
    width: '16%'
  }

  return (
    <Box sx={{
      mx: 2,
      my: 5,
      padding: 2,
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Apportionment</Typography>
        </Grid>
        <Grid item xs={12}>
          {apportionment.length > 0 && <ApportionmentMap currentData={apportionment}/>}
          <Legend
            title={'Number of Reps'}
            data={legendData}
            legendStyles={legendStyles}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

