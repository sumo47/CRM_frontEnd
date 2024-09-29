// src/pages/TaskPage.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import './TaskPage.css'; // Custom CSS for styling
import axios from 'axios';

const API_URL = "http://localhost:4000"; // Replace with your backend URL

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState({
        title: '', description: '', dueDate: '', status: 'Pending', assignedTo: ''
    });

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/task`, { headers: { 'token': localStorage.getItem('token') } });
            setTasks(response.data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Handle Modal Show/Hide
    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setCurrentTask({ title: '', description: '', dueDate: '', status: 'Pending', assignedTo: '' });
        setEditMode(false);
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTask({
            ...currentTask,
            [name]: value
        });
    };

    // Handle Add/Edit Task
    const handleSave = async () => {
        if (editMode) {
            // Update task
            try {
                await axios.put(`${API_URL}/task/${currentTask._id}`, currentTask, { headers: { 'token': localStorage.getItem('token') } });
                fetchTasks();
            } catch (error) {
                console.error('Error updating task:', error);
            }
        } else {
            // Add new task
            try {
                await axios.post(`${API_URL}/task`, currentTask, { headers: { 'token': localStorage.getItem('token') } });
                fetchTasks();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
        handleClose();
    };

    // Handle Edit Task
    const handleEdit = (task) => {
        setEditMode(true);
        setCurrentTask(task);
        handleShow();
    };

    // Handle Delete Task
    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`${API_URL}/task/${taskId}`, { headers: { 'token': localStorage.getItem('token') } });
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <Container className="task-page">
            <h2 className="text-center text-green">Tasks</h2>
            <Button variant="success" onClick={handleShow} className="mb-3">Add Task</Button>

            <Table striped bordered hover className="table-custom">
                <thead className="table-header">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td>{task.status}</td>
                            <td>{task.assignedTo ? task.assignedTo.name : 'Not Assigned'}</td>
                            <td>
                                <Button variant="warning" className="mr-2 mt-2" onClick={() => handleEdit(task)}>Edit</Button>
                                <Button variant="danger" className='mt-2' onClick={() => handleDelete(task._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Add/Edit Task */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Task' : 'Add Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTaskTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title"
                                name="title"
                                value={currentTask.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTaskDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter task description"
                                name="description"
                                value={currentTask.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTaskDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={currentTask.dueDate}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTaskStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={currentTask.status}
                                onChange={handleChange}
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formTaskAssignedTo">
                            <Form.Label>Assigned To</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter assigned user or leave empty for Not Assigned"
                                name="assignedTo"
                                value={currentTask.assignedTo}
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

export default TaskPage;
