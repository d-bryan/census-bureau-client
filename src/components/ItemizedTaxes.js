import React from "react";
import {Box, Grid, Typography} from "@mui/material";
import ItemizedTaxesMap from './maps/ItemizedTaxesMap';
import {editStateName} from "../middleware";
import Legend from "./Legend";

export default function ItemizedTaxes(props) {
  const { context } = props;
  const [itemizedTaxes, setItemizedTaxes] = React.useState([]);

  function mapStateName(currentData) {
    currentData = currentData.map((state) => {
      if (state.st === 'dc') {
        return {
          ...state,
          st: 'District of Columbia'
        }
      }
      return {
        ...state,
        st: editStateName(state.st),
      }
    });
    return currentData;
  }

  React.useEffect(() => {
    if (itemizedTaxes.length === 0) {
      context.actions.itemizedTaxesYear('2020').then(res => {
        res = mapStateName(res);
        res.shift();
        setItemizedTaxes(res);
      });
    }
  }, [itemizedTaxes.length, context.actions])

  console.log(itemizedTaxes);

  const legendData = [
    {
      name: '$171,964,222 or more',
      color: '#62F59F'
    },
    {
      name: '$92,720,854 to $171,964,222',
      color: '#9411F2'
    },
    {
      name: '$61,013,294 to $92,720,854',
      color: '#A61C70'
    },
    {
      name: '$23,882,883 to $61,013,294',
      color: '#F2119A'
    },
    {
      name: '$10,256,615 to $23,882,883',
      color: '#F2D729'
    },
    {
      name: '$3,168,411 to $10,256,615',
      color: '#40698b'
    },
    {
      name: '$0 to $3,168,411',
      color: '#D6AC63'
    }
  ];

  const legendStyles = {
    left: '130px',
    bottom: '-80px',
    width: '20%'
  };

  return (
    <Box sx={{
      mx: 2,
      my: 5,
      padding: 2,
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Itemized Taxes</Typography>
        </Grid>
        <Grid item xs={12}>
          {itemizedTaxes.length > 0 && <ItemizedTaxesMap currentData={itemizedTaxes}/>}
          <Legend
            title={'Total Taxes'}
            data={legendData}
            legendStyles={legendStyles}
          />
        </Grid>
      </Grid>
    </Box>
  );

}
