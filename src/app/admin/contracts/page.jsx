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
import { Label } from "@/components/ui/label"


export default function Contract() {
  const [Contracts, setContracts] = useState([])
  const [selectedContracts, setSelectedContract] = useState(null); // State cho user cần chỉnh sửa
  const router = useRouter()
  const [id_room, setIdRoom] = useState("");
  const [id_user, setIdUser] = useState("");
  const [status, setStatus] = useState("");
  const [date_start, setDateStart] = useState("");
  const [date_end, setDateEnd] = useState("");


  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
  
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
          if (Array.isArray(result)) {
            setContracts(result); // Đảm bảo chỉ set khi result là mảng
          } else {
            setContracts([]); // Nếu không, đặt là mảng rỗng
            console.error("Dữ liệu trả về không phải mảng:", result);
          }
        } else {
          console.error('Lỗi khi gọi API');
          setContracts([]); // Đặt Contracts là mảng rỗng nếu có lỗi
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
        setContracts([]); // Đặt Contracts là mảng rỗng nếu có lỗi
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
 console.log(Contracts);
 
  const handleAddContracts = async (e) => {
    e.preventDefault();

    const adminToken = Cookies.get("token");
    if (!adminToken) {
      alert("Vui lòng đăng nhập trước khi tạo blog!");
      router.push("/");
      return;
    }

    const data = {
      id_room,
      id_user,
      status,
      date_start,
      date_end,
    };
    try {
      const response = await fetch("http://localhost:8000/api/hop-dong/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Thêm danh mục blog thành công!");
        setContracts(data);
        if (window.confirm("Thêm danh mục blog thành công! vui lòng đợi trong giây lát.")) {
          window.location.reload();
        }
      } else {
        const errorData = await response.json();
        toast.error(`Lỗi khi thêm danh mục: ${errorData.message || "Có lỗi xảy ra"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối API.");
    }
  };


  // Edit user
  const handleEditContracts = async () => {
    const adminToken = Cookies.get("token");
    if (!selectedContracts) return;

    const updatedContracts = {
      id_room,
      id_user,
      status,
      date_start,
      date_end,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/hop-dong/edit/${selectedContracts.id}`, {
        method: "PUT", // Sử dụng PUT để cập nhật thông tin người dùng
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContracts),
      });
      if (response.ok) {
        toast.success("Cập nhật thành công!");
        setContracts(Contracts.map(contracts => (contracts.id === selectedContracts.id ? updatedContracts : contracts)));
        setSelectedContract(null);
        setIdRoom("");
        setIdUser("");
        setStatus("");
        setDateStart("");
        setDateEnd("");
        router.refresh();  // Load lại trang sau khi cập nhật thành công
        alert('Đã cập nhật thành công')
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi cập nhật thông tin");
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
                <DialogTitle>Thêm hợp đồng</DialogTitle>
                <DialogDescription>
                  hãy thêm hợp đồng vào nhé !
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    ID Room
                  </Label>
                  <Input
                    id="id_room"
                    value={id_room}
                    onChange={(e) => setIdRoom(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    ID User
                  </Label>
                  <Input
                    id="phone"
                    type="phone"
                    value={id_user}
                    onChange={(e) => setIdUser(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="born" className="text-right">
                    Trạng thái
                  </Label>
                  <Input
                    id="born"
                    type="born"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="col-span-3"
                  />
                </div> */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-start" className="text-right ml-[-14px]">
                    Ngày bắt đầu
                  </Label>
                  <Input
                    id="date-start"
                    type="date"
                    value={date_start}
                    onChange={(e) => setDateStart(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-end" className="text-right ml-[-19px]">
                    Ngày kết thúc
                  </Label>
                  <Input
                    id="date-end"
                    type="date"
                    value={date_end}
                    onChange={(e) => setDateEnd(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddContracts} type="button">Thêm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* khôi phục Danh Mục tin tức */}
          <Button variant="blue" onClick={handleRefesh}>
            <FileText className="mr-2 h-4 w-4" />
            Refesh Contract
          </Button>
        </div>
      </div>
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead>STT</TableHead>
      <TableHead>Mã hợp đồng</TableHead>
      <TableHead>Tên phòng - Tòa nhà</TableHead>
      <TableHead>Tên Người Dùng</TableHead>
      <TableHead>Thời Hạn Thuê</TableHead>
      <TableHead>Ngày lập</TableHead>
      <TableHead>Chức Năng</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {Contracts.map((contract, index)  => (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell> {/* STT */}
        <TableCell>{contract.id}</TableCell> {/* Mã hợp đồng */}
        <TableCell>{`${contract.roomName} - ${contract.buildingName}`}</TableCell> {/* Tên phòng - Tòa nhà */}
        <TableCell>{contract.userName}</TableCell> {/* Tên Người Dùng */}
        <TableCell>
          {contract.date_start}
        </TableCell> {/* Thời Hạn Thuê */}
        <TableCell>
          {contract.status === "active" ? (
            <span className="text-green-500">Đang thuê</span>
          ) : (
            <span className="text-red-500">Hết hạn</span>
          )}
        </TableCell> {/* Trạng Thái */}
        <TableCell>
          <div className="flex space-x-2">
            {/* Nút Chỉnh Sửa */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedContract(contract);
                    setIdRoom(contract.roomName);
                    setIdUser(contract.userName);
                    setStatus(contract.status);
                    setDateStart(contract.date_start);
                    setDateEnd(contract.date_end);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sửa Thông Tin Hợp Đồng</DialogTitle>
                  <DialogDescription>
                    Chỉnh sửa thông tin hợp đồng thuê phòng.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomName" className="text-right">
                      Tên Phòng
                    </Label>
                    <Input
                      id="roomName"
                      value={id_room}
                      onChange={(e) => setIdRoom(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="userName" className="text-right">
                      Người Dùng
                    </Label>
                    <Input
                      id="userName"
                      value={id_user}
                      onChange={(e) => setIdUser(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Trạng Thái
                    </Label>
                    <Input
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date_start" className="text-right">
                      Ngày Bắt Đầu
                    </Label>
                    <Input
                      id="date_start"
                      value={date_start}
                      onChange={(e) => setDateStart(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date_end" className="text-right">
                      Ngày Kết Thúc
                    </Label>
                    <Input
                      id="date_end"
                      value={date_end}
                      onChange={(e) => setDateEnd(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleEditContracts}>
                    Sửa
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Nút Xóa */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDeleteContracts(contract.id)}
            >
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