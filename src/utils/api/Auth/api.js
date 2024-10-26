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
        Cookies.set('token', response.data.token, { expires: 7 }); // Token sẽ hết hạn sau 7 ngày
        return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        // Kiểm tra xem có phản hồi từ server không
        if (error.response) {
            // Nếu có, lấy thông điệp lỗi từ phản hồi
            const errorMessage = error.response.data.message || 'Login failed. Please try again.';
            throw new Error(errorMessage);
        } else {
            // Nếu không có phản hồi, có thể do lỗi mạng
            throw new Error('Network error. Please try again later.');
        }
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
        if (error.response) {
            const errorMessage = error.response.data.message || 'Sign up failed. Please try again.';
            throw new Error(errorMessage);
        } else {
            throw new Error('Network error. Please try again later.');
        }
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

        throw error.response?.data?.message;

    }
};
