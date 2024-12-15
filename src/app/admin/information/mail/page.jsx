"use client"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"
import { Search, Trash2, BookCopy, Eye,  Plus, RefreshCcwDot,Pen, FileText } from "lucide-react"
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
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/navigation"
export default function BlogContent() {
  const [mail, setMail] = useState([])
  const [error, setError] = useState([])
  const router = useRouter(); // Khởi tạo router
  // const router = useRouter()
  // Định nghĩa hàm fetchData
  const fetchDataMail = async () => {
    
    try {
        const adminToken = Cookies.get("token");
        const response = await fetch('http://localhost:8000/api/dang-ky-nhan-tin/lich-su', {
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
          });
      if (response.ok) {
        const result = await response.json();
        setMail(result.list || []);
      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  }
  // Gọi fetchData trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDataMail();
    // Call the prop to expose fetchData
  }, [router]);
 
 

  const handleRefeshInfo = () => {
    router.push('/admin/information')
  }
 
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Cột input */}
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            value={""}
            // onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
        {/* Cột buttons */}
        <div className="flex justify-end space-x-2">
          <Button onClick={handleRefeshInfo} variant="blue">
            <FileText className="mr-2 h-4 w-4" />
            Trang nhận tin
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Nội dung</TableHead>
            <TableHead>Ngày</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mail.map((mails, index) => (
            <TableRow key={index} >
              <TableCell>{mails.id}</TableCell>
              <TableCell>{mails.title} </TableCell>
              <TableCell>{mails.content} </TableCell>
              <TableCell>{mails.date} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
      
    </div>
  )
}