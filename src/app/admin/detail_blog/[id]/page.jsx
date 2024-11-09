"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Sử dụng useParams thay vì useRouter
import Cookies from "js-cookie";

export default function DetailBlog() {
  const { id } = useParams(); // Lấy 'id' từ URL động
  const [blog, setBlog] = useState(null);

  const fetchDataBlog = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch(`http://localhost:8000/api/blog/${id}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setBlog(result);
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
    fetchDataBlog();
    // Call the prop to expose fetchData
  });

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
      <main className="py-8">
        <div className="container mx-auto px-4">
          <section className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row mb-6">
              <img
                src={`http://localhost:8000/storage/${blog.image}`}
                alt={blog.title}
                className="w-full lg:w-48 h-auto rounded-lg mb-4 lg:mb-0 lg:mr-4"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
                <p className="text-sm text-gray-500 italic">{blog.name_cate}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Ngày: {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-gray-700">
              <p className="mb-4 text-base">{blog.description}</p>
              <h3 className="text-lg font-semibold mb-3">Nội dung bài viết:</h3>
              <p className="text-base">{blog.content}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
