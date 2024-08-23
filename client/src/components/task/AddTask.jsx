import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useTasks } from '../../components/statemanagement/TaskContext';

const alertmessage = () =>{

  alert("Task added successfully!");
}

const AddTask = () => {
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [points, setPoints] = useState("");

  const projectOptions = ["Project 1", "Project 2", "Project 3"];
  const assignedToOptions = ["User 1", "User 2", "User 3"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: taskName,
      projectName,
      createdDate,
      endDate,
      assignedTo,
      priority,
      points,
      status: "Pending",
      latestRemark: "",
      latestClientRemark: "",
    };
    addTask(newTask);
    // Clear the form
    setTaskName("");
    setProjectName("");
    setCreatedDate("");
    setEndDate("");
    setAssignedTo("");
    setPriority("");
    setPoints("");
    // You can add a success message or redirect here
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#f4f6f8",
          borderRadius: 2,
          boxShadow: 3,
          mt: 5,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Name"
                variant="outlined"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Project Name</InputLabel>
                <Select
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  label="Project Name"
                >
                  {projectOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Created Date"
                variant="outlined"
                type="date"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Date"
                variant="outlined"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Assigned To</InputLabel>
                <Select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  label="Assigned To"
                >
                  {assignedToOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Points"
                variant="outlined"
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}  onClick = {alertmessage}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddTask;