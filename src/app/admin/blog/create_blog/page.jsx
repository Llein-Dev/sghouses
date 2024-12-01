"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null); // Giữ nguyên file ảnh thay vì mã hóa
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("draft");
    const [description, setDescription] = useState("");
    const [cate_id, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    // Cập nhật hàm handleImageChange để lưu file thay vì mã hóa base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file ? file : null);
    };

    // Hàm submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminToken = Cookies.get("token");
        if (!adminToken) {
            toast.warning('vui lòng đăng nhập trước khi tạo blog !')
            router.push("/");
            return;
        }

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        // Sử dụng FormData để gửi file ảnh
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("description", description);
        formData.append("slug", slug);
        formData.append("cate_id", cate_id);
        if (image) {
            formData.append("image", image); // Đính kèm file ảnh
        }

        try {
            const response = await fetch("http://localhost:8000/api/blog/add", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
                body: formData, // Gửi FormData thay vì JSON
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setSuccessMessage("Blog đã được tạo thành công!");
            } else {
                setErrorMessage(data.message || "Đã có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            setErrorMessage("Không thể kết nối đến server, vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tạo Blog Mới</h2>

                    {successMessage && (
                        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <label className="block text-gray-600">Ảnh</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                accept="image/*"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600">Nội dung</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                rows="5"
                                placeholder="Nhập nội dung bài viết"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-600">Đường dẫn</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập đường dẫn"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600">Mô tả</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                rows="3"
                                placeholder="Nhập mô tả ngắn"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-600">Danh mục</label>
                            <select
                                value={cate_id}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                required
                            >
                                <option value="" disabled>
                                    Chọn danh mục
                                </option>
                                <option value="1">Danh mục 1</option>
                                {/* Thêm các danh mục khác tại đây */}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white transition`}
                        >
                            {loading ? "Đang tạo..." : "Thêm Blog"}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
