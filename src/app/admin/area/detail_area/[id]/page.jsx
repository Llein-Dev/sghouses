"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Sử dụng useParams thay vì useRouter
import Cookies from "js-cookie";

export default function DetailArea() {
  const { id } = useParams(); // Lấy 'id' từ URL động
  const [area, setArea] = useState(null);

  const fetchDataArea = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch(`http://localhost:8000/api/khu-vuc/${id}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setArea(result);
      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  };
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDataArea();
    // Call the prop to expose fetchData
  });

  if (!area) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
      <main className="py-8">
        <div className="container mx-auto px-4">
          <section className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row mb-6">
              <img
                src={`http://localhost:8000/storage/${area.image}`}
                alt={area.name}
                className="w-full lg:w-48 h-auto rounded-lg mb-4 lg:mb-0 lg:mr-4"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{area.name}</h2>
                <p className="text-sm text-gray-500 italic">{area.slug}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Ngày bắt đầu: {new Date(area.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Ngày kết thúc: {new Date(area.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
