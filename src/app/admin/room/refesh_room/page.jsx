"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Search, RefreshCcw, ListX, List, Badge } from "lucide-react"
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
  const [deletedRoom, setDeletedRoom] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Định nghĩa hàm fetchDeletedRoom
  const fetchDeletedRoom = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/phong/list_delete', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDeletedRoom(result.list_room || []);
      } else {
        toast.error(error.message)
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  };

  // Gọi fetchDeletedRoom trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDeletedRoom(); // Gọi hàm fetchDeletedRoom
  }, [router]);




  const handleRefesh = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/phong/restore/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchDeletedRoom(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang
        toast.success("Khôi phục thành công"); // Thông báo lỗi
      } else {
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };

  const handleRoom = () => {
    router.push(`/admin/room`)
  }
  return (

    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            // value={searchTerm}
            // onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center space-x-4 w-1/2 justify-end">
          {/* khôi phục Danh Mục tin tức */}
          <Button variant="blue" onClick={handleRoom} className="bg-blue-900 text-white hover:bg-blue-800">
            <List className="mr-2 h-4 w-4" />
            Danh sách phòng
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Thông tin phòng</TableHead>
            <TableHead>Diện tích</TableHead>
            <TableHead>Quận</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deletedRoom.length > 0 ? (
            deletedRoom.map((rooms, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex gap-5">
                  <img
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    src={`${process.env.NEXT_PUBLIC_PATH_FILE}${rooms.hinh_anh}`}
                    alt="Room"
                  />
                  <div>
                    <div className="p-1 text-xl font-bold rounded text-black">
                      {rooms.ten_phong}
                    </div>
                    {rooms.ten_toa_nha}
                    <div>{rooms.ten_khu_vuc}</div>
                  </div>
                </TableCell>
                <TableCell>{rooms.dien_tich} m²</TableCell>
                <TableCell>{rooms.ten_khu_vuc}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRefesh(rooms.id)}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                Danh sách khôi phục phòng trống
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>


    </div>

  );
}
