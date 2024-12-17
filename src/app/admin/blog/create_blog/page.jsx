"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";
// Import React Quill với tính năng hỗ trợ đầy đủ công cụ
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import 
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
export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null); // Giữ nguyên file ảnh thay vì mã hóa
    const [imagePreview, setImagePreview] = useState(null); // Dùng để lưu URL của ảnh chọn
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [cate_id, setCategory] = useState("");
    const [cataBlog, setCataBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const fetchOptionBlog = async () => { // fetch danh mục trong bài viết
        const adminToken = Cookies.get('token');
        try {
            const response = await fetch(`http://localhost:8000/api/cate_blog`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
            });
            if (response.ok) {
                const result = await response.json();
                setCataBlog(result.list_cate_blog || []);
            } else {
                setError('Không có quyền truy cập');
            }
        } catch (error) {
            setError('Không thể truy cập dữ liệu');
        }
    }

    useEffect(() => {
        const adminToken = Cookies.get('token');
        if (!adminToken) {
            router.push('/');
            return;
        }
        fetchOptionBlog();
    }, [router]);

    // Cập nhật hàm handleImageChange để lưu file và tạo preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Tạo URL tạm cho file ảnh
        } else {
            setImage(null);
            setImagePreview(null); // Xóa preview nếu không có ảnh
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminToken = Cookies.get("token");
        if (!adminToken) {
            toast.warning('Vui lòng đăng nhập trước khi tạo blog !')
            router.push("/");
            return;
        }

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("description", description);
        formData.append("cate_id", cate_id);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch("http://localhost:8000/api/blog/add", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
                body: formData,
            });

                const contentType = response.headers.get("Content-Type");
                let errorMessage;
            if (response.ok) {
                toast.success("Bài viết đã được tạo thành công!");
            } else {
                if (contentType.includes("application/json")) {
                    const data = await response.json();
                    errorMessage = data.message || "Đã xảy ra lỗi, vui lòng thử lại!";
                } else {
                    errorMessage = await response.text(); // Nếu là chuỗi thuần
                }
                toast.error(`Lỗi: ${errorMessage}`); // Hiển thị toàn bộ chuỗi
            }
        } catch (error) {
            toast.error("Không thể kết nối đến server, vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreatPage = () => {
        router.push('/admin/blog');
    }

    return (
        <>
            <div className="flex justify-end p-6">
                <Button onClick={handleCreatPage} className="bg-blue-900 text-white hover:bg-blue-600">
                    <FileText className="mr-2 h-4 w-4" />
                    Trang tin tức
                </Button>
            </div>
            <div className="flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tạo bài viết mới</h2>

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
                                    <img src={imagePreview} alt="Image Preview" className="h-32 rounded" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-600">Nội dung</label>
                            <ReactQuill
                                value={content}
                                onChange={setContent}
                                modules={modules} // Sử dụng cấu hình module với toolbar đầy đủ
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                rows="5"
                                placeholder="Nhập nội dung bài viết"

                            ></ReactQuill>
                        </div>
                        <div>
                            <label className="block text-gray-600">Mô tả</label>
                            <ReactQuill
                                value={description}
                                onChange={setDescription}
                                modules={modules} // Sử dụng cấu hình module với toolbar đầy đủ
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                rows="3"
                                placeholder="Nhập mô tả ngắn"

                            ></ReactQuill>
                        </div>

                        <div>
                            <label className="block text-gray-700">Danh mục</label>
                            <select
                                value={cate_id}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"

                            >
                                <option value="" disabled>
                                    Chọn danh mục
                                </option>
                                {cataBlog.map((cateblog, index) => (
                                    <option key={index} value={cateblog.id}>
                                        {cateblog.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-900 hover:bg-blue-700"} text-white transition`}
                        >
                            {loading ? "Đang tạo..." : "Thêm bài viết"}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
