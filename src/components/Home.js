import {Box, Typography} from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <Box sx={{
      padding: 2,
    }}>
      <Typography variant="h6">
        Data Science project that implements a REST API and data from the Bureau of Labor Statistics.
      </Typography>
      <Typography variant="p">Select a menu Item
        to see a Choropleth map regarding the data.
      </Typography>
    </Box>
  )
}
