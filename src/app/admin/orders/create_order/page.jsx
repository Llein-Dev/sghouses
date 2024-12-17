"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";


export default function CreateOrder() {
  const [optionHoaDon, setOptionHoaDon] = useState([]);
  const [formData, setFormData] = useState({
    id_hop_dong: "",
    id_room: "",
    name_room: "",
    name_building: "",
    image_room: "",
    tien_thue: "",
    tien_dien: "",
    tien_nuoc: "",
    tien_xe: "",
    tien_dich_vu: "",
    id_user: "",
    name_user: "",
    avatar_user: "",
    file_hop_dong: null,
    date_start: "",
    date_end: "",
    status: "",
  });


  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const fetchDataOptionHoaDon = async () => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`https://hieu.name.vn/datn/public/api/hop-dong/all`, {
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
  console.log(formData);

  const handleSelectChange = async (e) => {
    const selectedId = e.target.value;

    // Update id_hop_dong in formData
    setFormData((prev) => ({
      ...prev,
      id_hop_dong: selectedId,
    }));

    if (selectedId) {
      const adminToken = Cookies.get("token");
      try {
        const response = await fetch(`https://hieu.name.vn/datn/public/api/hop-dong/${selectedId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();


          setFormData((prev) => ({
            ...prev,
            id_hop_dong: result.id || "",  // Ensure id_hop_dong is set
            id_room: result.id_room || "",
            name_room: result.name_room || "",
            name_building: result.name_building || "",
            image_room: result.image_room || "",
            tien_thue: result.tien_thue || "",
            tien_dien: result.tien_dien || "",
            tien_nuoc: result.tien_nuoc || "",
            tien_xe: result.tien_xe || "",
            tien_dich_vu: result.tien_dich_vu || "",
            id_user: result.id_user || "",
            name_user: result.name_user || "",
            avatar_user: result.avatar_user || "",
            date_start: result.date_start || "",
            date_end: result.date_end || "",
            status: result.status || "",
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
    console.log("Submitting form", formData); // Kiểm tra dữ liệu formData

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
    console.log("Admin token:", adminToken); // Kiểm tra giá trị của token
    if (!adminToken) {
      toast.error("Bạn chưa đăng nhập!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://hieu.name.vn/datn/public/api/hoa-don/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData), // Đảm bảo gửi dưới dạng JSON
      });

      console.log("Response status:", response.status); // Kiểm tra mã trạng thái của phản hồi

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
        console.log("Error response:", result); // Kiểm tra thông tin lỗi từ phản hồi
        toast.error(result.message || "Đã xảy ra lỗi khi tạo hóa đơn.");
      }
    } catch (error) {
      console.error("Fetch error:", error); // Ghi lại lỗi nếu có
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
      <div className="grid text-sm grid-cols-1 md:grid-cols-5 gap-8">
        <div className="h-full col-span-2 bg-gradient-to-br from-white-50 to-blue-100 flex items-center justify-center">
          <Card className=" w-full h-full">
            <CardHeader>    <CardTitle className="text-lg  font-bold text-gray-700 text-center ">
              Tạo Hóa Đơn
            </CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* ID hợp đồng */}
                  <div className="col-span-1 md:col-span-2">
                    <Label
                      htmlFor="id_hop_dong"
                      className="block text-gray-500 font-semibold text-sm mb-2"
                    >
                      Chọn Hợp Đồng
                    </Label>
                    <select
                      id="id_hop_dong"
                      name="id_hop_dong"
                      value={formData.id_hop_dong}
                      onChange={handleSelectChange} // Thay đổi sự kiện ở đây
                      className="w-full px-4 py-2 border text-sm text-sm  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="">Chọn Hợp Đồng</option>
                      {optionHoaDon.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name_user} - {option.name_room}
                        </option>
                      ))}
                    </select>
                  </div>


                  {/* Số kW điện */}
                  <div>
                    <Label
                      htmlFor="so_ki_dien"
                      className="block text-gray-500 font-semibold text-sm mb-2"
                    >
                      Số KWh Điện
                    </Label>
                    <input
                      type="number"
                      id="so_ki_dien"
                      name="so_ki_dien"
                      value={formData.so_ki_dien}
                      onChange={handleChange}
                      placeholder="Nhập số kWh điện"
                      className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  {/* Số khối nước */}
                  <div>
                    <Label
                      htmlFor="so_khoi_nuoc"
                      className="block text-gray-500 font-semibold text-sm mb-2"
                    >
                      Số Khối Nước
                    </Label>
                    <input
                      type="number"
                      id="so_khoi_nuoc"
                      name="so_khoi_nuoc"
                      value={formData.so_khoi_nuoc}
                      onChange={handleChange}
                      placeholder="Nhập số khối nước"
                      className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  {/* Số lượng xe */}
                  <div>
                    <Label
                      htmlFor="so_luong_xe"
                      className="block text-gray-500 font-semibold text-sm mb-2"
                    >
                      Số Lượng Xe
                    </Label>
                    <input
                      type="number"
                      id="so_luong_xe"
                      name="so_luong_xe"
                      value={formData.so_luong_xe}
                      onChange={handleChange}
                      placeholder="Nhập số lượng xe"
                      className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  {/* Số lượng người */}
                  <div>
                    <Label
                      htmlFor="so_luong_nguoi"
                      className="block text-gray-500 font-semibold text-sm mb-2"
                    >
                      Số Lượng Người
                    </Label>
                    <input
                      type="number"
                      id="so_luong_nguoi"
                      name="so_luong_nguoi"
                      value={formData.so_luong_nguoi}
                      onChange={handleChange}
                      placeholder="Nhập số lượng người"
                      className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Nội dung */}
                <div>
                  <Label
                    htmlFor="noi_dung"
                    className="block text-gray-500 font-semibold text-sm mb-2"
                  >
                    Nội Dung
                  </Label>
                  <textarea
                    id="noi_dung"
                    name="noi_dung"
                    value={formData.noi_dung}
                    onChange={handleChange}
                    placeholder="Nhập nội dung hóa đơn"
                    rows="4"
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`px-6 text-sm py-2 w-full text-white font-semibold rounded-lg shadow-md focus:outline-none ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-900 hover:bg-blue-600"
                      }`}
                    disabled={loading}
                  >
                    {loading ? "Đang xử lý..." : "Tạo Hóa Đơn"}
                  </button>
                </div>
                <img
                  src={`${process.env.NEXT_PUBLIC_PATH_FILE}${formData.image_room}`}

                  className="w-full aspect-[18/9]" // Corrected class name
                  alt={formData.name_room} // Add a descriptive alt text for accessibility
                />
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="h-full col-span-2 space-y-4  ">

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin hợp đồng <Badge>{formData.status}</Badge></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-gray-500 font-semibold text-sm mb-2"
                >
                  Tên khách hàng
                </Label>
                <input
                  disabled
                  type="text"
                  id="name"
                  name="name_user" // Bind name attribute for potential handling
                  value={formData.name_user}
                  onChange={handleChange}
                  placeholder="Tên khách hàng"
                  className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <Label
                  htmlFor="name_room"
                  className="block text-gray-500 font-semibold text-sm mb-2"
                >
                  Tên phòng
                </Label>
                <input
                  disabled
                  type="text"
                  id="name_room"
                  name="name_room"
                  value={formData.name_room}
                  onChange={handleChange}
                  placeholder="Tên phòng"
                  className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 grid-cols-1">
                <div>
                  <Label
                    htmlFor="date_start"
                    className="block text-gray-500 font-semibold text-sm mb-2"
                  >
                    Ngày bắt đầu
                  </Label>
                  <input
                    disabled
                    type="date"
                    id="date_start"
                    name="date_start"
                    value={formData.date_start}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="date_end"
                    className="block text-gray-500 font-semibold text-sm mb-2"
                  >
                    Ngày kết thúc
                  </Label>
                  <input
                    disabled
                    type="date"
                    id="date_end"
                    name="date_end"
                    value={formData.date_end}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>

            </CardContent>
          </Card>
          <Card className="">
            <CardHeader><CardTitle className="text-lg">Bảng giá</CardTitle></CardHeader>

            <CardContent className="grid grid-cols-2 gap-2">
              {/* Tiền Thuê */}
              <div>
                <Label
                  htmlFor="tien_thue"
                  className="block text-gray-500 font-semibold text-sm mb-2"
                >
                  Tiền Thuê
                </Label>
                <input
                  type="text" // Changed to text to allow formatted input
                  id="tien_thue"
                  name="tien_thue"
                  value={formatNumber(formData.tien_thue)} // Format number for display
                  onChange={(e) => {
                    const value = e.target.value;
                    // Update state with parsed number
                    setFormData((prev) => ({
                      ...prev,
                      tien_thue: parseNumber(value),
                    }));
                  }}
                  placeholder="Nhập tiền thuê"
                  className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền điện */}
              <div>
                <Label
                  htmlFor="tien_dien"
                  className="block text-gray-500 font-semibold text-sm mb-2"
                >
                  Tiền Điện
                </Label>
                <input
                  type="text"
                  id="tien_dien"
                  name="tien_dien"
                  value={formatNumber(formData.tien_dien)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      tien_dien: parseNumber(value),
                    }));
                  }}
                  placeholder="Nhập tiền điện"
                  className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền nước */}
              <div>
                <Label
                  htmlFor="tien_nuoc"
                  className="block text-gray-500 font-semibold text-sm mb-2"
                >
                  Tiền Nước
                </Label>
                <input
                  type="text"
                  id="tien_nuoc"
                  name="tien_nuoc"
                  value={formatNumber(formData.tien_nuoc)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      tien_nuoc: parseNumber(value),
                    }));
                  }}
                  placeholder="Nhập tiền nước"
                  className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền xe */}
              <div>
                <Label
                  htmlFor="tien_xe"
                  className="block text-gray-500 font-semibold text-sm mb-2"
                >
                  Tiền Xe
                </Label>
                <input
                  type="text"
                  id="tien_xe"
                  name="tien_xe"
                  value={formatNumber(formData.tien_xe)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      tien_xe: parseNumber(value),
                    }));
                  }}
                  placeholder="Nhập tiền xe"
                  className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Tiền dịch vụ */}
              <div>
                <Label
                  htmlFor="tien_dich_vu"
                  className="block text-gray-500 font-semibold text-sm mb-2"
                >
                  Tiền Dịch Vụ
                </Label>
                <input
                  type="text"
                  id="tien_dich_vu"
                  name="tien_dich_vu"
                  value={formatNumber(formData.tien_dich_vu)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      tien_dich_vu: parseNumber(value),
                    }));
                  }}
                  placeholder="Nhập tiền dịch vụ"
                  className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleRefesh} className="bg-blue-900  text-white hover:bg-blue-600">
            <FileText className="mr-2 h-4 w-4" />
            Trang hóa đơn
          </Button>
        </div>
      </div>

    </>
  );
}
const formatNumber = (num) => {
  if (!num) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const parseNumber = (str) => {
  // Remove dots and convert to number
  return Number(str.replace(/\./g, ""));
};
