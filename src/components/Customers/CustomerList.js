import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../../api/customerApi';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers', error);
            }
        };
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    return (
        <div>
            <h2>Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer._id}>
                        {customer.name} - {customer.email}
                        <button onClick={() => handleDelete(customer._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
