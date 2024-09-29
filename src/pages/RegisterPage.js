// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './RegisterPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '' // default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:4000/register`, formData)
                .then((response) => {
                    alert('Registration successful! Please log in.');
                    window.location.href = '/login';
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    console.log(err);
                });
        } catch (error) {
            alert('Registration failed. Try again.');
        }
    };

    return (
        <Container className="register-page mt-5">
            <h2 className="text-center text-light">Register</h2>
            <Form onSubmit={handleSubmit} className="form-container">
                <Form.Group controlId="formUsername">
                    <Form.Label className="text-light">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label className="text-light">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formRole">
                    <Form.Label className="text-light">Role</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Please choose role</option>
                        <option value="admin">Admin</option>
                        <option value="sales_rep">Sales</option>
                        <option value="marketing_manager">Marketing</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="success" type="submit" className="mt-3">
                    Register
                </Button>
                <Link to='/login'>
                    <Button variant="secondary" type="button" className="mt-3 ml-2">
                        Login
                    </Button>
                </Link>
            </Form>
        </Container>
    );
};

export default RegisterPage;
