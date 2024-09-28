import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const   Navigate = useNavigate()

    const handleLogin = async (e) => {
        console.log(email, password)
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/login`, { email, password })
                .then((res) => {
                    console.log(res)
                    const token = res.data.data.token
                    localStorage.setItem('token', token)
                    Navigate('/')
                })
                .catch((err) => {
                    // Wow what a nice logic // err will not console everytime while error occurs by user
                    alert(err.response.data.message)
                    console.log(err.response.data.message)
                })

            const token = response.data.token;
            login(token);
        } catch (error) {
            // alert('Invalid credentials');
            console.log(error)
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                <a href='/register'><button type="button" className="btn btn-primary btn-block mt-3">Register</button>
                </a>
            </form>
        </div>
    );
};

export default LoginPage;
