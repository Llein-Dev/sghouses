"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

export default function DetailRoom() {
  const { id } = useParams(); // Lấy 'id' từ URL động
  const [room, setRoom] = useState(null);

  const fetchRoomDetails = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch(`http://localhost:8000/api/phong/${id}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setRoom(result);
      } else {
        console.error('Không có quyền truy cập API');
      }
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  if (!room) {
    return <div className="text-center py-8 text-gray-500">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="py-8">
        <div className="container mx-auto px-4 space-y-6">
          {/* Thông tin chung */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{room.ten_phong}</h1>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Trạng thái:</strong> {room.trang_thai}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Khu vực:</strong> {room.ten_khu_vuc}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Thuộc tòa nhà:</strong> {room.ten_toa_nha}
            </p>
          </section>

          {/* Hình ảnh */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hình ảnh</h2>
            <div className="flex gap-4 overflow-x-auto">
              {room.hinh_anh.split(";").map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000/storage/${img}`}
                  alt={`Hình ảnh ${index + 1}`}
                  className="w-48 h-32 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </section>

          {/* Chi tiết thông tin */}
          <section className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Thông tin chi tiết</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Diện tích:</strong> {room.dien_tich} m²
                </li>
                <li>
                  <strong>Gác lửng:</strong> {room.gac_lung}
                </li>
                <li>
                  <strong>Giá thuê:</strong> {room.gia_thue.toLocaleString()} VND
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Chi phí</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Điện:</strong> {room.don_gia_dien.toLocaleString()} VND/kWh
                </li>
                <li>
                  <strong>Nước:</strong> {room.don_gia_nuoc.toLocaleString()} VND/m³
                </li>
                <li>
                  <strong>Gửi xe máy:</strong> {room.tien_xe_may.toLocaleString()} VND/tháng
                </li>
                <li>
                  <strong>Phí dịch vụ:</strong> {room.phi_dich_vu.toLocaleString()} VND/tháng
                </li>
              </ul>
            </div>
          </section>

          {/* Tiện ích và nội thất */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tiện ích và Nội thất</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tiện ích</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {room.tien_ich.split(";").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Nội thất</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {room.noi_that.split(";").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
