// src/pages/DashboardPage.js

import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="dashboard-page">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">CRM Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Button variant="outline-light" onClick={logout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container fluid className="mt-4">
                <Row>
                    <Col md={3} className="sidebar">
                        <h4 className="text-white">Navigation</h4>
                        <Nav className="flex-column">
                            <Nav.Link href="/">Dashboard</Nav.Link>
                            <Nav.Link href="/customers">Customers</Nav.Link>
                            <Nav.Link href="/leads">Leads</Nav.Link>
                            <Nav.Link href="/tasks">Tasks</Nav.Link>
                        </Nav>
                    </Col>

                    <Col md={9}>
                        <h2 className="text-white">Overview</h2>
                        <Row className="mt-3">
                            <Col md={4}>
                                <Card className="bg-success text-white mb-4">
                                    <Card.Body>
                                        <Card.Title>Customers</Card.Title>
                                        <Card.Text>Total: 120</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="bg-primary text-white mb-4">
                                    <Card.Body>
                                        <Card.Title>Leads</Card.Title>
                                        <Card.Text>Total: 50</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="bg-warning text-white mb-4">
                                    <Card.Body>
                                        <Card.Title>Tasks</Card.Title>
                                        <Card.Text>Total: 30</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Card className="mb-4">
                                    <Card.Header as="h5">Recent Activity</Card.Header>
                                    <Card.Body>
                                        <ul>
                                            <li>Customer John Doe added.</li>
                                            <li>Lead Jane Smith contacted.</li>
                                            <li>Task "Follow-up" marked complete.</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DashboardPage;
