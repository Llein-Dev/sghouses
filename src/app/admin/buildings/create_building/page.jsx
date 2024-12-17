"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import dynamic from "next/dynamic";
// Import React Quill với tính năng hỗ trợ đầy đủ công cụ
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import CSS mặc định của Quill
import { Card } from "@/components/ui/card";

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
  const [name, setTen] = useState("");
  const [images, setImages] = useState([]);
  const [description, setMoTa] = useState("");
  const [locations, setViTriList] = useState([]); // Mảng vị trí
  const [locationQuery, setLocationQuery] = useState(""); // Từ khóa tìm kiếm vị trí
  const [locationMenuOpen, setLocationMenuOpen] = useState(false); // Menu gợi ý
  const [id_area, setKhuVuc] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [option, setOption] = useState([]);
  const router = useRouter();

  const [utilities, setTienIch] = useState([]); // Mảng tiện ích
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const availableLocations = ["Cách bách hóa xanh 200m", "Cách trung tâm thành phố Hồ Chí Minh 850m", "cách Quốc lộ một  2km", "Cách quận một 10km"];
  const filteredLocations = availableLocations.filter(
    (loc) =>
      loc.toLowerCase().includes(locationQuery.toLowerCase().trim()) &&
      !locations.includes(loc)
  );

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
      toast.warning('vui lòng chọn ảnh hợp lệ !')
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
      toast.warning('vui lòng đăng nhập trước kh tạo blog !')
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
    formData.append("location", locations.join(";"));
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


      // Kiểm tra phản hồi từ backend
      const contentType = response.headers.get("Content-Type");
      let errorMessage;


      if (response.ok) {
        toast.success('tạo tòa nhà thành công !')
        setTen("");
        setImages([]);
        setTienIch([]); // Reset tiện ích về mảng rỗng
        setMoTa("");
        setKhuVuc("");
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
      toast.error('không thể kết nối đến server');

    } finally {
      setLoading(false);
    }
  };

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
  const handleCreatPage = () => {
    router.push('/admin/buildings');
  }

  return (
    <>
      <div className="flex justify-end mb-2">
        <Button onClick={handleCreatPage} className="bg-blue-900 text-white hover:bg-blue-600">
          <FileText className="mr-2 h-4 w-4" />
          Danh sách tòa nhà
        </Button>
      </div>
      <div className="text-sm flex items-center w-full justify-center bg-gray-100 ">
        <div className="bg-white rounded-lg shadow-lg p-4 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
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
            <div className="md:grid-cols-3 grid-cols- grid gap-4">
              <div>
                <label className="block text-gray-600">Khu vực</label>
                <select
                  value={id_area}
                  onChange={(e) => setKhuVuc(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  {
                    option.map((options) => (
                      <option value={options.id}>{options.name}</option>
                    )
                    )
                  }

                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-600">Tên tòa nhà</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setTen(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Nhập tên tòa nhà"
                />
              </div>
            </div>



            <div className="grid grid-cols-2 gap-4">
              <Card className="p-2">
                <div>
                  <label className="block text-gray-600">Vị trí tiện ích</label>
                  <div className="relative mt-2">
                    {/* Hiển thị các vị trí đã chọn */}
                    <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                      {locations.map((loc, index) => (
                        <div
                          key={index}
                          className="bg-blue-900 text-white px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {loc}
                          <button
                            type="button"
                            className="text-white hover:text-gray-300"
                            onClick={() => setViTriList(locations.filter((item) => item !== loc))}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Input thêm vị trí */}
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value.trimStart())}
                        placeholder="Thêm hoặc tìm vị trí"
                        className="w-full p-2 border border-gray-300 rounded"
                        onFocus={() => setLocationMenuOpen(true)}
                        onBlur={() => setTimeout(() => setLocationMenuOpen(false), 200)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (locationQuery && !locations.includes(locationQuery)) {
                            setViTriList((prev) => [...prev, locationQuery]);
                            setLocationQuery("");
                          }
                        }}
                        className="bg-blue-900 text-white px-3 py-2 rounded"
                      >
                        Thêm
                      </button>
                    </div>

                    {/* Gợi ý vị trí */}
                    {locationMenuOpen && filteredLocations.length > 0 && (
                      <div className="absolute top-full left-0 w-full bg-white shadow rounded mt-1 max-h-48 overflow-y-auto z-10">
                        {filteredLocations.map((location) => (
                          <div
                            key={location}
                            className="p-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setViTriList((prev) => [...prev, location]);
                              setLocationQuery("");
                            }}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              <Card className="p-2">            <div>
                <label className="block text-gray-600">Tiện ích nội thất</label>
                <div className="relative mt-2">
                  {/* Hiển thị danh sách tiện ích đã chọn */}
                  <div className="bg-gray-100 p-2 flex flex-wrap gap-2 rounded">
                    {utilities.map((utility, index) => (
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
              </Card>
              {/* chọn ảnh */}

            </div>
            {/* Tiện ích */}
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
                <div className="grid grid-cols-6 gap-4">
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


            <div>
              <label className="block text-gray-600">Nội dung</label>
              <ReactQuill
                value={description}
                onChange={setMoTa}
                modules={modules} // Sử dụng cấu hình module với toolbar đầy đủ
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Nhập nội dung bài viết"
              />
            </div>





            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-900 text-white rounded mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Tạo Tòa Nhà"}
            </button>
          </form>
        </div>
      </div>


    </>
  );
}