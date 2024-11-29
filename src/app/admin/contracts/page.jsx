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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedPreviewCards } from '@/components/PreviewCards';


export default function Contract() {
  const [Contracts, setContracts] = useState([])
  const [selectedContracts, setSelectedContract] = useState(null); // State cho user cần chỉnh sửa
  const router = useRouter()
  const [id_room, setIdRoom] = useState("");
  const [id_user, setIdUser] = useState("");
  const [status, setStatus] = useState("");
  const [date_start, setDateStart] = useState("");
  const [date_end, setDateEnd] = useState("");
  const adminToken = Cookies.get('token');
  const [rooms, setRooms] = useState(null)
  const [users, setUserss] = useState(null)
  console.log(users);
  console.log(rooms);

  useEffect(() => {
    const fetchRoomsAndUsers = async () => {
      try {
        // Fetch rooms
        const roomsResponse = await fetch('http://localhost:8000/api/phong', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        const roomsData = await roomsResponse.json();
        setRooms(roomsData.list_room);

        // Fetch users
        const usersResponse = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        const usersData = await usersResponse.json();
        setUserss(usersData.list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRoomsAndUsers();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const roomRes = await fetch(`http://localhost:8000/api/rooms/${selectedContracts.id}`)
        const roomData = await roomRes.json()
        setRooms(roomData)

        const userRes = await fetch(`http://localhost:8000/api/users/${selectedContracts.id_user}`)
        const userData = await userRes.json()
        setUserss(userData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [selectedContracts])

  useEffect(() => {

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
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRoomChange = (e) => {
    const selectedRoomId = e.target.value;
    const room = rooms.find((room) => room.id === parseInt(selectedRoomId));
    setSelectedRoom(room || null); // Set selected room or null if not found
  };

  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    const user = users.find((user) => user.id === parseInt(selectedUserId));
    setSelectedUser(user || null); // Set selected user or null if not found
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
            <TableHead>Ngày lập</TableHead>
            <TableHead>Tình trạng </TableHead>
            <TableHead>Chức Năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Contracts?.map((contract, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell> {/* STT */}
              <TableCell>{contract.id}</TableCell> {/* Mã hợp đồng */}
              <TableCell>{`${contract.name_room} - ${contract.name_building}`}</TableCell> {/* Tên phòng - Tòa nhà */}
              <TableCell>{contract.name_user}</TableCell> {/* Tên Người Dùng */}
              <TableCell>
                {contract.date_start}
              </TableCell>
              <TableCell>
                {contract.status}

              </TableCell> {/* Trạng Thái */}
              <TableCell>
                <div className="flex space-x-2">
                  {/* Nút Chỉnh Sửa */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedContract(contract);
                          setIdRoom(contract.roomName);
                          setIdUser(contract.userName);
                          setStatus(contract.status);
                          setDateStart(contract.date_start);
                          setDateEnd(contract.date_end);
                          // Gọi trực tiếp các hàm xử lý
                          handleRoomChange({ target: { value: contract.id_room } });
                          handleUserChange({ target: { value: contract.id_user } });
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[80vw]">
                      <DialogHeader>
                        <DialogTitle>Sửa Thông Tin Hợp Đồng</DialogTitle>
                        <DialogDescription>
                          Chỉnh sửa thông tin hợp đồng thuê phòng.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Thông tin</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <form onSubmit={handleEditContracts}>
                              <div className="space-y-4">
                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="roomName" className="text-start">
                                    Tên Phòng
                                  </Label>
                                  <select
                                    id="roomName"
                                    value={contract.id_room || ""} // Ensure it is controlled
                                    onChange={handleRoomChange}
                                    className="border rounded px-3 py-2 w-full"
                                    required // Add required for validation
                                  >
                                    <option value="">Chọn Phòng</option>
                                    {rooms?.map((room) => (
                                      <option key={room.id} value={room.id}>
                                        {room.ten_phong}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="userName" className="text-start">
                                    Tên khách hàng
                                  </Label>
                                  <select
                                    id="userName"
                                    value={contract.id_user || ""} // Ensure it is controlled
                                    onChange={handleUserChange}
                                    className="border rounded px-3 py-2 w-full"
                                    required // Add required for validation
                                  >
                                    <option value="">Chọn khách hàng</option>
                                    {users?.map((user) => (
                                      <option key={user.id} value={user.id}>
                                        {user.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="status" className="text-start">
                                    Trạng thái
                                  </Label>
                                  <Input
                                    id="status"
                                    type="text" // Specify the type
                                    value={contract.status}
                                    onChange={(e) => setContracts({ ...contract, status: e.target.value })}
                                    required // Add required for validation
                                  />
                                </div>

                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="date_start" className="text-start">
                                    Ngày bắt đầu
                                  </Label>
                                  <Input
                                    id="date_start"
                                    type="date"
                                    value={contract.date_start}
                                    onChange={(e) => setContracts({ ...contract, date_start: e.target.value })}
                                    required // Add required for validation
                                  />
                                </div>

                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="date_end" className="text-start">
                                    Ngày kết thúc
                                  </Label>
                                  <Input
                                    id="date_end"
                                    type="date"
                                    value={contract.date_end}
                                    onChange={(e) => setContracts({ ...contract, date_end: e.target.value })}
                                    required // Add required for validation
                                  />
                                </div>

                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="pdfUpload" className="text-start">
                                    File scan hồ sơ
                                  </Label>
                                  <Input
                                    id="pdfUpload"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(e)}
                                    required // Add required for validation
                                  />
                                </div>

                                <button type="submit" className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                                  Cập nhật hợp đồng
                                </button>
                              </div>
                            </form>

                          </CardContent>
                        </Card>

                        <div className="space-y-4 col-span-2">
                          <EnhancedPreviewCards selectedRoom={selectedRoom} selectedUser={selectedUser} />

                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" variant="orange" onClick={() => handleEditContracts(contract.id)}>
                          Cập nhật
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