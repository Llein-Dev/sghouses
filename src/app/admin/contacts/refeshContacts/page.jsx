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
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export default function KhoiPhucUsers() {
  const [deletedContacts, setDeletedContacts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(5); // Số lượng mục mỗi trang
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
        setDeletedContacts([]);
      }
    } catch (error) {
      setDeletedContacts([]);
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
        method: "PATCH",
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
    router.push("/admin/contacts");
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredContacts = deletedContacts.filter((contact) =>
    `${contact.name} ${contact.phone} ${contact.id_room} ${contact.content}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
            }}
            className="max-w-sm"
          />
        </div>
        <Button onClick={handleReturn} variant="blue">
          <FileText className="mr-2 h-4 w-4" />
          Quay lại trang liên hệ
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            currentItems.length > 0 ? (
              currentItems.map((contacts, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_PATH_FILE}${contacts.avatar || ''}`}
                      alt={`${contacts.name}'s avatar`}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.src = "https://vnsteelthanglong.vn/core/img/default_image.png";
                      }}
                    />
                    <span className="self-center">{contacts.name}</span> {/* Căn giữa theo trục dọc */}
                  </TableCell>

                  <TableCell>{contacts.name_room}</TableCell>
                  <TableCell>{contacts.phone}</TableCell>
                  <TableCell>{new Date(contacts.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleRefesh(contacts.id)}>
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      {/* Nút phân trang */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            variant={currentPage === index + 1 ? "blue" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      
      
      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
