import axios from 'axios';
import Cookies from 'js-cookie';

// Base URL of your backend
const API_BASE_URL = 'http://localhost:8000'; // Change to your actual backend URL

// Function for user login
export const loginAPI = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login`, {
            email,
            password,
        });
        Cookies.set('token', response.data.token, { expires: 7 }); // Token will expire in 7 days
        return response.data; // Return the response data (optional)
    } catch (error) {
        throw error.message;
    }
};

export const signupAPI = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, {
            name,
            email,
            password,
        });
        Cookies.set('token', response.data.token, { expires: 7 }); // Token will expire in 7 days
        return response.data; // Return the response data (optional)
    } catch (error) {
        // Log detailed error information
        console.error('Signup error:', error.response);
        throw error.message ;
    }
};
    

// Function for fetching user profile
export const profileAPI = async () => {
    const token = Cookies.get('token');
    try {
        // Send a GET request with token in header
        const response = await axios.get(`${API_BASE_URL}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token via Authorization header
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error.message ;
    }
};
