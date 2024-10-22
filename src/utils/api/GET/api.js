
import { useState, useEffect } from 'react';

export const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/khu_vuc/listHot');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data); // Cập nhật state với dữ liệu từ API
            } catch (error) {
                setError(error.message); // Set error nếu có lỗi
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn thành
            }
        };

        fetchCategories(); // Gọi hàm fetch khi component mount
    }, []);

    return { categories, loading, error }; // Trả về categories, loading, error
};

