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

const Leases = () => {
  const [leases, setLeases] = useState([]);
  const [newLease, setNewLease] = useState({ property: '', tenant: '', startDate: '', endDate: '', rent: '' });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetchLeases();
    fetchProperties();
    fetchTenants();
  }, []);

  const fetchLeases = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/leases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLeases(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching leases:', error);
      setError('Failed to fetch leases. Please try again later.');
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

  const fetchTenants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tenants', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTenants(response.data);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewLease({ ...newLease, [e.target.name]: e.target.value });
  };

  const addLease = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/leases', newLease, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewLease({ property: '', tenant: '', startDate: '', endDate: '', rent: '' });
      fetchLeases();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding lease:', error);
      setError('Failed to add lease. Please try again.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leases
      </Typography>
      <Button
        variant="contained"
        onClick={() => setShowModal(true)}
        sx={{ mb: 2 }}
      >
        Add New Lease
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Tenant</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Rent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leases.map((lease) => (
              <TableRow key={lease._id}>
                <TableCell>{lease.property.name}</TableCell>
                <TableCell>{lease.tenant.username}</TableCell>
                <TableCell>{new Date(lease.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(lease.endDate).toLocaleDateString()}</TableCell>
                <TableCell>${lease.rent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Add New Lease</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            name="property"
            label="Property"
            fullWidth
            variant="outlined"
            value={newLease.property}
            onChange={handleInputChange}
            required
          >
            {properties.map((property) => (
              <MenuItem key={property._id} value={property._id}>
                {property.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            name="tenant"
            label="Tenant"
            fullWidth
            variant="outlined"
            value={newLease.tenant}
            onChange={handleInputChange}
            required
          >
            {tenants.map((tenant) => (
              <MenuItem key={tenant._id} value={tenant._id}>
                {tenant.username}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newLease.startDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newLease.endDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="rent"
            label="Rent"
            type="number"
            fullWidth
            variant="outlined"
            value={newLease.rent}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={addLease} variant="contained">Add Lease</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Leases;