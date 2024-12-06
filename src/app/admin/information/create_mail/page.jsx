"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateMail() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    // Hàm submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminToken = Cookies.get("token");
        if (!adminToken) {
            toast.error("vui lòng đăng nhập trước khi tạo khu vực !"); // Thông báo lỗi    
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
        try {
            const adminToken = Cookies.get("token");
            const response = await fetch("http://localhost:8000/api/dang-ky-nhan-tin/gui-mail", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
                body: formData, // Gửi FormData thay vì JSON
            });

            const data = await response.json();
            console.log(data);
            const contentType = response.headers.get("Content-Type");
            let errorMessage;
        
        
              if (response.ok) {
                toast.success('tạo tòa nhà thành công !')
           
              }else {
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

    return (
        <>

            <div className=" flex items-center justify-center bg-gray-100 p-6">
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập tiêu đề"
                                
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
                                
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-900 hover:bg-blue-700"} text-white transition`}
                        >
                            {loading ? "Đang tạo..." : "Thêm Email"}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
