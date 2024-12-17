"use client";

import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateRoom() {
  const [id_building, setIdBuilding] = useState("") // đã thay
  const [name, setTen] = useState(""); // đã thay
  const [images, setImages] = useState([]);
  const [tien_ich, setTienIch] = useState([]); // thay tiện ích
  const [gac_lung, setGacLung] = useState(""); // thay gác lửng
  const [dien_tich, setDienTich] = useState(""); // thay diện tích
  const [tien_thue, setTienThue] = useState(""); // thay tiền thuê
  const [tien_dien, setTienDien] = useState([]); // thay tiền điện
  const [tien_nuoc, setTienNuoc] = useState([]); // thay tiền nước
  const [tien_xe, setTienXe] = useState([]); // thay tiền xe
  const [tien_dich_vu, setDichVu] = useState([]); // thay dịch vụ
  const [noi_that, setNoiThat] = useState([]); // thay dịch vụ
  const [loading, setLoading] = useState(false);
  const [optionToaNha, setOptionToaNha] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [querys, setQuerys] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpens, setMenuOpens] = useState(false);


  const fetchDataOption = async () => {
    try {
      const response = await fetch(`https://hieu.name.vn/datn/public/api/toa-nha/option`, {
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

  useEffect(() => {

    fetchDataOption();
  }, []);


  const tags = [
    "Tủ lạnh",
    "Máy lạnh",
    "Máy quạt",
    "Bình nóng lạnh",
    "Bếp điện từ",
    "Tivi",
  ];
  const tagss = [
    "Giường",
    "Tủ quần áo",
    "Bộ bàn ăn",
    "Ghế",
    "Sofa", 
    "Toilet",
    "Máy lạnh",
    "Nệm",
    "Bộ chăn-ga gối",
    "Bàn trang điểm",
    "Kệ giày dép",
    "Cửa sổ",
    "Rèm cửa"

  ];
  const handleRemoveUtility = (tag) => {
    setTienIch(tien_ich.filter((item) => item !== tag));
  };

  const handleRemoveNoiThat = (tagg) => {
    setNoiThat(noi_that.filter((itemm) => itemm !== tagg));
  };

  const filteredTagss = tagss.filter(
    (itemm) =>
      itemm.toLowerCase().includes(querys.toLowerCase().trim()) &&
      !noi_that.includes(itemm)
  );

  const isDisables =
    !querys.trim() ||
    noi_that.some(
      (itemm) => itemm.toLowerCase().trim() === querys.toLowerCase().trim()
    );

  const filteredTags = tags.filter(
    (item) =>
      item.toLowerCase().includes(query.toLowerCase().trim()) &&
      !tien_ich.includes(item)
  );

  const isDisable =
    !query.trim() ||
    tien_ich.some(
      (item) => item.toLowerCase().trim() === query.toLowerCase().trim()
    );


  // // thêm ảnh và xóa ảnh
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
      toast.warning("vui lòng chọn file ảnh hợp lệ!");
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




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const adminToken = Cookies.get("token");
    if (!adminToken) {
      toast.warning("vui lòng đăng nhập!");
      router.push("/");
      return;
    }
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("id_building", id_building);
    formData.append("name", name);
    formData.append("tien_ich", tien_ich.join(";"));
    formData.append("gac_lung", gac_lung);
    formData.append("dien_tich", dien_tich);
    formData.append("tien_thue", tien_thue);
    formData.append("tien_dien", tien_dien);
    formData.append("tien_nuoc", tien_nuoc);
    formData.append("tien_xe", tien_xe);
    formData.append("tien_dich_vu", tien_dich_vu);
    formData.append("noi_that", noi_that);
    images.forEach((image) => {
      formData.append("images[]", image.file);
    });

    try {
      const response = await fetch("https://hieu.name.vn/datn/public/api/phong/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

    // Kiểm tra phản hồi từ backend
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
      setErrorMessage("Không thể kết nối đến server, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Tạo phòng mới
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
              <label className="block text-gray-600">Chọn tòa nhà</label>
              <select
                value={id_building}
                onChange={(e) => setIdBuilding(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                
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
              <label className="block text-gray-600">Tên phòng</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setTen(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Nhập tên phòng"
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
              <label className="block text-gray-600">Tiện ích</label>
              <div className="relative mt-2">
                {/* Hiển thị danh sách tiện ích đã chọn */}
                <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                  {tien_ich.map((utility, index) => (
                    <div
                      key={index}
                      className="bg-blue-900 text-white px-3 py-1 rounded-full flex items-center gap-2"
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
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value.trimStart())}
                    placeholder="Thêm hoặc tìm tiện ích"
                    className="w-full p-2 border border-gray-300 rounded"
                    onFocus={() => setMenuOpen(true)}
                    onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!isDisable) {
                        setTienIch((prev) => [...prev, query]);
                        setQuery("");
                      }
                    }}
                    className="bg-blue-900 text-white px-3 py-2 rounded"
                    disabled={isDisable}
                  >
                    Thêm
                  </button>
                </div>

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

                 {/* Nội Thất */}
                 <div>
              <label className="block text-gray-600">Nội thất</label>
              <div className="relative mt-2">
                {/* Hiển thị danh sách nội thất đã chọn */}
                <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                  {noi_that.map((noiThat, index) => (
                    <div
                      key={index}
                      className="bg-blue-900 text-white px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {noiThat}
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
                {/* Input thêm nội thất */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={querys}
                    onChange={(e) => setQuerys(e.target.value.trimStart())}
                    placeholder="Thêm hoặc tìm nội thất"
                    className="w-full p-2 border border-gray-300 rounded"
                    onFocus={() => setMenuOpens(true)}
                    onBlur={() => setTimeout(() => setMenuOpens(false), 200)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!isDisables) {
                        setNoiThat((prev) => [...prev, querys]);
                        setQuerys("");
                      }
                    }}
                    className="bg-blue-900 text-white px-3 py-2 rounded"
                    disabled={isDisables}
                  >
                    Thêm
                  </button>
                </div>

                {menuOpens && filteredTags.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white shadow rounded mt-1 max-h-48 overflow-y-auto z-10">
                    {filteredTagss.map((tagg) => (
                      <div
                        key={tagg}
                        className="p-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setNoiThat((prev) => [...prev, tagg]);
                          setQuerys("");
                        }}
                      >
                        {tagg}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                    type="number"
                    step={'1'}
                    value={dien_tich}
                    onChange={(e) => setDienTich(e.target.value)}
                    className="flex-grow p-1 outline-none"
                    placeholder="Nhập diện tích"
                  />
                  <span className="ml-2 text-gray-500">m²</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Giá Thuê</label>
              <div className="flex items-center border border-gray-300 rounded p-2 mt-1">
                <input
                  type="number"
                  step={'1000'}
                  value={tien_thue}
                  onChange={(e) => setTienThue(e.target.value)}
                  className="flex-grow p-1 outline-none"
                  placeholder="Nhập giá thuê"
                  
                />
                <span className="ml-2 text-gray-500">vnđ / Tháng</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Cột 1 - Tiền Điện */}
              <div>
                <label className="block text-gray-600">Tiền Điện</label>
                <div className="flex items-center border border-gray-300 rounded p-2 mt-1">
                  <input
                    type="number"
                    step={'1000'}
                    value={tien_dien}
                    onChange={(e) => setTienDien(e.target.value)}
                    className="flex-grow p-1 outline-none"
                    placeholder="Nhập tiền điện"
                    
                  />
                  <span className="ml-2 text-gray-500">vnđ / Kwh</span>
                </div>
              </div>
              {/* Cột 2 - Tiền Nước */}
              <div>
                <label className="block text-gray-600">Tiền Nước</label>
                <div className="flex items-center border border-gray-300 rounded p-2 mt-1">
                  <input
                    type="number"
                    step={'1000'}
                    value={tien_nuoc}
                    onChange={(e) => setTienNuoc(e.target.value)}
                    className="flex-grow p-1 outline-none"
                    placeholder="Nhập tiền nước"
                    
                  />
                  <span className="ml-2 text-gray-500">vnđ / m³</span>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Tiền Xe</label>
              <div className="flex items-center border border-gray-300 rounded p-2 mt-1">
                <input
                  type="number"
                  step={'1000'}
                  value={tien_xe}
                  onChange={(e) => setTienXe(e.target.value)}
                  className="flex-grow p-1 outline-none"
                  placeholder="Nhập tiền xe"
                  
                />
                <span className="ml-2 text-gray-500">vnđ / Xe</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Tiền dịch vụ</label>
              <div className="flex items-center border border-gray-300 rounded p-2 mt-1">
                <input
                  type="number"
                  step={'1000'}
                  value={tien_dich_vu}
                  onChange={(e) => setDichVu(e.target.value)}
                  className="flex-grow p-1 outline-none"
                  placeholder="Nhập tiền dịch vụ"
                  
                />
                <span className="ml-2 text-gray-500">vnđ / Tháng</span>
              </div>
            </div>
            </div>

            

            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-900 text-white rounded mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Tạo phòng"}
            </button>
          </form>
        </div>
      </div>
      
      
      
    </>
  );
}