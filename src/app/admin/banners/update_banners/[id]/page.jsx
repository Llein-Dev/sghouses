"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
export default function UpdateBanner() {
    const router = useRouter();
    const { id } = useParams();
    const [title, setTitle] = useState("");  // chinh sua title
    const [content, setContent] = useState(""); // chinh sua content
    const [order, setOrder] = useState(""); // chinh sua orderr
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
            const response = await fetch(`http://localhost:8000/api/banner/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                setTitle(result.title); // Set tiêu đề từ API
                setContent(result.content); // Set tiêu đề từ API
                setOrder(result.order); // Set tiêu đề từ API
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
        formData.append("title", title);
        formData.append("content", content);
        formData.append("order", order);
        if (image) {
            formData.append("image", image); // Gửi file ảnh qua FormData
        }

        try {
            const response = await fetch(`http://localhost:8000/api/banner/update/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                toast.success('Khu vực đã cập nhật thành công!', {
                    onClose: () => {
                        router.push(`/admin/area`);
                    },
                });
            } else {
                const data = await response.json();
                toast.warning(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            setError("Không thể kết nối đến server, vui lòng thử lại sau.");
        }
    };

    const handleRefesh = () => {
        router.push('/admin/banners');
    }
    return (
        <>
            <div className="flex justify-end p-6">
                <Button onClick={handleRefesh} className="bg-blue-900 text-white hover:bg-blue-600">
                    <FileText className="mr-2 h-4 w-4" />
                    Trang biểu ngữ
                </Button>
            </div>
            <div className=" flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chỉnh sửa biểu ngữ</h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Thứ tự</label>
                            <input
                                type="text"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập tiêu đề"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Tiêu đề</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập tiêu đề"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Nội dung</label>
                            <textarea
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
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
            <ToastContainer autoClose={2000} />
        </>
    );
}
