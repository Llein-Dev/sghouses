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

export default function KhoiPhucUsers() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Định nghĩa hàm fetchDeletedUsers
  const fetchDeletedUsers = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/user/list_delete', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDeletedUsers(result.deleted_users || []);
        console.log(result);
        console.log(deletedUsers); // Kiểm tra dữ liệu


      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  };

  // Gọi fetchDeletedUsers trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDeletedUsers(); // Gọi hàm fetchDeletedUsers
  }, [router]);


  const handleRefesh = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/user/restore/${id}`, {
        method: "POST",
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
          router.push("/admin/users"); // Chuyển đến trang users
        } else {
          fetchDeletedUsers(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang
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
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={""}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            deletedUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.born}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">

                  
                    <Button variant="outline" size="icon" onClick={() => handleRefesh(user.id)}>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>

  );
}