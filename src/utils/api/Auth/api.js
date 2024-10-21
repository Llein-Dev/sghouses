import axios from 'axios';
import Cookies from 'js-cookie';

// Base URL of your backend
const API_BASE_URL = 'http://localhost:3000'; // Change to your actual backend URL

// Function for user login
export const loginAPI = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login`, {
            email,
            password,
        });

        // Store the token in cookies
        Cookies.set('token', response.data.token, { expires: 7 }); // Token will expire in 7 days
        return response.data; // Return the response data (optional)
    } catch (error) {
        throw error.response?.data?.message || 'Login failed. Please try again.';
    }
};

// Function for user signup
export const signupAPI = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, {
            name,
            email,
            password,
        });

        // Store the token in cookies
        Cookies.set('token', response.data.token, { expires: 7 }); // Token will expire in 7 days
        return response.data; // Return the response data (optional)
    } catch (error) {
        throw error.response?.data?.message || 'Signup failed. Please try again.';
    }
};
