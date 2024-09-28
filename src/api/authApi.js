import axios from 'axios';
const API_URL = "http://localhost:4000";

export const login =async (email, password) => {
    console.log(email, password)
    await axios.post(`${API_URL}/login`, { email, password })
    .then((res) => {
      const token = res.data.token
      localStorage.setItem('x-api-key', token)
    })
    .catch((err) => {
      // Wow what a nice logic // err will not console everytime while error occurs by user
      if (err.response.data.status === false) {
      } else {
        console.log(err)
      }

    })
};

export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};
