import React from "react";
import {Box, Grid, Typography} from "@mui/material";
// import Legend from "./Legend";
import UnemploymentMap from "./maps/UnemploymentMap";

export default function Unemployment(props) {
  const { context } = props;
  const [unemployment, setUnemployment] = React.useState([]);

  const getTotalUnemploymentData = React.useCallback((from, to) => {
    if (from >= 3141 || to >= 3141) {
      return context.actions.unemploymentCountyRange(from, 3141).then(res => {
        setUnemployment(prevState => [...prevState, res]);
      });
    }

    context.actions.unemploymentCountyRange(from, to).then(res => {
      setUnemployment(prevState => [...prevState, res]);
    });
    return getTotalUnemploymentData(to, to + 250);
  }, [context.actions]);

  // function getTotalUnemploymentData(from, to) {
  //   if (from >= 3141 || to >= 3141) {
  //     return context.actions.unemploymentCountyRange(from, 3141).then(res => {
  //       setUnemployment(prevState => [...prevState, res]);
  //     });
  //   }
  //
  //   context.actions.unemploymentCountyRange(from, to).then(res => {
  //     setUnemployment(prevState => [...prevState, res]);
  //   });
  //   return getTotalUnemploymentData(to, to + 250);
  // }

  // function getTotalUnemploymentData(array, from, to) {
  //   if (from >= 3141 || to >= 3141) {
  //     return context.actions.unemploymentCountyRange(from, 3141).then(res => {
  //       array.push(res);
  //     });
  //     return array;
  //   }
  //
  //   context.actions.unemploymentCountyRange(from, to).then(res => {
  //     array.push(res);
  //   });
  //   return getTotalUnemploymentData(array, to, to + 250);
  // }

  React.useEffect(() => {
    if (unemployment.length === 0) {
      getTotalUnemploymentData(1, 251);
    }
  }, [unemployment.length, context.actions, getTotalUnemploymentData])

  React.useEffect(() => {
    if (unemployment.length === 13) {
      setUnemployment(prevState => [...prevState.flat()]);
    }
  }, [unemployment.length])

  // console.log(unemployment);

  return (
    <Box sx={{
      mx: 2,
      my: 5,
      padding: 2,
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Unemployment</Typography>
        </Grid>
        <Grid item xs={12}>
          {unemployment.length === 3153 && <UnemploymentMap currentData={unemployment}/>}
          {/*<Legend*/}
          {/*  title={'Total Taxes'}*/}
          {/*  data={legendData}*/}
          {/*  legendStyles={legendStyles}*/}
          {/*/>*/}
        </Grid>
      </Grid>
    </Box>
  )
}
