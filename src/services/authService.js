import { login, register } from '../api/authApi';

const authService = {
    login: async (email, password) => {
        const response = await login(email, password);
        localStorage.setItem('token', response.data.token); // Save token to local storage
        return response.data;
    },
    register: async (userData) => {
        const response = await register(userData);
        return response.data;
    }
};

export default authService;
