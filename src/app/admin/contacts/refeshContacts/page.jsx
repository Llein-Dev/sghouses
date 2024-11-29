"use client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Search, RefreshCcw, FileText } from "lucide-react";
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

export default function KhoiPhucUsers() {
  const [deletedContacts, setDeletedContacts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchDeletedContacts = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/contact_room/list_delete', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDeletedContacts(result.list || []);
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
    fetchDeletedContacts();
  }, [router]);

  const handleRefesh = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/contact_room/restore/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Khôi phục thành công!");
        setDeletedContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
        } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục liên hệ");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện khôi phục liên hệ:", error);
    }
  };
  const handleReturn = () => {
    router.push("/admin/contact");
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            value={""}
            className="max-w-sm"
          />
        </div>
        <Button  onClick={handleReturn} variant="blue">
          <FileText className="mr-2 h-4 w-4" />
         Quay lại trang liên hệ
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Điện thoại</TableHead>
            <TableHead>Số phòng</TableHead>
            <TableHead>Nội dung</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            deletedContacts.map((contacts, index) => (
              <TableRow key={index}>
                <TableCell>{contacts.id}</TableCell>
                <TableCell>{contacts.name}</TableCell>
                <TableCell>{contacts.phone}</TableCell>
                <TableCell>{contacts.id_room}</TableCell>
                <TableCell>{contacts.content}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleRefesh(contacts.id)}>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
}
