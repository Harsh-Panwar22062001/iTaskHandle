import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Container,
  Typography,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import addDays from 'date-fns/addDays';
import { useExpenses } from '../../components/statemanagement/ExpenseContext';

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(3),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
}));

const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams"];

const schools = [
  "Moti Ram Arya Senior Secondary School",
  "Saupins School",
  "St. John's High School",
  "Carmel Convent School",
  "Sacred Heart Senior Secondary School",
  "Bhavan Vidyalaya",
];

const AddExpense = () => {
  const [name, setName] = useState("");
  const { addExpense } = useExpenses(); 
  const [toSchool, setToSchool] = useState("");
  const [fromSchool, setFromSchool] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState(null);
  const [amount, setAmount] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { 
      name, 
      toSchool, 
      fromSchool, 
      selectedDate, 
      time,
      amount: parseFloat(amount) // Include the amount and parse it to a number
    };
    addExpense(newExpense);
    // Reset form fields
    setName("");
    setToSchool("");
    setFromSchool("");
    setSelectedDate(null);
    setTime(null);
    setAmount("");
  };

  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <FormWrapper elevation={3}>
          <Typography variant="h4" mb={4} align="center" fontWeight="bold" color="primary">
            Expense Form
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="name-select-label">Name</InputLabel>
              <Select
                labelId="name-select-label"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          

            <FormControl fullWidth margin="normal">
              <InputLabel id="from-select-label">From</InputLabel>
              <Select
                labelId="from-select-label"
                value={fromSchool}
                onChange={(e) => setFromSchool(e.target.value)}
                label="From"
              >
                {schools.map((school) => (
                  <MenuItem key={school} value={school}>
                    {school}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>



            <FormControl fullWidth margin="normal">
              <InputLabel id="to-select-label">To</InputLabel>
              <Select
                labelId="to-select-label"
                value={toSchool}
                onChange={(e) => setToSchool(e.target.value)}
                label="To"
              >
                {schools.map((school) => (
                  <MenuItem key={school} value={school}>
                    {school}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box mt={2} mb={2}>
              <StyledDatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
          
                placeholderText="Select  date"
                
              />
            </Box>

            <FormControl fullWidth margin="normal">
              <TimePicker
                value={time}
                onChange={(newValue) => setTime(newValue)}
                renderInput={(params) => <TextField {...params} label="Select Time" />}
              />
            </FormControl>


            <FormControl fullWidth margin="normal">
              <TextField
                label="Amount (₹)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{
                  startAdornment: <Typography>₹</Typography>,
                }}
              />
            </FormControl>

            <Box mt={4} display="flex" justifyContent="center">
              <StyledButton type="submit" fullWidth={isMobile}>
                Submit
              </StyledButton>
            </Box>
          </Box>
        </FormWrapper>
      </Container>
    </LocalizationProvider>
  );
};

export default AddExpense;