"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Search, RefreshCcw, ListX, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function RefeshBuilding() {
  const [deletedBuilding, setDeletedBuilding] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // search với fetchdata base
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách user sau khi lọc


  // hàm tiềm kiếm dựa trên dữ liệu được fetch
  const handleSearchChange = (event) => {
    const searchValue = event.target.value; // Nhận giá trị tìm kiếm từ người dùng
    setSearchTerm(searchValue); // Cập nhật `searchTerm` với giá trị tìm kiếm mới

    const filtered = deletedBuilding.filter((building) => {
      const lowerCaseSearchValue = searchValue.toLowerCase().trim();
      // Tạo chuỗi kết hợp chứa tên, số điện thoại, ID và email để tìm kiếm toàn diện
      const combinedString = `${building.name.toLowerCase()} ${building.slug} ${building.id} ${building.status.toLowerCase()}`;
      // Kiểm tra xem chuỗi kết hợp có chứa giá trị tìm kiếm không
      return combinedString.includes(lowerCaseSearchValue);
    });
    setFilteredUsers(filtered);
  };


  // Định nghĩa hàm fetchDeletedBuilding
  const fetchDeletedBuilding = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/toa-nha/list_delete', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDeletedBuilding(result || []);
        console.log(result);
        console.log(deletedBuilding); // Kiểm tra dữ liệu


      } else {
        setFilteredUsers([])
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  };

  // Gọi fetchDeletedBuilding trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDeletedBuilding(); // Gọi hàm fetchDeletedBuilding
  }, [router]);

  useEffect(() => {
    setFilteredUsers(deletedBuilding); // Cập nhật  mỗi khi users thay đổi
  }, [deletedBuilding]);



  const handleRefesh = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/toa-nha/restore/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await response.json(); // Đợi dữ liệu trả về
        toast.success('Khôi phục tòa nhà thành công !')
        fetchDeletedBuilding(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang

      } else {
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };

  const handleBuiding = () => {
    router.push(`/admin/buildings`)
  }
  return (

    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center space-x-4 w-1/2 justify-end">
          {/* khôi phục Danh Mục tin tức */}
          <Button variant="blue" onClick={handleBuiding} className="bg-blue-900 text-white   hover:bg-blue-800">
            <List className="mr-2 h-4 w-4" />
            Danh sách tòa nhà
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Phòng</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tên tòa nhà</TableHead>
            <TableHead>SLug</TableHead>
            <TableHead>Khu vực</TableHead>
            <TableHead>view</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Danh sách khôi phục tòa nhà trống
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((building, index) => (
                <TableRow key={index}>
                  <TableCell>{building.id}</TableCell>
                  <TableCell>
                    <img style={{ height: "150px", objectFit: "cover", borderRadius: "10px" }} src={`http://localhost:8000/storage/${building.image}`} />
                  </TableCell>
                  <TableCell>{building.name}</TableCell>
                  <TableCell>{building.slug}</TableCell>
                  <TableCell>{building.name_area}</TableCell>
                  <TableCell>{building.price}</TableCell>
                  <TableCell>{building.view}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleRefesh(building.id)}>
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>

      </Table>
      <ToastContainer />
    </div>

  );
}