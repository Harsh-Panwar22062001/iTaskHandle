// src/pages/LandingPage.jsx
import React from 'react';
import { Container, Typography, Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const LandingPage = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to iTask Management
      </Typography>
      <Typography variant="h6" paragraph>
        Here are some inspiring thoughts to get you started:
      </Typography>
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          "Success is not final, failure is not fatal: It is the courage to continue that counts."
        </Typography>
        <Typography variant="h6">
          "The only limit to our realization of tomorrow is our doubts of today."
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
          label="Select Date"
          disableFuture
          sx={{ maxWidth: 300, mx: 'auto' }}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default LandingPage;
