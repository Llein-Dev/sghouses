"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, RefreshCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RefeshBlog() {
  const [blogDeleted, setBlogDeleted] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchDataBlogDeleted = async () => {
    try {
      const adminToken = Cookies.get("token");
      if (!adminToken) {
        setError("Không có token hợp lệ");
        return;
      }

      const response = await fetch("http://localhost:8000/api/blog/list_delete", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setBlogDeleted(result);
      } else {
        setBlogDeleted([])
        setError("Không có quyền truy cập");
      }
    } catch (error) {
      setError("Không thể truy cập dữ liệu");
    }
  };

  useEffect(() => {
    const adminToken = Cookies.get("token");
    if (!adminToken) {
      router.push("/");
      return;
    }
    fetchDataBlogDeleted();
  }, [router]);

  const handleRefeshBlog = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/blog/restore/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await response.json(); // Đợi dữ liệu trả về
        toast.success('khôi phục bài viết thành công !')
        fetchDataBlogDeleted(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };

  const handleReturn = () => {
    router.push('/admin/blog')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={""}
            className="max-w-sm"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleReturn}
            className="bg-blue-900 text-white hover:bg-blue-800"
          >
            <FileText className="mr-2 h-4 w-4" />
            Trang tin tức
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tên bài viết</TableHead>
            <TableHead>Mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogDeleted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Danh sách xóa bài viết trống
              </TableCell>
            </TableRow>
          ) : (
            blogDeleted.map((blogsDeleted, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={`${process.env.NEXT_PUBLIC_PATH_FILE}${blogsDeleted.image}`}
                    alt="Blog"
                    onError={(e) => {
                      e.target.src = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"; // URL ảnh mặc định
                    }}
                  />
                </TableCell>

                <TableCell>{blogsDeleted.title}</TableCell>
                <TableCell>{blogsDeleted.name_cate}</TableCell>
                <TableCell>{blogsDeleted.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleRefeshBlog(blogsDeleted.id)}>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
      
      
    </div>
  );
}
