import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Modal } from 'react-bootstrap';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [newProperty, setNewProperty] = useState({ name: '', address: '', type: '' });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('/api/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
    };

    const addProperty = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/properties', newProperty);
            setNewProperty({ name: '', address: '', type: '' });
            fetchProperties();
            setShowModal(false);
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    const deleteProperty = async (id) => {
        try {
            await axios.delete(`/api/properties/${id}`);
            fetchProperties();
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Properties</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add New Property</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Type</th>
                        <th>Tenants</th>
                        <th>Lease Period</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td>{property.name}</td>
                            <td>{property.address}</td>
                            <td>{property.type}</td>
                            <td>{property.tenants.length}</td>
                            <td>{property.leaseStart ? `${new Date(property.leaseStart).toLocaleDateString()} - ${new Date(property.leaseEnd).toLocaleDateString()}` : 'N/A'}</td>
                            <td>
                                <Button variant="info" size="sm" className="mr-2">Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => deleteProperty(property._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addProperty}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={newProperty.name} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={newProperty.address} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" name="type" value={newProperty.type} onChange={handleInputChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Property</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Properties;