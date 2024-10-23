import { useState, useEffect } from 'react';


// -------------------- Fetch Categories
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


export const useFetchFeaturedHouse = () => {
    const [featuredHouse, setFeaturedHouse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedHouse = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/toa-nha/listHot');
                if (!response.ok) {
                    throw new Error('Lỗi khi fetch dữ liệu tòa nhà nổi bật');
                }
                const data = await response.json();
                setFeaturedHouse(data.data); // Cập nhật state với dữ liệu từ thuộc tính 'data'
            } catch (error) {
                setError(error.message); // Set error nếu có lỗi
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn thành
            }
        };

        fetchFeaturedHouse();
    }, []);

    return { featuredHouse, loading, error };
};



// ------------- Fetch Cheap House (tòa nhà giá rẻ)
export const useFetchCheapHouse = () => {
    const [CheapHouse, setCheapHouse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCheapHouse = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/toa-nha/listView');
                if (!response.ok) {
                    throw new Error('Lỗi khi fetch dữ liệu tòa nhà giá rẻ');
                }
                const data = await response.json();
                setCheapHouse(data.data); // Cập nhật state với dữ liệu từ thuộc tính 'data'
            } catch (error) {
                setError(error.message); // Set error nếu có lỗi
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn thành
            }
        };

        fetchCheapHouse();
    }, []);

    return { CheapHouse, loading, error };
};
