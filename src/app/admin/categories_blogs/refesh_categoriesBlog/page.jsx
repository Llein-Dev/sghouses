"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Search, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RefeshCataBlog() {
  const [deletedCataBlog, setDeletedCataBlog] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // search với fetchdata base
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách user sau khi lọc


  // hàm tiềm kiếm dựa trên dữ liệu được fetch
  const handleSearchChange = (event) => {
    const searchValue = event.target.value; // Nhận giá trị tìm kiếm từ người dùng
    setSearchTerm(searchValue); // Cập nhật `searchTerm` với giá trị tìm kiếm mới

    const filtered = deletedCataBlog.filter((cateBlog) => {
      const lowerCaseSearchValue = searchValue.toLowerCase().trim();
      // Tạo chuỗi kết hợp chứa tên, số điện thoại, ID và email để tìm kiếm toàn diện
      const combinedString = `${cateBlog.name.toLowerCase()} ${cateBlog.slug} ${cateBlog.id} ${cateBlog.status.toLowerCase()}`;
      // Kiểm tra xem chuỗi kết hợp có chứa giá trị tìm kiếm không
      return combinedString.includes(lowerCaseSearchValue);
    });
    setFilteredUsers(filtered);
  };


  // Định nghĩa hàm fetchDeletedCataBlog
  const fetchDeletedCataBlog = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/cate_blog/list_delete', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDeletedCataBlog(result.list_cate_blog || []);
        console.log(result);
        console.log(deletedCataBlog); // Kiểm tra dữ liệu


      } else {
        setDeletedCataBlog([])
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setDeletedCataBlog([])
      setError('Không thể truy cập dữ liệu');
    }
  };

  // Gọi fetchDeletedCataBlog trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDeletedCataBlog(); // Gọi hàm fetchDeletedCataBlog
  }, [router]);

  useEffect(() => {
    setFilteredUsers(deletedCataBlog); // Cập nhật  mỗi khi users thay đổi
  }, [deletedCataBlog]);



  const handleRefesh = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/cate_blog/restore/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await response.json(); // Đợi dữ liệu trả về
        toast.success('Cập nhật thành công')
        fetchDeletedCataBlog(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang

      } else {
        fetchDeletedCataBlog()
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };
  return (

    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên Danh Mục Tin Tức</TableHead>
            <TableHead>Điện thoại</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filteredUsers.length > 0 ? (
              filteredUsers.map((cateBlog, index) => (
                <TableRow key={index}>
                  <TableCell>{cateBlog.id}</TableCell>
                  <TableCell>{cateBlog.name}</TableCell>
                  <TableCell>{cateBlog.slug}</TableCell>
                  <TableCell>{cateBlog.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleRefesh(cateBlog.id)}>
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Danh sách trống
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      <ToastContainer />
    </div>

  );
}