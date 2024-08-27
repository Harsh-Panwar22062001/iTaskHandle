// UpdateTask.jsx
import React, { useState } from "react";
import { Button, TextField, Typography, Box, Card, CardContent, CardActions, IconButton, FormControl, InputLabel, Select, MenuItem, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useTasks } from '../../components/statemanagement/TaskContext';
import { motion } from 'framer-motion';

const UpdateTask = () => {
  const { tasks, updateTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  const handleStatusChange = (event) => {
    setSelectedTask(prevTask => ({
      ...prevTask,
      status: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (selectedTask) {
      updateTask(selectedTask);
      setSelectedTask(null); // Optionally clear the selected task after update
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom  style={{ marginTop: '30px' }}>Update Task</Typography>
      
      {/* Task Cards Display */}
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card sx={{ width: 300, margin: 1, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{task.name}</Typography>
                <Typography variant="body2">Project: {task.projectName}</Typography>
                <Typography variant="body2">Created Date: {task.createdDate}</Typography>
                <Typography variant="body2">End Date: {task.endDate}</Typography>
                <Typography variant="body2">Assigned To: {task.assignedTo}</Typography>
                <Typography variant="body2">Priority: {task.priority}</Typography>
                <Typography variant="body2">Points: {task.points}</Typography>
                <Typography variant="body2">Status: {task.status}</Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Edit Task">
                  <IconButton onClick={() => handleEditClick(task)}>
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Edit Task Form */}
      {selectedTask && (
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>Edit Task Details</Typography>
          <TextField
            label="Task Name"
            value={selectedTask.name}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task Project Name"
            value={selectedTask.projectName}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task Created Date"
            value={selectedTask.createdDate}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task End Date"
            value={selectedTask.endDate}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task Assigned To"
            value={selectedTask.assignedTo}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task Priority"
            value={selectedTask.priority}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task Points"
            value={selectedTask.points}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Task Status</InputLabel>
            <Select
              labelId="status-label"
              value={selectedTask.status}
              onChange={handleStatusChange}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Task
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UpdateTask;
