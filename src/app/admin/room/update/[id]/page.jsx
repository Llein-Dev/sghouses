"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
// Hàm chính của component
export default function UpdateRoom() {
    const router = useRouter();
    const { id } = useParams();

    // State lưu thông tin từ API
    const [id_building, setIDToaNha] = useState("")
    const [name, setName] = useState("");  // cần sửa nhưng không thây đổi
    const [gac_lung, setGacLung] = useState([])
    const [tien_ich, setUtilities] = useState(""); // cần sửa thành tien_ich
    const [noi_that, setNoiThat] = useState(""); // cần sửa thành noi_that
    const [dien_tich, setDienTich] = useState(""); // cần sửa thành dien_tich
    const [imageOld, setImageOld] = useState([]); // Danh sách ảnh cũ từ API
    const [images, setImages] = useState([]); // Danh sách ảnh mới
    const [imageDelete, setImageDelete] = useState(''); // Danh sách ảnh cần xóa
    const [optionToaNha, setOptionToaNha] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalFalse, setShowModalFalse] = useState(false);
    const [query, setQuery] = useState(""); // Initialize query state
    const [queryNoiThat, setQueryNoiThat] = useState(""); // Initialize query state
    
    const handleRemoveUtility = (utilityToRemove) => {
        setUtilities(
            tien_ich
                .split(";") // Tách chuỗi thành mảng
                .filter((utility) => utility.trim() !== utilityToRemove.trim()) // Loại bỏ phần tử muốn xóa
                .join(";") // Chuyển lại thành chuỗi
        );
    };
    const handleRemoveNoiThat = (noiThatToRemove) => {
        setNoiThat(
            noi_that
                .split(";") // Tách chuỗi thành mảng
                .filter((noiThat) => noiThat.trim() !== noiThatToRemove.trim()) // Loại bỏ phần tử muốn xóa
                .join(";") // Chuyển lại thành chuỗi
        );
    };
    

      const handleAddUtility = () => {
        if (query.trim() !== "") {
            // Add the new utility, ensuring utilities is always a string
            setUtilities((prev) => {
                const updatedUtilities = prev ? `${prev};${query.trim()}` : query.trim(); // Concatenate with semicolon if there's already a value
                return updatedUtilities;
            });
            setQuery(""); // Reset input field after adding the utility
        }
    };     // Handle adding a utility
      const handleAddNoiThat = () => {
        if (queryNoiThat.trim() !== "") {
            // Add the new utility, ensuring utilities is always a string
            setNoiThat((prev) => {
                const updatedNoiThat = prev ? `${prev};${queryNoiThat.trim()}` : queryNoiThat.trim(); // Concatenate with semicolon if there's already a value
                return updatedNoiThat;
            });
            setQueryNoiThat(""); // Reset input field after adding the utility
        }
    };     // Handle adding a utility
 
    
    useEffect(() => {
        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }
        fetchRoomDetail(adminToken);
    }, [id, router]);

    useEffect(() => {

        fetchDataOption();
    }, []);

    const fetchDataOption = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/toa-nha/option`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                setOptionToaNha(result)
                console.log(result)
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
    const fetchRoomDetail = async (token) => {
        try {
            const response = await fetch(`http://localhost:8000/api/phong/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const result = await response.json();
                console.log(result)
                setImageOld(result.image ? result.image.split(";") : []);
                setIDToaNha(result.id_building || "");
                setName(result.name || "");
                setGacLung(result.gac_lung || "");
                setUtilities(result.tien_ich || "");
                setNoiThat(result.noi_that || "");
                setDienTich(result.dien_tich || "");
            } else if (response.status === 401) {
                setError("Không có quyền truy cập. Vui lòng đăng nhập lại.");
                router.push("/");
            } else {
                setError("Lỗi không xác định.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
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
        console.log("Data being submitted:", {
            name,
            id_building,
            gac_lung,
            tien_ich,
            noi_that,
            dien_tich,
            imageDelete
        });
        const adminToken = Cookies.get("token");
        if (!adminToken) {
            setError("Bạn cần đăng nhập để thực hiện thao tác này.");
            router.push("/");
            return;
        }

        const formData = new FormData();
        formData.append("id_building", id_building);
        formData.append("name", name);
        formData.append("gac_lung", gac_lung);
        formData.append("tien_ich", tien_ich);
        formData.append("dien_tich", dien_tich);
        formData.append("noi_that", noi_that);
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
            const contentType = response.headers.get("Content-Type");
            let errorMessage;
        
            if (response.ok) {
                setShowModal(true); // Hiện thông báo khi submit
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
            setShowModalFalse(true); // Hiện thông báo khi submit
        }
    };



    const handleChangeReturn = () => {
        router.push('/admin/room')
    }
    const handleCreatPage = () => {
        router.push('/admin/room');
      }
    return (
        <>
        <div className="flex justify-end p-6">
        <Button onClick={handleCreatPage} className="bg-blue-900 text-white hover:bg-blue-600">
          <FileText className="mr-2 h-4 w-4" />
          Danh sách phòng
        </Button>
      </div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chỉnh sửa phòng</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600">ID tòa nhà</label>
                        <select
                            value={id_building}
                            onChange={(e) => setIDToaNha(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        >
                            {
                                optionToaNha.map((option) => (
                                    <option value={option.id}>{option.name}</option>
                                )
                                )
                            }
                            {/* Thêm các tòa nhà khác nếu cần */}
                        </select>
                    </div>
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
                    <div className="grid grid-cols-3 gap-4">
                        {/* Cột 1: Gác Lửng */}
                        <div className="col-span-1">
                            <label className="block text-gray-600">Gác Lửng</label>
                            <div className="flex items-center space-x-4 mt-2">
                                <label
                                    className={`flex items-center space-x-2 p-2 rounded ${gac_lung === "0" ? "bg-red-200 text-red-800" : "bg-gray-100"}`}
                                >
                                    <input
                                        type="radio"
                                        name="gac_lung"
                                        value="0"
                                        checked={gac_lung == 0}
                                        onChange={(e) => setGacLung(e.target.value)}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span>Không</span>
                                </label>
                                <label
                                    className={`flex items-center space-x-2 p-2 rounded ${gac_lung === "1" ? "bg-green-200 text-green-800" : "bg-gray-100"}`}
                                >
                                    <input
                                        type="radio"
                                        name="gac_lung"
                                        value="1"
                                        checked={gac_lung == 1}
                                        onChange={(e) => setGacLung(e.target.value)}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span>Có</span>
                                </label>
                            </div>
                        </div>

                        {/* Cột 2 và 3: Diện Tích */}
                        <div className="col-span-2">
                            <label className="block text-gray-600">Diện tích</label>
                            <div className="flex items-center border border-gray-300 rounded p-2 mt-1">
                                <input
                                    type="text"
                                    value={dien_tich}
                                    onChange={(e) => setDienTich(e.target.value)}
                                    className="flex-grow p-1 outline-none"
                                    placeholder="Nhập diện tích"
                                    required
                                />
                                <span className="ml-2 text-gray-500">m²</span>
                            </div>
                        </div>
                    </div>

                    <label className="block text-gray-600"> Tiện ích chung</label>
                    <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                        {tien_ich.split(";").map((utility, index) => (
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

                    <label className="block text-gray-600"> Nội thất</label>
                    <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                        {noi_that.split(";").map((noiThat, index) => (
                            <div
                                key={index}
                                className="bg-blue-900 text-white px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {noiThat.trim()}
                                <button
                                    type="button"
                                    className="text-white hover:text-gray-300"
                                    onClick={() => handleRemoveNoiThat(noiThat)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            value={queryNoiThat}
                            onChange={(e) => setQueryNoiThat(e.target.value)} // Cập nhật queryNoiThat khi người dùng nhập
                            placeholder="Thêm hoặc tìm tiện ích"
                            className="w-full p-2 border border-gray-300 rounded"
                        // onFocus={() => setMenuOpen(true)}
                        // onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                        />
                        <button
                            type="button"
                            onClick={handleAddNoiThat} // Thêm tiện ích khi nhấn nút
                            className="bg-blue-900 text-white px-3 py-2 rounded"
                            disabled={queryNoiThat.trim() === ""}
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
                                        src={`${process.env.NEXT_PUBLIC_PATH_FILE}${image}`}
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
        </>
    );
}
