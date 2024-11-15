"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, RefreshCcw } from "lucide-react";
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
        const shouldGoToRecovery = window.confirm(
          "Đã khôi phục thành công, bạn có muốn quay về trang users không?"
        );
        if (shouldGoToRecovery) {
          router.push("/admin/blog"); // Chuyển đến trang users
        } else {
            fetchDataBlogDeleted(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };
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
            onClick={() => {}}
            className="bg-green-700 text-white hover:bg-green-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Blog
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogDeleted.map((blogsDeleted, index) => (
            <TableRow key={index}>
              <TableCell>{blogsDeleted.id}</TableCell>
              <TableCell>
                <img src={`http://localhost:8000/storage/${blogsDeleted.image}`} alt="Blog" />
              </TableCell>
              <TableCell>{blogsDeleted.title}</TableCell>
              <TableCell>{blogsDeleted.name_cate}</TableCell>
              <TableCell>{blogsDeleted.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon"  onClick={() => handleRefeshBlog(blogsDeleted.id)}>
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
