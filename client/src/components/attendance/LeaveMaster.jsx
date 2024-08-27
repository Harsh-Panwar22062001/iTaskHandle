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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLeaves } from '../../components/statemanagement/LeaveContext';

const getCardStyle = (leaveType) => {
    switch (leaveType) {
      case 'Urgent':
        return {
          backgroundColor: "#ffebee", // Light red background
          border: "1px solid #ff5722", // Red border
        };
      case 'Planned':
        return {
          backgroundColor: "#e8f5e9", // Light green background
          border: "1px solid #4caf50", // Green border
        };
      case 'WFH':
        return {
          backgroundColor: "#e3f2fd", // Light blue background
          border: "1px solid #2196f3", // Blue border
        };
      default:
        return {
          backgroundColor: "#ffffff", // Default background
          border: "1px solid #cccccc", // Default border
        };
    }
};

const LeaveMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { leaveRequests, updateLeaveRequest } = useLeaves();

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    handleFilterClose();
  };

  const filterLeaveRequests = () => {
    return leaveRequests
      .filter((request) => request.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((request) => selectedFilter === 'All' || request.leaveType === selectedFilter);
  };

  const handleApproval = (id, isApproved) => {
    updateLeaveRequest({ id, status: isApproved ? 'Approved' : 'Disapproved' });
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4} alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Search leave requests..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <FaSearch style={{ marginRight: 8 }} />,
          }}
          sx={{
            flex: 1,
            maxWidth: "300px",
            marginTop:"25px"
          }}
        />
        <Box ml={2}>
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleFilterSelect('All')}>All</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Urgent')}>Urgent</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Planned')}>Planned</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('WFH')}>WFH</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {filterLeaveRequests().map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Card
                  sx={{
                    ...getCardStyle(request.leaveType),
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                      border: "1px solid transparent",
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <CardHeader
                    title={request.name}
                    sx={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  />
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      <strong>Leave Type:</strong> {request.leaveType}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Reason:</strong> {request.reason}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Number of Days:</strong> {request.numberOfDays}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Start Date:</strong> {request.startDate}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>End Date:</strong> {request.endDate}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Status:</strong> {request.status || 'Pending'}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleApproval(request.id, true)}
                      disabled={request.status === 'Approved' || request.status === 'Disapproved'}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handleApproval(request.id, false)}
                      disabled={request.status === 'Approved' || request.status === 'Disapproved'}
                    >
                      Disapprove
                    </Button>
                  </CardActions>
                </Card>
              </Slide>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default LeaveMaster;
