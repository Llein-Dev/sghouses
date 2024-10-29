"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function KhoiPhucUsers() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDeletedUsers = async () => {
      const adminToken = Cookies.get("token");
      try {
        const response = await fetch("http://localhost:8000/api/user?status=deleted", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setDeletedUsers(result.list || []);
        } else {
          setError("Không có quyền truy cập dữ liệu");
        }
      } catch (error) {
        setError("Không thể truy cập dữ liệu");
      }
    };
    fetchDeletedUsers();
  }, []);

  const handleRestoreUser = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/user/restore/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "active" }),
      });

      if (response.ok) {
        setDeletedUsers(deletedUsers.filter(user => user.id !== id)); // Xóa khỏi danh sách khôi phục
        router.push("/admin/users"); // Quay lại trang chủ
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi khôi phục người dùng");
    }
  };

  return (
    <div>
      <h2>Khôi phục người dùng đã xóa</h2>
      {error && <p>{error}</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deletedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleRestoreUser(user.id)}>Khôi phục</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
