"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

export default function UpdateBlog() {
    const router = useRouter();
    const { id } = useParams();
    const [name, setTitle] = useState("");
    const [image, setImage] = useState(null); // Lưu trữ file ảnh
    const [imagePreview, setImagePreview] = useState(""); // Hiển thị ảnh preview
    const [error, setError] = useState("");

    useEffect(() => {
        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }
        fetchBlogDetails(adminToken);
    }, [id, router]);

    const fetchBlogDetails = async (token) => {
        try {
            const response = await fetch(`http://localhost:8000/api/khu-vuc/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                setTitle(result.name); // Set tiêu đề từ API
                setImagePreview(result.image); // Hiển thị ảnh hiện tại
            } else if (response.status === 401) {
                setError("Không có quyền truy cập. Vui lòng đăng nhập lại.");
                router.push("/");
            } else {
                setError("Lỗi không xác định.");
            }
        } catch (error) {
            setError("Không thể truy cập dữ liệu.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Lưu trữ file ảnh mới
            setImagePreview(URL.createObjectURL(file)); // Hiển thị preview ảnh mới
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("image", image); // Gửi file ảnh qua FormData
        }

        try {
            const response = await fetch(`http://localhost:8000/api/khu-vuc/edit/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert("Blog đã được cập nhật thành công!");
                router.push(`/admin/area`);
            } else {
                const data = await response.json();
                setError(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            setError("Không thể kết nối đến server, vui lòng thử lại sau.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chỉnh sửa Blog</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600">Tiêu đề</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tiêu đề"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600">Ảnh</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            accept="image/*"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={
                                        imagePreview.startsWith("blob:") 
                                            ? imagePreview // Hiển thị preview ảnh mới
                                            : `http://localhost:8000/storage/${imagePreview}` // Hiển thị ảnh hiện tại
                                    }
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                        Cập nhật khu vực
                    </button>
                </form>
            </div>
        </div>
    );
}
