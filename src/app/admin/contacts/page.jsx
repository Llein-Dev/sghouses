"use client"

import { useEffect, useState } from "react"
import { Search, FileText, Eye, Download, Trash2 } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"


export default function ContractContent() {
  const [contracts, setContracts] = useState([])
  const router = useRouter()

  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    // fetch dữ liệu user

    const fetchDataContracts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/contact_room', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setContracts(result.list_contact_room || []);
      } else {
          setError('Không có quyền truy cập');
        }
      } catch (error) {
        setError('Không thể truy cập dữ liệu');
      }
    };
    fetchDataContracts();
  }, [router]);

  const handleDeleteContact_room = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/contact_room/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
        setContracts((prevUsers) => prevUsers.filter(user => user.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi xóa người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi xóa người dùng");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search contracts..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button variant="blue">
          <FileText className="mr-2 h-4 w-4" />
          New Contract
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Mã phòng</TableHead>
            <TableHead>Điện thoại</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract,index) => (
            <TableRow key={index}>
              <TableCell>{contract.name}</TableCell>
              <TableCell>{contract.id_room}</TableCell>
              <TableCell>{contract.phone}</TableCell>
              <TableCell>{contract.state}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteContact_room(contract.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}