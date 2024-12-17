"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Search,FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ExpandableTable from "@/components/expandTable";

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
        const response = await fetch("https://hieu.name.vn/datn/public/api/contact_room", {
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
        `https://hieu.name.vn/datn/public/api/contact_room/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Đợi xử lý thành công!");
        setContracts((prev) => prev.filter((contact) => contact.id !== id));
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


  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.id_room} ${contact.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(currentItems);

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
          <FileText className="m-0 md:mr-2 h-4 w-4" />
          <span className="hidden md:block"> Danh sách xử lý</span>
        </Button>
      </div>

      {/* Bảng dữ liệu */}
      <ExpandableTable items={currentItems} handleDeleteContactRoom={handleDeleteContactRoom} />
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
