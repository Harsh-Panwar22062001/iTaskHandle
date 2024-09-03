// import React, { useState } from 'react';
// import { Container, Typography, Box, TextField, Button } from '@mui/material';

// const LandingPage = () => {
//   const [selectedDate, setSelectedDate] = useState('');

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
//   };

//   return (
//     <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
//       <Typography variant="h2" gutterBottom>
//         Welcome to iTask Management
//       </Typography>
//       <Typography variant="h6" paragraph>
//         Here are some inspiring thoughts to get you started:
//       </Typography>
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           "Success is not final, failure is not fatal: It is the courage to continue that counts."
//         </Typography>
//         <Typography variant="h6">
//           "The only limit to our realization of tomorrow is our doubts of today."
//         </Typography>
//       </Box>
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//         <TextField
//           type="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//           label="Select Date"
//           InputLabelProps={{ shrink: true }}
//           inputProps={{ max: new Date().toISOString().split('T')[0] }}
//           sx={{ width: 220 }}
//         />
//         {selectedDate && (
//           <Typography variant="body1">
//             Selected date: {formatDate(selectedDate)}
//           </Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default LandingPage;