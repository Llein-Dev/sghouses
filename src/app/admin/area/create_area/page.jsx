"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CreateArea() {
    const [name, setTitle] = useState("");
    const [image, setImage] = useState(null); // Giữ nguyên file ảnh thay vì mã hóa
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
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
            alert("Vui lòng đăng nhập trước khi tạo blog!");
            router.push("/");
            return;
        }

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        // Sử dụng FormData để gửi file ảnh
        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("image", image); // Đính kèm file ảnh
        }

        try {
            const adminToken = Cookies.get("token");
            const response = await fetch("http://localhost:8000/api/khu-vuc/add", {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tạo Khu Vực Mới</h2>

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
