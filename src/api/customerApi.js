import axios from 'axios';
const API_URL =" http://localhost:4000"

export const getCustomers = () => {
    return axios.get(`${API_URL}/customer`, {  headers: { token:  localStorage.getItem('token') } });
};

export const createCustomer = (customerData) => {
    return axios.post(`${API_URL}/customer`, customerData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export const updateCustomer = (id, customerData) => {
    return axios.put(`${API_URL}/customer/${id}`, customerData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export const deleteCustomer = (id) => {
    return axios.delete(`${API_URL}/customer/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};
