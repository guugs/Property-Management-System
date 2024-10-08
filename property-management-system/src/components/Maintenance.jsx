import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ property: '', description: '', status: 'pending' });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchProperties();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/maintenance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
      setError('Failed to fetch maintenance requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/properties', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const addRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/maintenance', newRequest, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewRequest({ property: '', description: '', status: 'pending' });
      fetchRequests();
      handleClose();
    } catch (error) {
      console.error('Error adding maintenance request:', error);
      setError('Failed to add maintenance request. Please try again.');
    }
  };

  const updateRequestStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/maintenance/${id}`, { status: newStatus }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchRequests();
    } catch (error) {
      console.error('Error updating maintenance request:', error);
      setError('Failed to update maintenance request. Please try again.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Maintenance Requests
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        New Request
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.property.name}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => updateRequestStatus(request._id, 'in-progress')}
                    disabled={request.status !== 'pending'}
                  >
                    Start
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => updateRequestStatus(request._id, 'completed')}
                    disabled={request.status === 'completed'}
                  >
                    Complete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Maintenance Request</DialogTitle>
        <DialogContent>
          <TextField
            select
            autoFocus
            margin="dense"
            name="property"
            label="Property"
            fullWidth
            variant="standard"
            value={newRequest.property}
            onChange={handleInputChange}
          >
            {properties.map((property) => (
              <MenuItem key={property._id} value={property._id}>
                {property.name}
              </MenuItem>
            ))}
          </TextField>
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
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
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