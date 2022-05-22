import React from "react";
import {Box, Typography} from "@mui/material";
import '../styles/legend.css';

export default function Legend({title, data, legendStyles}) {
  return (
    <Box className="legend" style={legendStyles}>
      <Typography
        variant="h6"
        sx={{
          position: 'relative',
          top: -10,
        }}
      >{title}</Typography>
      {data.map(item => {
        return (
          <Box
            key={item.name}
            className="legend-item"
            style={{
              "--color": item.color
            }}
          >
            {item.name}
          </Box>
        );
      })}
    </Box>
  );
}
