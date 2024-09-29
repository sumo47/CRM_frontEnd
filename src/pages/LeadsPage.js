// src/pages/LeadsPage.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import './LeadsPage.css'; // Custom CSS for styling
import axios from 'axios';

const API_URL = "http://localhost:4000"; // Replace with your backend URL

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentLead, setCurrentLead] = useState({
        name: '', email: '', phone: '', company: '', status: 'New', notes: ''
    });

    // Fetch leads on component mount
    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await axios.get(`${API_URL}/lead`, { headers: { 'token': localStorage.getItem('token') } });
            setLeads(response.data.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    // Handle Modal Show/Hide
    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setCurrentLead({ name: '', email: '', phone: '', company: '', status: 'New', notes: '' });
        setEditMode(false);
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentLead({
            ...currentLead,
            [name]: value
        });
    };

    // Handle Add/Edit Lead
    const handleSave = async () => {
        if (editMode) {
            // Update lead
            try {
                await axios.put(`${API_URL}/lead/${currentLead._id}`, currentLead, { headers: { 'token': localStorage.getItem('token') } });
                fetchLeads();
            } catch (error) {
                console.error('Error updating lead:', error);
            }
        } else {
            // Add new lead
            try {
                await axios.post(`${API_URL}/lead`, currentLead, { headers: { 'token': localStorage.getItem('token') } });
                fetchLeads();
            } catch (error) {
                console.error('Error adding lead:', error);
            }
        }
        handleClose();
    };

    // Handle Edit Lead
    const handleEdit = (lead) => {
        setEditMode(true);
        setCurrentLead(lead);
        handleShow();
    };

    // Handle Delete Lead
    const handleDelete = async (leadId) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await axios.delete(`${API_URL}/lead/${leadId}`, { headers: { 'token': localStorage.getItem('token') } });
                fetchLeads();
            } catch (error) {
                console.error('Error deleting lead:', error);
            }
        }
    };

    return (
        <Container className="leads-page">
            <h2 className="text-green text-center mb-4 animate__animated animate__fadeInDown">Leads</h2>
            <Button variant="success" onClick={handleShow} className="mb-3">Add Lead</Button>

            <Table striped bordered hover className="table-custom">
                <thead className="table-header">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead._id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.company}</td>
                            <td>{lead.status}</td>
                            <td>
                                <Button variant="warning" className="mr-2 mt-2" onClick={() => handleEdit(lead)}>Edit</Button>
                                <Button variant="danger" className='mt-2' onClick={() => handleDelete(lead._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Add/Edit Lead */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Lead' : 'Add Lead'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formLeadName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter lead name"
                                name="name"
                                value={currentLead.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLeadEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter lead email"
                                name="email"
                                value={currentLead.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLeadPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter lead phone"
                                name="phone"
                                value={currentLead.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formLeadCompany">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter lead company"
                                name="company"
                                value={currentLead.company}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formLeadStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={currentLead.status}
                                onChange={handleChange}
                            >
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Qualified</option>
                                <option>Converted</option>
                                <option>Closed</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formLeadNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter notes"
                                name="notes"
                                value={currentLead.notes}
                                onChange={handleChange}
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

export default LeadsPage;
