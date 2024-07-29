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
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [newProperty, setNewProperty] = useState({ name: '', address: '', type: '' });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/properties', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProperties(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setError('Failed to fetch properties. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
    };

    const addProperty = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/properties', newProperty, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNewProperty({ name: '', address: '', type: '' });
            fetchProperties();
            setShowModal(false);
        } catch (error) {
            console.error('Error adding property:', error);
            setError('Failed to add property. Please try again.');
        }
    };

    const editProperty = async (id) => {
        try {
            const propertyToEdit = properties.find(p => p._id === id);
            setNewProperty({ ...propertyToEdit });
            setShowModal(true);
        } catch (error) {
            console.error('Error editing property:', error);
            setError('Failed to edit property. Please try again.');
        }
    };

    const deleteProperty = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/properties/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchProperties();
        } catch (error) {
            console.error('Error deleting property:', error);
            setError('Failed to delete property. Please try again.');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Properties
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowModal(true)}
                sx={{ mb: 2 }}
            >
                Add New Property
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Tenants</TableCell>
                            <TableCell>Lease Period</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property._id}>
                                <TableCell>{property.name}</TableCell>
                                <TableCell>{property.address}</TableCell>
                                <TableCell>{property.type}</TableCell>
                                <TableCell>{property.tenants.length}</TableCell>
                                <TableCell>
                                    {property.leaseStart
                                        ? `${new Date(property.leaseStart).toLocaleDateString()} - ${new Date(property.leaseEnd).toLocaleDateString()}`
                                        : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" size="small" onClick={() => editProperty(property._id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => deleteProperty(property._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>Add New Property</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newProperty.name}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newProperty.address}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="type"
                        label="Type"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newProperty.type}
                        onChange={handleInputChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={addProperty} variant="contained">Add Property</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Properties;