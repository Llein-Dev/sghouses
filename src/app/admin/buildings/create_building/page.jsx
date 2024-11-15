"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
    const [name, setTen] = useState("");
    const [images, setImages] = useState([]);
    const [utilities, setTienIch] = useState("");
    const [slug, setSlug] = useState("draft");
    const [description, setMoTa] = useState("");
    const [location, setViTri] = useState("");
    const [id_area, setKhuVuc] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSlugAutoGenerate = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    const handleTenChange = (e) => {
        const value = e.target.value;
        setTen(value);
        if (!slug || slug === "draft") {
            setSlug(handleSlugAutoGenerate(value));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validImages = files.filter((file) => file.type.startsWith("image/"));

        if (validImages.length > 0) {
            setImages((prev) => [...prev, ...validImages]);
        } else {
            alert("Vui lòng chọn file ảnh hợp lệ!");
        }
    };

    useEffect(() => {
        if (successMessage || errorMessage) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [successMessage, errorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        const adminToken = Cookies.get("token");
        if (!adminToken) {
            alert("Vui lòng đăng nhập trước khi tạo blog!");
            router.push("/");
            return;
        }

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("utilities", utilities);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("id_area", id_area);
        images.forEach((image) => {
            formData.append("images[]", image);
        });

        try {
            const response = await fetch("http://localhost:8000/api/toa-nha/add", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Tòa nhà đã được tạo thành công!");
                setTen("");
                setImages([]);
                setTienIch("");
                setSlug("draft");
                setMoTa("");
                setViTri("");
                setKhuVuc("");
            } else if (response.status === 401) {
                Cookies.remove("token");
                alert("Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại.");
                router.push("/");
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
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tạo Tòa Nhà Mới</h2>

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
                        <label className="block text-gray-600">Tên tòa nhà</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleTenChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tên tòa nhà"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Ảnh</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            accept="image/*"
                            multiple
                        />
                    </div>
                    <div>
                        <h4 className="text-gray-600 mt-4">Ảnh đã chọn:</h4>
                        {images.length > 0 ? (
                            <ul>
                                {images.map((image, index) => (
                                    <li key={index} className="text-gray-800">
                                        {image.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Chưa chọn ảnh nào.</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-600">Tiện ích</label>
                        <textarea
                            value={utilities}
                            onChange={(e) => setTienIch(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            rows="3"
                            placeholder="Nhập tiện ích"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-600">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Mô tả</label>
                        <textarea
                            value={description}
                            onChange={(e) => setMoTa(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            rows="3"
                            placeholder="Nhập mô tả"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-600">Vị trí</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setViTri(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập vị trí"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Khu vực</label>
                        <input
                            type="text"
                            value={id_area}
                            onChange={(e) => setKhuVuc(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập khu vực"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-blue-600 text-white rounded mt-4 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Tạo Tòa Nhà"}
                    </button>
                </form>
            </div>
        </div>
    );
}
