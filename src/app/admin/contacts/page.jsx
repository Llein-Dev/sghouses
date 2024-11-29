"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Search, Trash2, FileText } from "lucide-react";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ContractContent() {
  const [contacts, setContracts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(5); // Số lượng mục mỗi trang
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const router = useRouter();

  useEffect(() => {
    const adminToken = Cookies.get("token");
    if (!adminToken) {
      router.push("/");
      return;
    }

    const fetchDataContracts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/contact_room", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setContracts(result.list_contact_room || []);
        } else {
          setError("Không có quyền truy cập.");
        }
      } catch (error) {
        setError("Lỗi khi tải dữ liệu.");
      }
    };

    fetchDataContracts();
  }, [router]);

  const handleDeleteContactRoom = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/contact_room/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Xóa thành công!");
        setContracts((prev) => prev.filter((contract) => contract.id !== id));
      } else {
        setError("Lỗi khi xóa liên hệ.");
      }
    } catch (error) {
      setError("Không thể kết nối đến server.");
    }
  };

  const handleRefresh = () => {
    router.push("/admin/contacts/refeshContacts");
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredContracts = contacts.filter((contract) =>
    `${contract.name} ${contract.id_room} ${contract.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredContracts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4 p-4 bg-gray-50 min-h-screen">
      {/* Thanh tìm kiếm và nút khôi phục */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
            }}
          />
        </div>
        <Button onClick={handleRefresh} variant="blue">
          <FileText className="mr-2 h-4 w-4" />
          Khôi phục liên hệ
        </Button>
      </div>

      {/* Bảng dữ liệu */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Mã phòng</TableHead>
            <TableHead>Điện thoại</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((contract, index) => (
              <TableRow key={index}>
                <TableCell>{contract.name}</TableCell>
                <TableCell>{contract.id_room}</TableCell>
                <TableCell>{contract.phone}</TableCell>
                <TableCell>{contract.state}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteContactRoom(contract.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                Không có dữ liệu liên hệ.
              </TableCell>
            </TableRow>
          )}
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
      <ToastContainer />
      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
