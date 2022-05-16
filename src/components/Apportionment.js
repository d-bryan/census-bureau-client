import React from "react";
import {
  Box, Grid, MenuItem, TextField,
  Typography, Slider,
  FormControlLabel, Switch,
  Button,
} from "@mui/material";

export default function Apportionment(props) {
  const { context } = props;
  const [dataChoice, setDataChoice] = React.useState({
    choice: 'totalApportionment',
    selectedState: {
      value: '',
      isHidden: true,
    },
    selectedYear: {
      value: '',
      isHidden: true,
      min: 1930,
      max: 2020,
    },
    selectedPopulation: {
      value: '',
      isHidden: true,
      min: 0,
      max: 39576757,
    },
    selectedRepresentatives: {
      value: '',
      isHidden: true,
      min: 0,
      max: 53,
    },
  });
  const [apportionment, setApportionment] = React.useState({
    full: [],
    state: [],
    year: [],
    popGreater: [],
    popLess: [],
    repGreater: [],
    repLess: [],
  });
  const [sliderProps, setSliderProps] = React.useState({
    marks: [],
    currentValue: 1,
    defaultValue: 1,
    min: 1,
    max: 53,
    step: 1,
  });

  const handleSetSliderMarks = (currentChoice) => {
    const marks = [];
    switch (currentChoice) {
      case 'totalApportionment':
        setSliderProps({
          ...sliderProps,
          marks: [],
          currentValue: 1,
          defaultValue: 1,
          min: 1,
          max: 53,
          step: 1,
        });
        break;
      case 'apportionmentByYear':
        for (let i = dataChoice.selectedYear.min; i <= dataChoice.selectedYear.max; i += 10) {
          marks.push({
            value: i,
            label: i,
          });
        }
        setSliderProps({
          ...sliderProps,
          marks: marks,
          currentValue: dataChoice.selectedYear.min,
          defaultValue: dataChoice.selectedYear.min,
          min: dataChoice.selectedYear.min,
          max: dataChoice.selectedYear.max,
          step: 10,
        });
        break;
      case 'apportionmentByPopulation':
        for (let i = dataChoice.selectedPopulation.min; i <= dataChoice.selectedPopulation.max; i += Math.floor(dataChoice.selectedPopulation.max / 10)) {
          marks.push({
            value: i,
            label: i,
          });
        }
        setSliderProps({
          ...sliderProps,
          marks: marks,
          currentValue: dataChoice.selectedPopulation.min,
          defaultValue: dataChoice.selectedPopulation.min,
          min: dataChoice.selectedPopulation.min,
          max: dataChoice.selectedPopulation.max,
          step: Math.floor(dataChoice.selectedPopulation.max / 10),
        });
        break;
      case 'apportionmentByRepresentative':
        for (let i = dataChoice.selectedRepresentatives.min; i <= dataChoice.selectedRepresentatives.max; i += Math.floor(dataChoice.selectedRepresentatives.max / 10)) {
          marks.push({
            value: i,
            label: i,
          });
        }
        setSliderProps({
          ...sliderProps,
          marks: marks,
          currentValue: dataChoice.selectedRepresentatives.min,
          defaultValue: dataChoice.selectedRepresentatives.min,
          min: dataChoice.selectedRepresentatives.min,
          max: dataChoice.selectedRepresentatives.max,
          step: Math.floor(dataChoice.selectedRepresentatives.max / 10),
        });
        break;
      default:
          break;
    }
  }

  const setAdditionalFieldDisplay = (currentChoice) => {
    switch (currentChoice) {
      case 'totalApportionment':
        setDataChoice({
          ...dataChoice,
          selectedState: {value: dataChoice.selectedState.value, isHidden: true},
          selectedYear: {value: dataChoice.selectedYear.value, isHidden: true, min: 1930, max: 2020},
          selectedPopulation: {value: dataChoice.selectedPopulation.value, isHidden: true, min: 0, max: 39576757},
          selectedRepresentatives: {value: dataChoice.selectedRepresentatives.value, isHidden: true, min: 0, max: 53},
        })
        break;
      case 'apportionmentByState':
        setDataChoice({
          ...dataChoice,
          selectedState: {value: dataChoice.selectedState.value, isHidden: false},
          selectedYear: {value: dataChoice.selectedYear.value, isHidden: true, min: 1930, max: 2020},
          selectedPopulation: {value: dataChoice.selectedPopulation.value, isHidden: true, min: 0, max: 39576757},
          selectedRepresentatives: {value: dataChoice.selectedRepresentatives.value, isHidden: true, min: 0, max: 53},
        })
        break;
      case 'apportionmentByYear':
        setDataChoice({
          ...dataChoice,
          selectedState: {value: dataChoice.selectedState.value, isHidden: true},
          selectedYear: {value: dataChoice.selectedYear.value, isHidden: false, min: 1930, max: 2020},
          selectedPopulation: {value: dataChoice.selectedPopulation.value, isHidden: true, min: 0, max: 39576757},
          selectedRepresentatives: {value: dataChoice.selectedRepresentatives.value, isHidden: true, min: 0, max: 53},
        })
        break;
      case 'apportionmentByPopulation':
        setDataChoice({
          ...dataChoice,
          selectedState: {value: dataChoice.selectedState.value, isHidden: true},
          selectedYear: {value: dataChoice.selectedYear.value, isHidden: true, min: 1930, max: 2020},
          selectedPopulation: {value: dataChoice.selectedPopulation.value, isHidden: false, min: 0, max: 39576757},
          selectedRepresentatives: {value: dataChoice.selectedRepresentatives.value, isHidden: true, min: 0, max: 53},
        })
        break;
      case 'apportionmentByRepresentative':
        setDataChoice({
          ...dataChoice,
          selectedState: {value: dataChoice.selectedState.value, isHidden: true},
          selectedYear: {value: dataChoice.selectedYear.value, isHidden: true, min: 1930, max: 2020},
          selectedPopulation: {value: dataChoice.selectedPopulation.value, isHidden: true, min: 0, max: 39576757},
          selectedRepresentatives: {value: dataChoice.selectedRepresentatives.value, isHidden: false, min: 0, max: 53},
        })
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    return () => {
      if (apportionment.length === 0){
        context.actions.totalApportionment().then(res => {
          setApportionment(res);
        })
      }
    }
  }, [apportionment.length, context.actions]);

  const handleChange = (event) => {
    setAdditionalFieldDisplay(event.target.value);
    handleSetSliderMarks(event.target.value);
    setDataChoice((prev) =>{
      return {
        ...prev,
        choice: event.target.value,
      }
    })
  }

  const dataChoices = [
    {
      label: 'Total Apportionment',
      value: 'totalApportionment',
    },
    {
      label: 'Apportionment by State',
      value: 'apportionmentByState',
    },
    {
      label: 'Apportionment by Year',
      value: 'apportionmentByYear',
    },
    {
      label: 'Apportionment by Population',
      value: 'apportionmentByPopulation',
    },
    {
      label: 'Apportionment by Representative',
      value: 'apportionmentByRepresentative',
    },
  ];



  return (
    <Box sx={{
      mx: 2,
      my: 5,
      padding: 2,
    }}>
      <Typography variant="h4">Apportionment</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '80%',
              margin: 'auto',
            }}
          >
            <TextField
              id="select-data-choice"
              select
              fullWidth
              label="Apportionment Data for Map"
              value={dataChoice.choice}
              onChange={handleChange}
              helperText={`Select the data you would like to see`}
              sx={{
                my: 4,
                py: 2
              }}
            >
              {dataChoices.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '80%',
              margin: 'auto',
          }}
          >
            <TextField
              id="selectedState"
              label="Enter a State"
              fullWidth
              name="selectedState"
              sx={{
                display: dataChoice.selectedState.isHidden ? 'none' : 'inherit',
              }}
              onChange={(e) => {
                setDataChoice({
                  ...dataChoice,
                  selectedState: {
                    value: e.target.value,
                    isHidden: false,
                  },
                });
              }}
              value={dataChoice.selectedState.value}
              helperText={`Enter a state to see its apportionment`}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Slider
            key={sliderProps.step}
            marks={sliderProps.marks}
            step={sliderProps.step}
            defaultValue={sliderProps.defaultValue}
            min={sliderProps.min}
            max={sliderProps.max}
            onChange={(e, value) => {
              setSliderProps({
                ...sliderProps,
                currentValue: value,
              });
            }}
            sx={{
              // display: (additionalData.selectedYear.isHidden || additionalData.selectedPopulation.isHidden || additionalData.selectedRepresentatives.isHidden) ? 'none' : 'inherit',
              display: (dataChoice.choice === 'apportionmentByYear' || dataChoice.choice === 'apportionmentByPopulation' || dataChoice.choice === 'apportionmentByRepresentative') ? 'inherit' : 'none',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{
              display: (dataChoice.choice === 'apportionmentByYear' || dataChoice.choice === 'apportionmentByPopulation' || dataChoice.choice === 'apportionmentByRepresentative') ? 'inherit' : 'none',
            }}
            control={
              <Switch
              />
            }
            label="Greater Than Slider Number"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
          >
            Create Map
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
