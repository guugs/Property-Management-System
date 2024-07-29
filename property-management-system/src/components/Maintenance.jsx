import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';

const Maintenance = () => {
  const [requests, setRequests] = useState([
    { id: 1, property: 'Sunset Apartments', description: 'Leaky faucet', status: 'Pending' },
    { id: 2, property: 'Green Valley House', description: 'Broken window', status: 'In Progress' },
  ]);
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ property: '', description: '', status: 'Pending' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const addRequest = () => {
    setRequests([...requests, { ...newRequest, id: requests.length + 1 }]);
    setNewRequest({ property: '', description: '', status: 'Pending' });
    handleClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Maintenance Requests
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add New Request
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.property}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Maintenance Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="property"
            label="Property"
            type="text"
            fullWidth
            variant="standard"
            value={newRequest.property}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newRequest.description}
            onChange={handleInputChange}
          />
          <TextField
            select
            margin="dense"
            name="status"
            label="Status"
            fullWidth
            variant="standard"
            value={newRequest.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addRequest}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Maintenance;