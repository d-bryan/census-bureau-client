import React from "react";
import {
  Box, Grid, Typography
} from "@mui/material";
import Map from "./Map";
import {mapStateName} from "../middleware";
// import * as JSC from "jscharting";

// const Map = ({currentData}) => {
// // JS
//   const chartConfig = {
//     debug: true,
//     title_label_text:
//       'Representative Apportionment of the Population of the United States',
//     type: 'map',
//     axisToZoom: '',
//     toolbar_visible: false,
//     legend: {
//       position: 'inside top right',
//       margin: { top: -10, right: 100 },
//       layout: 'horizontal',
//       defaultEntry_style_fontSize: '14px'
//     },
//     defaultPoint: {
//       outline_color: 'white',
//       label: {
//         text: '%stateCode',
//         style_color: '#3a3a3a'
//       },
//       tooltip:
//         '%name<br/><b>Per Rep:</b> %averagePerRep<br/><b>Population:</b> %population<br/><b>Reps:</b> %reps<br/><b>Year:</b> %year<br/>'
//     },
//     series: [
//       {
//         name: '1-10 reps',
//         color: '#40698b',
//         points: []
//       },
//       {
//         name: '11-20 reps',
//         color: '#F2D729',
//         points: []
//       },
//       {
//         name: '21-30 reps',
//         color: '#F2119A',
//         points: []
//       },
//       {
//         name: '31-40 reps',
//         color: '#A61C70',
//         points: []
//       },
//       {
//         name: '41-50 reps',
//         color: '#9411F2',
//         points: []
//       },
//       {
//         name: '51+ reps',
//         color: '#62F59F',
//         points: []
//       }
//     ]
//   };
//   const oneToTen = chartConfig.series[0];
//   const elevenToTwenty = chartConfig.series[1];
//   const twentyOneToThirty = chartConfig.series[2];
//   const thirtyOneToForty = chartConfig.series[3];
//   const fortyOneToFifty = chartConfig.series[4];
//   const fiftyOneAndMore = chartConfig.series[5];
//
//   currentData.forEach((state, index) => {
//     let currentReps = state.reps;
//     let stateName = state.state.replace('-', ' ');
//     let words = stateName.split(' ');
//     words.forEach((word, index) => {
//       words[index] = word.charAt(0).toUpperCase() + word.substring(1);
//     })
//     stateName = words.join(' ');
//     if (currentReps <= 10) {
//       oneToTen.points.push({
//         map: 'US.name:' + stateName,
//         attributes: {
//           averagePerRep: state.avg_per_rep,
//           population: state.pop,
//           reps: state.reps,
//           year: state.year,
//         }
//       });
//     } else if (currentReps > 10 && currentReps <= 20) {
//       elevenToTwenty.points.push({
//         map: 'US.name:' + stateName,
//         attributes: {
//           averagePerRep: state.avg_per_rep,
//           population: state.pop,
//           reps: state.reps,
//           year: state.year,
//         }
//       });
//     } else if (currentReps > 20 && currentReps <= 30) {
//       twentyOneToThirty.points.push({
//         map: 'US.name:' + stateName,
//         attributes: {
//           averagePerRep: state.avg_per_rep,
//           population: state.pop,
//           reps: state.reps,
//           year: state.year,
//         }
//       });
//     } else if (currentReps > 30 && currentReps <= 40) {
//       thirtyOneToForty.points.push({
//         map: 'US.name:' + stateName,
//         attributes: {
//           averagePerRep: state.avg_per_rep,
//           population: state.pop,
//           reps: state.reps,
//           year: state.year,
//         }
//       });
//     } else if (currentReps > 40 && currentReps <= 50) {
//       fortyOneToFifty.points.push({
//         map: 'US.name:' + stateName,
//         attributes: {
//           averagePerRep: state.avg_per_rep,
//           population: state.pop,
//           reps: state.reps,
//           year: state.year,
//         }
//       });
//     } else {
//       fiftyOneAndMore.points.push({
//         map: 'US.name:' + stateName,
//         attributes: {
//           averagePerRep: state.avg_per_rep,
//           population: state.pop,
//           reps: state.reps,
//           year: state.year,
//         }
//       });
//     }
//   })
//   const chartContainer = document.getElementById('chartDiv');
//
//   React.useEffect(() => {
//     return () => {
//       if (chartContainer !== null) {
//         if (chartContainer.children.length === 0) {
//           var chart = JSC.chart('chartDiv', chartConfig);
//           // var chart = JSC.chart('chartDiv', chartConfig);
//         }
//       }
//     }
//   }, [chartContainer, chartConfig]);
//
//   const styles = {
//     maxWidth: '740px',
//     margin: '0 auto',
//     height: '510px',
//   }
//
//
//   return (
//     <div id="chartDiv" style={styles}>
//     </div>
//   )
// }


export default function Apportionment(props) {
  const { context } = props;
  const [apportionment, setApportionment] = React.useState([]);

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

  return (
    <Box sx={{
      mx: 2,
      my: 5,
      padding: 2,
    }}>
      <Typography variant="h4">Apportionment</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {apportionment.length > 0 && <Map currentData={apportionment}/>}
          {/*<Map context={context}/>*/}
        </Grid>
      </Grid>
    </Box>
  )
}

