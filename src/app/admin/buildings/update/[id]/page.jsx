"use client";
import React, { useState, useEffect } from "react";
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

    // State lưu thông tin từ API
    const [id_area, setIdArea] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [utilities, setUtilities] = useState("");
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState("");
    const [imageOld, setImageOld] = useState([]); // Danh sách ảnh cũ từ API
    const [images, setImages] = useState([]); // Danh sách ảnh mới
    const [imageDelete, setImageDelete] = useState(''); // Danh sách ảnh cần xóa
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalFalse, setShowModalFalse] = useState(false);
    const [option, setOption] = useState([]);
    const [query, setQuery] = useState(""); // Initialize query state
    useEffect(() => {
        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }
        fetchBuildingData(adminToken);
        fetchDataOption();
    }, [id, router]);

    // fetch API Option
    const fetchDataOption = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/khu_vuc/option`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                setOption(result)
            } else if (response.status === 401) {
                setError("Không có quyền truy cập. Vui lòng đăng nhập lại.");
                router.push("/");
            } else {
                setError("Lỗi không xác định.");
            }
        } catch (err) {
            setError("Không thể truy cập dữ liệu.");
        }

    };


    // Hàm lấy dữ liệu chi tiết tòa nhà từ API
    const fetchBuildingData = async (token) => {
        try {
            const response = await fetch(`http://localhost:8000/api/toa-nha/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                // Tách danh sách ảnh từ chuỗi `image`
                const imagePaths = result.image.split(";").map(
                    (path) => `${path.trim()}`
                );
                setName(result.name || "");
                setIdArea(result.id_area || "");
                setUtilities(result.utilities || "");
                setLocation(result.location || "");
                setDescription(result.description || "");
                setImageOld(imagePaths); // Lưu danh sách ảnh cũ
            } else if (response.status === 401) {
                setError("Không có quyền truy cập. Vui lòng đăng nhập lại.");
                router.push("/");
            } else {
                setError("Lỗi không xác định.");
            }
        } catch (err) {
            setError("Không thể truy cập dữ liệu.");
        }

    };

    // Hàm xử lý chọn ảnh mới
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            id: URL.createObjectURL(file), // ID tạm thời
            preview: URL.createObjectURL(file),
            file,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]); // Thêm ảnh mới
    };

    // Hàm xóa ảnh mới
    const handleRemoveImage = (imageId) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
        // Chèn path ảnh cần xóa vào
        setImageDelete((prev) => prev + imageOld[imageId] + ';');
    };

    // Hàm xóa ảnh cũ
    const handleRemoveOldImage = (index) => {
        const removedImage = imageOld[index];
        setImageOld((prev) => prev.filter((_, i) => i !== index)); // Xóa khỏi danh sách hiển thị
        // Cập nhật danh sách ảnh cần xóa trong state imageDelete
        setImageDelete((prev) => prev + removedImage + ';');
    };
    // Hàm xử lý khi gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }

        const formData = new FormData();
        formData.append("id_area", id_area);
        formData.append("utilities", utilities);
        formData.append("location", location);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image_delete", imageDelete);

        // Gửi danh sách ảnh mới
        images.forEach((image) => formData.append("image[]", image.file));

        try {
            const response = await fetch(`http://localhost:8000/api/toa-nha/edit/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowModal(true); // Hiện thông báo khi submit
            } else {
                const data = await response.json();
                setError(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            setShowModalFalse(true); // Hiện thông báo khi submit
        }
    };

    const handleRemoveUtility = (utilityToRemove) => {
        setUtilities(
            utilities
                .split(";") // Tách chuỗi thành mảng
                .filter((utility) => utility.trim() !== utilityToRemove.trim()) // Loại bỏ phần tử muốn xóa
                .join(";") // Chuyển lại thành chuỗi
        );
    };
    // Handle adding a utility
    const handleAddUtility = () => {
        if (query.trim() !== "") {
            // Add the new utility, ensuring utilities is always a string
            setUtilities((prev) => {
                const updatedUtilities = prev ? `${prev};${query.trim()}` : query.trim(); // Concatenate with semicolon if there's already a value
                return updatedUtilities;
            });
            setQuery(""); // Reset input field after adding the utility
        }
    };

    const handleAddLocation = () => {
        if (locations.trim() !== "") {
            setLocation((prev) => {
                const updatedLocation = prev ? `${prev};${locations.trim()}` : locations.trim(); // Concatenate with semicolon if there's already a value
                return updatedLocation;
            });
            setLocations(""); // Reset input field after adding the utility
        }
    };
    const handleRemoveLocation = (locationToRemove) => {
        setLocation(
            location
                .split(";") // Tách chuỗi thành mảng
                .filter((loc) => loc.trim() !== locationToRemove.trim()) // Loại bỏ phần tử muốn xóa
                .join(";") // Chuyển lại thành chuỗi
        );
    };

    const handleChangeReturn = () => {
        router.push('/admin/buildings')
    }

    return (    
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chỉnh sửa tòa nhà</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-gray-600">Chọn khu vực</label>
                        <select
                            value={id_area}
                            onChange={(e) => setIdArea(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        >
                            {
                                option.map((options) => (
                                    <option value={options.id}>{options.name}</option>
                                )
                                )
                            }


                            {/* Thêm các option khác tùy ý */}
                        </select>

                    </div>
                    <div>
                        <label className="block text-gray-600">Tên tòa nhà</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tiêu đề"
                            required
                        />
                    </div>
                    <label className="block text-gray-600"> Tiện ích chung</label>
                    <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                        {utilities.split(";").map((utility, index) => (
                            <div
                                key={index}
                                className="bg-blue-900 text-white px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {utility.trim()}
                                <button
                                    type="button"
                                    className="text-white hover:text-gray-300"
                                    onClick={() => handleRemoveUtility(utility)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)} // Cập nhật query khi người dùng nhập
                            placeholder="Thêm hoặc tìm tiện ích"
                            className="w-full p-2 border border-gray-300 rounded"
                        // onFocus={() => setMenuOpen(true)}
                        // onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                        />
                        <button
                            type="button"
                            onClick={handleAddUtility} // Thêm tiện ích khi nhấn nút
                            className="bg-blue-900 text-white px-3 py-2 rounded"
                            disabled={query.trim() === ""}
                        >
                            Thêm
                        </button>
                    </div>

                    <label className="block text-gray-600"> Vị trí tiện ích</label>
                    <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                        {location.split(";").map((loc, index) => (
                            <div
                                key={index}
                                className="bg-blue-900 text-white px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {loc}
                                <button
                                    type="button"
                                    className="text-white hover:text-gray-300"
                                    onClick={() => handleRemoveLocation(loc)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            value={locations}
                            onChange={(e) => setLocations(e.target.value)} // Cập nhật query khi người dùng nhập
                            placeholder="Thêm hoặc tìm tiện ích"
                            className="w-full p-2 border border-gray-300 rounded"
                        // onFocus={() => setMenuOpen(true)}
                        // onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                        />
                        <button
                            type="button"
                            onClick={handleAddLocation} // Thêm tiện ích khi nhấn nút
                            className="bg-blue-900 text-white px-3 py-2 rounded"
                            disabled={locations.trim() === ""}
                        >
                            Thêm
                        </button>
                    </div>



                    {/* Ảnh hiện tại */}
                    <div>
                        <h4 className="text-gray-600 mt-4">Ảnh Cũ:</h4>
                        <div className="grid grid-cols-4 gap-4">
                            {imageOld.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={`http://localhost:8000/storage/${image}`}
                                        alt={`Ảnh cũ ${index + 1}`}
                                        className="w-full h-32 object-cover rounded shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveOldImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ảnh mới */}
                    <div>
                        <h4 className="text-gray-600 mt-4">Ảnh mới:</h4>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((image) => (
                                <div key={image.id} className="relative group">
                                    <img
                                        src={image.preview}
                                        alt="Ảnh mới"
                                        className="w-full h-32 object-cover rounded shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(image.id)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-2"
                        />
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
                        className="w-full p-2 rounded bg-blue-900 hover:bg-blue-700 text-white transition"
                    >
                        Cập nhật tòa nhà
                    </button>
                </form>


                {/* Modal thông báo */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <h2 className="text-2xl font-bold text-green-600">Thành công!</h2>
                            <p className="text-gray-700">Tòa nhà đã được cập nhật thành công.</p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Đóng
                                </button>
                                <button
                                    onClick={handleChangeReturn}
                                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Quay về tòa nhà
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal thông báo lỗi */}
                {showModalFalse && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <h2 className="text-lg font-bold text-red-600">Thông báo!</h2>
                            <p className="text-gray-700">có vấn đề rồi hãy nhập lại !</p>
                            <button
                                onClick={() => setShowModalFalse(false)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Đóng
                            </button>

                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}
