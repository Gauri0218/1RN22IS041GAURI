import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";


const StockChart = () => {
 

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" color="secondary" gutterBottom>
          Stock Price Chart
        </Typography>
        <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* <Line data={data} /> */}
          <Typography color="text.disabled">[Chart will appear here]</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StockChart;