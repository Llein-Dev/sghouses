"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function CreateOrder() {
  const [optionHoaDon, setOptionHoaDon] = useState([]);
  const [formData, setFormData] = useState({
    id_hop_dong: "",
    tien_thue: "",
    tien_dien: "",
    tien_nuoc: "",
    tien_xe: "",
    tien_dich_vu: "",
    noi_dung: "",
    so_ki_dien: "",
    so_khoi_nuoc: "",
    so_luong_xe: "",
    so_luong_nguoi: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchDataOptionHoaDon = async () => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/hop-dong/all`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setOptionHoaDon(result)
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
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    // fetch dữ liệu user
    fetchDataOptionHoaDon();
  }, []);

  const handleSelectChange = async (e) => {
    const selectedId = e.target.value;

    // Cập nhật id_hop_dong vào formData
    setFormData((prev) => ({
      ...prev,
      id_hop_dong: selectedId,
    }));

    if (selectedId) {
      const adminToken = Cookies.get("token");
      try {
        const response = await fetch(`http://localhost:8000/api/hop-dong/${selectedId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          // Cập nhật formData với dữ liệu từ API
          setFormData((prev) => ({
            ...prev,
            tien_thue: result.tien_thue || "",
            tien_dien: result.tien_dien || "",
            tien_nuoc: result.tien_nuoc || "",
            tien_xe: result.tien_xe || "",
            tien_dich_vu: result.tien_dich_vu || "",
          }));
        } else {
          toast.error("Không thể lấy chi tiết hợp đồng.");
        }
      } catch (error) {
        toast.error("Có lỗi khi kết nối đến API.");
      }
    }
  };


  // Xử lý khi form thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Kiểm tra nếu có trường nào chưa nhập
    const missingFields = [];
    for (const key in formData) {
      if (!formData[key]) {
        missingFields.push(`Chưa nhập ${key.replace("_", " ").replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())}`);
      }
    }

    if (missingFields.length > 0) {
      toast.error(missingFields.join(", "));
      setLoading(false);
      return;
    }

    // Kiểm tra token trong handleSubmit
    const adminToken = Cookies.get("token");
    if (!adminToken) {
      toast.error("Bạn chưa đăng nhập!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/hoa-don/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData), // Đảm bảo gửi dưới dạng JSON
      });

      if (response.ok) {
        toast.success("Hóa đơn được tạo thành công!");
        setFormData({
          id_hop_dong: "",
          tien_thue: "",
          tien_dien: "",
          tien_nuoc: "",
          tien_xe: "",
          tien_dich_vu: "",
          noi_dung: "",
          so_ki_dien: "",
          so_khoi_nuoc: "",
          so_luong_xe: "",
          so_luong_nguoi: "",
        });
      } else {
        const result = await response.json();
        toast.error(result.message || "Đã xảy ra lỗi khi tạo hóa đơn.");
      }
    } catch (error) {
      toast.error("Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };
  const handleRefesh = () => {
    router.push('/admin/orders');
  }
  return (
    <>
      <div className="flex justify-end p-6">
        <Button onClick={handleRefesh} className="bg-blue-900 text-white hover:bg-blue-600">
          <FileText className="mr-2 h-4 w-4" />
          Trang hóa đơn
        </Button>
      </div>
      <div className=" bg-gradient-to-br from-white-50 to-blue-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
            Tạo Hóa Đơn
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID hợp đồng */}
              <div>
                <label
                  htmlFor="id_hop_dong"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Chọn Hợp Đồng
                </label>
                <select
                  id="id_hop_dong"
                  name="id_hop_dong"
                  value={formData.id_hop_dong}
                  onChange={handleSelectChange} // Thay đổi sự kiện ở đây
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Chọn Hợp Đồng</option>
                  {optionHoaDon.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.id} - {option.name_room}
                    </option>
                  ))}
                </select>

              </div>


              {/* Tiền thuê */}
              <div>
                <label
                  htmlFor="tien_thue"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Thuê
                </label>
                <input
                  type="number"
                  id="tien_thue"
                  name="tien_thue"
                  value={formData.tien_thue}
                  onChange={handleChange}
                  placeholder="Nhập tiền thuê"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền điện */}
              <div>
                <label
                  htmlFor="tien_dien"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Điện
                </label>
                <input
                  type="number"
                  id="tien_dien"
                  name="tien_dien"
                  value={formData.tien_dien}
                  onChange={handleChange}
                  placeholder="Nhập tiền điện"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền nước */}
              <div>
                <label
                  htmlFor="tien_nuoc"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Nước
                </label>
                <input
                  type="number"
                  id="tien_nuoc"
                  name="tien_nuoc"
                  value={formData.tien_nuoc}
                  onChange={handleChange}
                  placeholder="Nhập tiền nước"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền xe */}
              <div>
                <label
                  htmlFor="tien_xe"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Xe
                </label>
                <input
                  type="number"
                  id="tien_xe"
                  name="tien_xe"
                  value={formData.tien_xe}
                  onChange={handleChange}
                  placeholder="Nhập tiền xe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền dịch vụ */}
              <div>
                <label
                  htmlFor="tien_dich_vu"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Tiền Dịch Vụ
                </label>
                <input
                  type="number"
                  id="tien_dich_vu"
                  name="tien_dich_vu"
                  value={formData.tien_dich_vu}
                  onChange={handleChange}
                  placeholder="Nhập tiền dịch vụ"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Số kW điện */}
              <div>
                <label
                  htmlFor="so_ki_dien"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Số KWh Điện
                </label>
                <input
                  type="number"
                  id="so_ki_dien"
                  name="so_ki_dien"
                  value={formData.so_ki_dien}
                  onChange={handleChange}
                  placeholder="Nhập số kWh điện"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Số khối nước */}
              <div>
                <label
                  htmlFor="so_khoi_nuoc"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Số Khối Nước
                </label>
                <input
                  type="number"
                  id="so_khoi_nuoc"
                  name="so_khoi_nuoc"
                  value={formData.so_khoi_nuoc}
                  onChange={handleChange}
                  placeholder="Nhập số khối nước"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Số lượng xe */}
              <div>
                <label
                  htmlFor="so_luong_xe"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Số Lượng Xe
                </label>
                <input
                  type="number"
                  id="so_luong_xe"
                  name="so_luong_xe"
                  value={formData.so_luong_xe}
                  onChange={handleChange}
                  placeholder="Nhập số lượng xe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Số lượng người */}
              <div>
                <label
                  htmlFor="so_luong_nguoi"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Số Lượng Người
                </label>
                <input
                  type="number"
                  id="so_luong_nguoi"
                  name="so_luong_nguoi"
                  value={formData.so_luong_nguoi}
                  onChange={handleChange}
                  placeholder="Nhập số lượng người"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Nội dung */}
            <div>
              <label
                htmlFor="noi_dung"
                className="block text-gray-600 font-medium mb-2"
              >
                Nội Dung
              </label>
              <textarea
                id="noi_dung"
                name="noi_dung"
                value={formData.noi_dung}
                onChange={handleChange}
                placeholder="Nhập nội dung hóa đơn"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-600"
                  }`}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Tạo Hóa Đơn"}
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
