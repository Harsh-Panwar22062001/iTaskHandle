import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  TextField,
  Grid,
  Typography,
  Slide,
  Box,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useTasks } from '../../components/statemanagement/TaskContext';
import { Link } from "react-router-dom";

const TaskMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { tasks } = useTasks();


  console.log("Rendering tasks:", tasks);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <TextField
          variant="outlined"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <FaSearch style={{ marginRight: 8 }} />,
          }}
        />
        <Button variant="contained" color="primary" href="/add-task">
          Add Task
        </Button>
      </Box>
      <Grid container spacing={3}>
        {tasks
          .filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Card
                  sx={{
                    boxShadow: 3,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <CardHeader
                    title={task.name}
                    sx={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  />
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      <strong>Project Name:</strong> {task.projectName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Created Date:</strong> {task.createdDate}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>End Date:</strong> {task.endDate}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Current Status:</strong> {task.status}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Assigned To:</strong> {task.assignedTo}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Latest Remark:</strong> {task.latestRemark}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Latest Client Remark:</strong> {task.latestClientRemark}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Priority:</strong> {task.priority}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Points:</strong> {task.points}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
  <Link to={`/update-task/${task.id}`} style={{ textDecoration: 'none' }}>

  </Link>
</CardActions>
                </Card>
              </Slide>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default TaskMaster;