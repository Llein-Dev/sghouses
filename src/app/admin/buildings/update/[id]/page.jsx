"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Import React Quill với tính năng hỗ trợ đầy đủ công cụ
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import CSS mặc định của Quill

// Cấu hình toolbar cho Quill với đầy đủ công cụ
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }], // Các cấp độ tiêu đề và font
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Danh sách có thứ tự và không có thứ tự
        ['bold', 'italic', 'underline', 'strike'], // In đậm, in nghiêng, gạch dưới, gạch ngang
        [{ 'align': [] }], // Căn chỉnh
        [{ 'color': [] }, { 'background': [] }], // Chọn màu chữ và nền
        [{ 'script': 'sub' }, { 'script': 'super' }], // Chỉ số trên, chỉ số dưới
        ['link', 'image'], // Thêm link và ảnh
        ['blockquote', 'code-block'], // Trích dẫn và khối mã
        ['clean'], // Xóa định dạng
    ],
};

// Hàm chính của component
export default function UpdateBuilding() {
    const router = useRouter();
    const { id } = useParams();
    const [name, setTen] = useState("");
    const [description, setDescription] = useState("");
    const [image, setCurrentImage] = useState("");
    const [imageBase64, setImageBase64] = useState(""); // Thêm state cho Base64
    const [error, setError] = useState("");

    useEffect(() => {
        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }
        fetchDataBlog(adminToken);
    }, [id, router]);

    const fetchDataBlog = async (token) => {
        try {
            const response = await fetch(`http://localhost:8000/api/toa-nha/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const result = await response.json();
                setTen(result.name);
                setDescription(result.description);
                setCurrentImage(result.image);
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
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
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

        const formData = {
            name,
            description,
            image: imageBase64, // Gửi chuỗi Base64 thay vì file gốc
        };

        try {
            const response = await fetch(`http://localhost:8000/api/toa-nha/edit/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Blog đã được cập nhật thành công!");
                router.push(`/admin/buildings`);
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
                            onChange={(e) => setTen(e.target.value)}
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
                        {imageBase64 && (
                            <img  src={imageBase64} alt="Ảnh hiện tại" className="mt-4 w-32 h-32 object-cover" />
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600">Nội dung</label>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            modules={modules} // Sử dụng cấu hình module với toolbar đầy đủ
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập nội dung bài viết"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                        Cập nhật Blog
                    </button>
                    cập nhật nè
                </form>
            </div>
        </div>
    );
}
