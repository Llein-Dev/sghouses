"use client";
    import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
// Hàm chính của component
export default function UpdateRoom() {
    const router = useRouter();
    const { id } = useParams();

    // State lưu thông tin từ API
    const [name, setName] = useState("");  // cần sửa nhưng không thây đổi
    const [tien_ich, setUtilities] = useState(""); // cần sửa thành tien_ich
    const [dien_tich, setDienTich] = useState(""); // cần sửa thành dien_tich
    const [imageOld, setImageOld] = useState([]); // Danh sách ảnh cũ từ API
    const [images, setImages] = useState([]); // Danh sách ảnh mới
    const [imageDelete, setImageDelete] = useState(''); // Danh sách ảnh cần xóa
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalFalse, setShowModalFalse] = useState(false);
    useEffect(() => {
        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }
        fetchRoomData(adminToken);
    }, [id, router]);

  

    // Hàm lấy dữ liệu chi tiết tòa nhà từ API
    const fetchRoomData = async (token) => {
        try {
            const response = await fetch(`http://localhost:8000/api/phong/${id}`, {
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
                console.log(result); // Kiểm tra dữ liệu ảnh cũ

                setName(result.name || "");
                setUtilities(result.tien_ich || "");
                setDienTich(result.dien_tich || "");
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
        formData.append("tien_ich", tien_ich);
        formData.append("dien_tich", dien_tich);
        formData.append("name", name);
        formData.append("image_delete", imageDelete);

        // Gửi danh sách ảnh mới
        images.forEach((image) => formData.append("image[]", image.file));

        try {
            const response = await fetch(`http://localhost:8000/api/phong/edit/${id}`, {
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

const handleChangeReturn = () =>{
    router.push('/admin/room')
}

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chỉnh sửa tòa nhà</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">

                 
                    <div>
                        <label className="block text-gray-600">Tên Phòng</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tiêu đề"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Tiện ích</label>
                        <input
                            type="text"
                            value={tien_ich}
                            onChange={(e) => setUtilities(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tiêu đề"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Diện tích</label>
                        <input
                            type="text"
                            value={dien_tich}
                            onChange={(e) => setDienTich(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tiêu đề"
                            required
                        />
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
                        Quay về Phòng
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
