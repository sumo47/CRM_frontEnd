// src/pages/CustomersPage.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import './CustomersPage.css'; // Additional styling
import axios from 'axios';

const API_URL = "http://localhost:4000"; // Adjust to your API

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({ name: '', email: '', phone: '', address: '' });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${API_URL}/customer`, { headers: { 'token': localStorage.getItem('token') } });
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setCurrentCustomer({ name: '', email: '', phone: '', address: '' });
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCustomer({
            ...currentCustomer,
            [name]: value
        });
    };

    const handleSave = async () => {
        if (editMode) {
            try {
                await axios.put(`${API_URL}/customer/${currentCustomer._id}`, currentCustomer, { headers: { 'token': localStorage.getItem('token') } });
                fetchCustomers();
            } catch (error) {
                console.error('Error updating customer:', error);
            }
        } else {
            try {
                await axios.post(`${API_URL}/customer`, currentCustomer, { headers: { 'token': localStorage.getItem('token') } });
                fetchCustomers();
            } catch (error) {
                console.error('Error adding customer:', error);
            }
        }
        handleClose();
    };

    const handleEdit = (customer) => {
        setEditMode(true);
        setCurrentCustomer(customer);
        handleShow();
    };

    const handleDelete = async (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`${API_URL}/customer/${customerId}`, { headers: { 'token': localStorage.getItem('token') } });
                fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    return (
        <Container className="customers-page">
            <h2 className="text-center text-green mb-4 animate__animated animate__fadeInDown">Customers</h2>
            <Button variant="success" onClick={handleShow} className="mb-3 animate__animated animate__fadeInLeft">Add Customer</Button>

            <Table striped bordered hover responsive className="table-custom animate__animated animate__fadeInUp">
                <thead className="table-header">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>
                                <Button variant="warning" className="mr-2 mt-2" onClick={() => handleEdit(customer)}>Edit</Button>
                                <Button variant="danger" className='mt-2' onClick={() => handleDelete(customer._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCustomerName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter customer name"
                                name="name"
                                value={currentCustomer.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCustomerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter customer email"
                                name="email"
                                value={currentCustomer.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCustomerPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter customer phone"
                                name="phone"
                                value={currentCustomer.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCustomerAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter customer address"
                                name="address"
                                value={currentCustomer.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleSave}>
                        {editMode ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CustomersPage;
