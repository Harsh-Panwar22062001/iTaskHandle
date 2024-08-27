import React, { useState } from "react";
import { Button, TextField, Typography, Box, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@mui/system";
import { useTasks } from '../../components/statemanagement/TaskContext';

// Define animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components
const AnimatedCard = styled(Card)(({ theme }) => ({
  animation: `${fadeIn} 0.5s ease-in-out`,
  marginBottom: theme.spacing(2),
}));

const EditTask = () => {
  const { tasks, updateTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSelectTask = (event) => {
    const taskId = event.target.value;
    const task = tasks.find(t => t.id === parseInt(taskId));
    setSelectedTask(task);
  };

  const handleFieldChange = (field) => (event) => {
    setSelectedTask(prevTask => ({
      ...prevTask,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (selectedTask) {
        console.log("Submitting task:", selectedTask);
      updateTask(selectedTask);
      setSelectedTask(null);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom style={{ marginTop: '30px' }}>Edit Task</Typography>
      <FormControl fullWidth>
        <InputLabel id="select-task-label">Select Task</InputLabel>
        <Select
          labelId="select-task-label"
          value={selectedTask ? selectedTask.id : ""}
          onChange={handleSelectTask}
        >
          {tasks.map(task => (
            <MenuItem key={task.id} value={task.id}>{task.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedTask && (
        <Box mt={2}>
          <TextField
            label="Task Name"
            value={selectedTask.name}
            onChange={handleFieldChange('name')}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="project-name-label">Task Project Name</InputLabel>
            <Select
              labelId="project-name-label"
              value={selectedTask.projectName}
              onChange={handleFieldChange('projectName')}
            >
              {/* Replace with actual project names */}
              <MenuItem value="Project A">Project A</MenuItem>
              <MenuItem value="Project B">Project B</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Task Created Date"
            type="date"
            value={selectedTask.createdDate}
            onChange={handleFieldChange('createdDate')}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Task End Date"
            type="date"
            value={selectedTask.endDate}
            onChange={handleFieldChange('endDate')}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="assigned-to-label">Task Assigned To</InputLabel>
            <Select
              labelId="assigned-to-label"
              value={selectedTask.assignedTo}
              onChange={handleFieldChange('assignedTo')}
            >
              {/* Replace with actual user names */}
              <MenuItem value="User A">User A</MenuItem>
              <MenuItem value="User B">User B</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Task Priority"
            value={selectedTask.priority}
            onChange={handleFieldChange('priority')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task Points"
            value={selectedTask.points}
            onChange={handleFieldChange('points')}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>All Tasks</Typography>
        {tasks.map(task => (
          <AnimatedCard key={task.id}>
            <CardContent>
              <Typography variant="h6">{task.name}</Typography>
              <Typography color="textSecondary">Project: {task.projectName}</Typography>
              <Typography color="textSecondary">Created Date: {task.createdDate}</Typography>
              <Typography color="textSecondary">End Date: {task.endDate}</Typography>
              <Typography color="textSecondary">Assigned To: {task.assignedTo}</Typography>
              <Typography color="textSecondary">Priority: {task.priority}</Typography>
              <Typography color="textSecondary">Points: {task.points}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setSelectedTask(task)}
              >
                Edit Task
              </Button>
            </CardContent>
          </AnimatedCard>
        ))}
      </Box>
    </Box>
  );
};

export default EditTask;
