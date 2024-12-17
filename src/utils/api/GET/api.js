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
                const response = await fetch('http://localhost:8000/api/toa-nha/listCheap');
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

// -------------- Fetch House nhiều lượt xem nhất
export const useFetchViewHouse = () => {
    const [ViewHouse, setViewHouse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchViewHouse = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/toa-nha/listView');
                if (!response.ok) {
                    throw new Error('Lỗi khi fetch dữ liệu tòa nhà giá rẻ');
                }
                const data = await response.json();
                setViewHouse(data.data); // Cập nhật state với dữ liệu từ thuộc tính 'data'
            } catch (error) {
                setError(error.message); // Set error nếu có lỗi
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn thành
            }
        };

        fetchViewHouse();
    }, []);

    return { ViewHouse, loading, error };
};


export const useFetchBlogHouse = () => {
    const [BlogHouse, setBlogHouse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogHouse = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/blog/all");
                if (!response.ok) {
                    throw new Error("Lỗi khi fetch dữ liệu blog.");
                }
                const data = await response.json();
                setBlogHouse(Array.isArray(data) ? data : []); // Đảm bảo BlogHouse luôn là mảng
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogHouse();
    }, []);

    return { BlogHouse, loading, error };
};


// Custom hook để fetch dữ liệu chi tiết tòa nhà
const useBuildingDetails = (slug) => {
    const [building, setBuilding] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuildingDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/chi-tiet/?slug=${slug}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch building details");
                }
                const data = await response.json();
                setBuilding(data);
            } catch (err) {
                setError(err);
                console.error("Error fetching building data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBuildingDetails();
        }
    }, [slug]);

    return { building, loading, error };
};

export default useBuildingDetails;


export const useFetchDetailBlog = (slug) => {
    const [detailBlog, setDetailBlog] = useState([]);
    const [err, setErr] = useState(null)
    useEffect(() => {
        const fetchDetailBlog = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/blog/?slug=${slug}`)
                if (!response.ok) {
                    throw new Error('lỗi khi kết nối với api Detail Blog')
                }
                const data = await response.json();
                setDetailBlog(data);
            } catch (err) {
                setErr(err.message || 'lỗi không thể phát hiện hàm fetchDetailBlog')
            }
        }
        fetchDetailBlog();
    }, [slug]);

    return { detailBlog, err }
}