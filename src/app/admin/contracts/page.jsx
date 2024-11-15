"use client"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"
import { Search, FileText, Eye, Download, Trash2, BookCopy, Link, Pencil, Book, Plus } from "lucide-react"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Label } from "recharts"


export default function Contract() {
  const [Contracts, setContracts] = useState([])
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
        const response = await fetch('http://localhost:8000/api/hop-dong/all', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const result = await response.json();
          // Kiểm tra nếu list_cate_blog là mảng hợp lệ
          if (result && Array.isArray(result)) {
            setContracts(result);
            console.log("Dữ liệu trả về từ API:", result);
          } else {
            // Nếu không phải mảng, gán mảng rỗng và log thông báo lỗi
            setContracts([]);
            console.error("list_cate_blog không phải là mảng hợp lệ.");
          }
        } else {
          // Xử lý khi không có quyền truy cập hoặc response không thành công
          setError('Không có quyền truy cập');
          console.error('Không có quyền truy cập API');
        }
      } catch (error) {
        // Xử lý khi có lỗi trong quá trình fetch
        setError('Không thể truy cập dữ liệu');
        console.error('Lỗi khi fetch dữ liệu:', error);
      }
    };
    fetchDataContracts();
  }, [router]);


  const handleDeleteContracts = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/hop-dong/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
        setContracts((prevContracts) => prevContracts.filter(contracts => contracts.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi xóa người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleRefesh = () => {
    router.push('/admin/contracts/refesh_contracts')
  }

  return (
    <div className="space-y-4">
   <div className="flex justify-between items-center">
  {/* Cột chứa thanh tìm kiếm */}
  <div className="flex items-center space-x-2 w-1/2">
    <Search className="h-5 w-5 text-gray-500" />
    <Input
      placeholder="Search contracts..."
      className="max-w-sm"
      // value={searchTerm}
      // onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  
  {/* Cột chứa 2 nút Refesh và Thêm Danh Mục */}
  <div className="flex items-center space-x-4 w-1/2 justify-end">
    {/* Nút Thêm Danh Mục và Modal */}
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue" className="bg-green-700 text-white hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" />
          Thêm Danh Mục
        </Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Cate Blog</DialogTitle>
          <DialogDescription>
            Add a Cate Blog account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="phone"
              // value={slug}
              // onChange={(e) => setSlug(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="born" className="text-right">
              Born
            </Label>
            <Input
              id="born"
              type="born"
              // value={status}
              // onChange={(e) => setStatus(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button">Thêm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

       {/* khôi phục Danh Mục tin tức */}
    <Button variant="blue"  onClick={handleRefesh}>
      <FileText className="mr-2 h-4 w-4" />
      Refesh Contract
    </Button>
  </div>
</div>


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Phòng</TableHead>
            <TableHead>Id người sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày bắt đầu</TableHead>
            <TableHead>Ngày kết thúc</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Contracts.map((contracts, index) => (
            <TableRow key={index}>
              <TableCell>{contracts.id_room}</TableCell>
              <TableCell>{contracts.id_user}</TableCell>
              <TableCell>{contracts.status}</TableCell>
              <TableCell>{contracts.date_start}</TableCell>
              <TableCell>{contracts.date_end}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {/* Nút Gọi điện */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" >
                        <Pencil className="mr-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Cate BLog</DialogTitle>
                        <DialogDescription>
                          Edit a Cate Blog account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="phone"
                            // value={slug}
                            // onChange={(e) => setSlug(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="born" className="text-right">
                            Born
                          </Label>
                          <Input
                            id="born"
                            type="born"
                            // value={status}
                            // onChange={(e) => setStatus(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit"  >Add User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>




                  <Button variant="outline" size="icon" onClick={() => handleDeleteContracts(contracts.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}