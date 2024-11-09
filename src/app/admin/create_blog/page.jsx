"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("draft");
    const [description, setDescription] = useState("");
    const [cate_id, setCategory] = useState("");  // Changed to a text input for category
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminToken = Cookies.get("token");
        if (!adminToken) {
            alert("Vui lòng đăng nhập trước khi tạo blog!");
            router.push("/");
            return;
        }

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        const formData = {
            title,
            content,
            description,
            slug,
            cate_id,  // Category from text input
            image,
        };

        try {
            const response = await fetch("http://localhost:8000/api/blog/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data); // Log để xem chi tiết thông báo lỗi từ server

            if (response.ok) {
                setSuccessMessage("Blog đã được tạo thành công!");
            } else {
                setErrorMessage("Đã có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            setErrorMessage("Không thể kết nối đến server, vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                        <label className="block text-gray-600">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập slug"
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
                        <input
                            type="text"
                            value={cate_id}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập danh mục"
                            required
                        />
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
    );
}
