"use client";

import { useState, useEffect ,useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const [name, setTen] = useState("");
  const [images, setImages] = useState([]);
  const [utilities, setTienIch] = useState([]); // Mảng tiện ích
  const [description, setMoTa] = useState("");
  const [location, setViTri] = useState("");
  const [id_area, setKhuVuc] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const tags = [
    "Wifi miễn phí",
    "Bảo vệ 24/7",
    "Hồ bơi",
    "Phòng gym",
    "Thang máy",
    "Căn hộ tiện nghi",
  ];

  // Lọc tiện ích dựa vào từ khóa
  const filteredTags = tags.filter(
    (item) =>
      item.toLowerCase().includes(query.toLowerCase().trim()) &&
      !utilities.includes(item)
  );

  const isDisable =
    !query.trim() ||
    utilities.some(
      (item) => item.toLowerCase().trim() === query.toLowerCase().trim()
    );

  const handleRemoveUtility = (tag) => {
    setTienIch(utilities.filter((item) => item !== tag));
  };

 
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));
  
    if (validImages.length > 0) {
      const imageUrls = validImages.map((image, index) => ({
        id: crypto.randomUUID(), // Tạo ID duy nhất
        file: image,
        preview: URL.createObjectURL(image),
      }));
      setImages((prev) => [...prev, ...imageUrls]);
    } else {
      alert("Vui lòng chọn file ảnh hợp lệ!");
    }
  };
  const handleRemoveImage = (imageId) => {
    setImages((prevImages) => {
      const imageToRemove = prevImages.find((image) => image.id === imageId); // Tìm ảnh cần xóa
      const updatedImages = prevImages.filter((image) => image.id !== imageId);
  
      if (imageToRemove?.preview) {
        console.log("Thu hồi URL:", imageToRemove.preview);
        URL.revokeObjectURL(imageToRemove.preview); // Thu hồi URL Blob
      }
    
      return updatedImages;
    });
  };
          
      
  useEffect(() => {
    return () => {
      // Thu hồi tất cả URL Blob khi component bị hủy
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]); // Lắng nghe sự thay đổi của `images`

  // Chuyển đổi tiện ích từ chuỗi thành mảng khi tải trang (nếu cần)
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    const adminToken = Cookies.get("token");
    if (!adminToken) {
      alert("Vui lòng đăng nhập trước khi tạo blog!");
      router.push("/");
      setError("Không có token hợp lệ");
      return;
    }
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("utilities", utilities.join(";")); // Chuyển mảng thành chuỗi
    formData.append("description", description);
    formData.append("location", location);
    formData.append("id_area", id_area);
    images.forEach((image) => {
      formData.append("images[]", image.file);
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
        setTienIch([]); // Reset tiện ích về mảng rỗng
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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Tạo Tòa Nhà Mới
        </h2>

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
              <label className="block text-gray-600">Khu vực</label>
              <input
                type="text"
                value={id_area}
                onChange={(e) => setKhuVuc(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Nhập (id) khu vực"
              />
            </div>
            <div>
              <label className="block text-gray-600">Tên tòa nhà</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setTen(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Nhập tên tòa nhà"
              />
            </div>
            
           {/* chọn ảnh */}
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
            {/* Hiển thị ảnh */}
            <div>
              <h4 className="text-gray-600 mt-4">Ảnh đã chọn:</h4>
              {images.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div
                    key={image.id} // Sử dụng `image.id` thay vì `index`
                      className="flex flex-col items-center gap-2 bg-gray-20 p-2 rounded shadow"
                    >
                      <img
                        src={image.preview}
                        alt={image.file.name}
                        className="w-full h-32 object-cover rounded shadow"
                      />
                      <span className="text-gray-700 text-sm truncate w-full text-center">
                        {image.file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image.id)} 
                        className="text-red-500 hover:underline text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Chưa chọn ảnh nào.</p>
              )}
            </div>
          
          {/* Tiện ích */}
        <div>
          <label className="block text-gray-600">Tiện ích nội thất</label>
          <div className="relative mt-2">
            {/* Hiển thị danh sách tiện ích đã chọn */}
            <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
              {utilities.map((utility, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {utility}
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

            {/* Input thêm tiện ích */}
            <div className="flex items-center gap-2 mt-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.trimStart())}
                placeholder="Thêm hoặc tìm tiện ích"
                className="w-full p-2 border border-gray-300 rounded"
                onFocus={() => setMenuOpen(true)}
                onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isDisable) {
                    setTienIch((prev) => [...prev, query]);
                    setQuery("");
                  }
                }}
              />
            </div>
            
            {/* Gợi ý tiện ích */}
            {menuOpen && filteredTags.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow rounded mt-1 max-h-48 overflow-y-auto z-10">
                {filteredTags.map((tag) => (
                   <div
                   key={tag}
                   className="p-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                   onMouseDown={(e) => e.preventDefault()}
                   onClick={() => {
                     setTienIch((prev) => [...prev, tag]);
                     setQuery("");
                   }}
                   >
                    {tag}
                    </div>
                ))}
              </div>
                  )}
                  </div>
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
                      <label className="block text-gray-600">Tiện ích công cộng</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setViTri(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        placeholder="Nhập vị trí"
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