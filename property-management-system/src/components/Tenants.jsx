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
} from '@mui/material';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [newTenant, setNewTenant] = useState({ username: '', password: '', role: 'tenant' });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tenants', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTenants(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      setError('Failed to fetch tenants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewTenant({ ...newTenant, [e.target.name]: e.target.value });
  };

  const addTenant = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tenants', newTenant, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewTenant({ username: '', password: '', role: 'tenant' });
      fetchTenants();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding tenant:', error);
      setError('Failed to add tenant. Please try again.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tenants
      </Typography>
      <Button
        variant="contained"
        onClick={() => setShowModal(true)}
        sx={{ mb: 2 }}
      >
        Add New Tenant
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant._id}>
                <TableCell>{tenant.username}</TableCell>
                <TableCell>{tenant.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Add New Tenant</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={newTenant.username}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newTenant.password}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={addTenant} variant="contained">Add Tenant</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tenants;