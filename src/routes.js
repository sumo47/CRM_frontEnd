import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
// import ProtectedRoute from './components/ProtectedRoute';
import LeadsPage from './pages/LeadsPage';
import TaskPage from './pages/TasksPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route 
                path="/customers" 
                element={
                    
                        <CustomersPage />
                   
                } 
            />
            <Route 
                path="/leads" 
                element={
                    
                        <LeadsPage />
                   
                } 
            />
            <Route 
                path="/tasks" 
                element={
                    
                        <TaskPage />
                   
                } 
            />
            <Route 
                path="/" 
                element={
                    
                        <DashboardPage />
                    
                } 
            />
        </Routes>
    );
};

export default AppRoutes;
