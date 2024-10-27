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
        return response.data; // Return response data
    } catch (error) {
        handleApiError(error, 'Login failed. Please try again.');
    }
};

export const signupAPI = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Sign up failed. Please try again.');
    }
};

// Function for fetching user profile
export const profileAPI = async () => {
    const token = Cookies.get('token');
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to fetch profile.');
    }
};

export const updateAvatar = async (formData) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.post(`${API_BASE_URL}/api/updateAvatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to update avatar.');
    }
};

export const updateProfile = async (data) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.put(`${API_BASE_URL}/api/updateProfile`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Failed to update profile.');
    }
};

// Centralized error handling function
const handleApiError = (error, defaultMessage) => {
    if (error.response) {
        const errorMessage = error.response.data.message || defaultMessage;
        throw new Error(errorMessage);
    } else {
        throw new Error('Network error. Please try again later.');
    }
};
