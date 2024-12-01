"use client"
import { useEffect, useState } from "react"
import { Search, FileText, Eye, Download, Trash2, BookCopy, Link, Pencil, Book, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedPreviewCards } from '@/components/PreviewCards';
import { Badge } from "@/components/ui/badge"


export default function Contract() {
  const [Contracts, setContracts] = useState([])
  const [selectedContract, setSelectedContract] = useState({
    id_room: "",
    id_user: "",
    status: "",
    date_start: "",
    date_end: "",
  });

  const router = useRouter()
  const [id_room, setIdRoom] = useState("");
  const [id_user, setIdUser] = useState("");
  const [status, setStatus] = useState("");
  const [date_start, setDateStart] = useState(""); // Ngày bắt đầu
  const [date_end, setDateEnd] = useState(""); // Ngày kết thúc
  const [date_end_option, setDateEndOption] = useState("default"); // Lựa chọn hạn hợp đồng
  const [custom_date_end, setCustomDateEnd] = useState(""); // Ngày tự chọn
  const calculateEndDate = (startDate, monthsToAdd) => {
    if (!startDate) return ""; // Nếu chưa chọn ngày bắt đầu, không tính
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date.toISOString().split("T")[0]; // Trả về định dạng YYYY-MM-DD
  };
  function formatDateToDDMMYYYY(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }
  const handleDateEndOptionChange = (e) => {
    const option = e.target.value;
    setDateEndOption(option);

    if (option === "1month") {
      setDateEnd(calculateEndDate(date_start, 1)); // Thêm 1 tháng
    } else if (option === "6months") {
      setDateEnd(calculateEndDate(date_start, 6)); // Thêm 6 tháng
    } else if (option === "1year") {
      setDateEnd(calculateEndDate(date_start, 12)); // Thêm 12 tháng
    } else if (option === "2years") {
      setDateEnd(calculateEndDate(date_start, 24)); // Thêm 24 tháng
    } else if (option === "3years") {
      setDateEnd(calculateEndDate(date_start, 36)); // Thêm 36 tháng
    } else if (option === "5years") {
      setDateEnd(calculateEndDate(date_start, 60)); // Thêm 60 tháng
    } else if (option === "custom") {
      setDateEnd(""); // Reset nếu là tùy chọn
    }
  };
  const adminToken = Cookies.get('token');
  const [rooms, setRooms] = useState(null)
  const [users, setUsers] = useState(null)


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
        setUsers(usersData.list);
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
  }, [])

  useEffect(() => {
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDataContracts();
  }, []);

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


  const handleAddContracts = async (e) => {
    e.preventDefault();

    const adminToken = Cookies.get("token");
    if (!adminToken) {
      toast.warning("vui lòng đăng nhập trước khi tạo blog !");
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


  const handleEditContracts = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/hop-dong/edit/${selectedContract.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedContract),
      });

      if (response.ok) {
        toast.success("Xóa thành công!");

        // Fetch updated contracts list after successful edit
        await fetchDataContracts();

      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lỗi khi cập nhật hợp đồng");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Lỗi không xác định");
    } finally {
      // Always reset form after attempt to edit, regardless of success or failure
      setSelectedContract({
        id: "",
        id_room: "",
        id_user: "",
        status: "",
        date_start: "",
        date_end: "",
      });
    }
  };




  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRoomChange = (e) => {
    const selectedRoomId = e.target.value;
    const room = rooms?.find((room) => room?.id === parseInt(selectedRoomId));
    setSelectedRoom(room || null); // Set selected room or null if not found
  };

  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    const user = users?.find((user) => user?.id === parseInt(selectedUserId));
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
              <Button onClick={() => {
                handleRoomChange({ target: { value: id_room } });
                handleUserChange({ target: { value: id_user } });
              }} variant="blue" className="bg-green-700 text-white hover:bg-green-600">
                <Plus className="mr-2 h-4 w-4" />
                Thêm Danh Mục
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80vw]">
              <DialogHeader>
                <DialogTitle>Thêm hợp đồng</DialogTitle>
                <DialogDescription>
                  Thêm hợp đồng vào với đủ các thông tin để quản lý cụ thể!
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 h-[70vh] overflow-y-auto md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="roomName" className="text-right">
                          Chọn phòng
                        </Label>
                        <select
                          id="roomName"
                          value={id_room || ""} // Ensure it is controlled
                          onChange={(e) => {
                            handleRoomChange(e);
                            setIdRoom(e.target.value);
                          }}
                          className="border rounded px-3 py-2 w-full"
                          required // Add required for validation
                        >
                          <option value="">Chọn Phòng</option>
                          {rooms?.map((room) => (
                            <option
                              key={room.id}
                              value={room.id}
                              className={room.trang_thai === "Đang cho thuê" ? "bg-red-600 text-white" : ""}
                            >
                              {room.ten_phong} - {room.trang_thai}
                            </option>


                          ))}
                        </select>

                      </div>
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="userName" className="text-right">
                          Tên người dùng
                        </Label>
                        <select
                          id="userName"
                          value={id_user || ""} // Ensure it is controlled
                          onChange={(e) => {
                            handleUserChange(e);
                            setIdUser(e.target.value);
                          }}
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
                      {/* <div className="flex flex-col items-start gap-4">
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
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="date-start" className="">
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
                      {/* Hạn hợp đồng */}
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="date-end" className="">
                          Hạn hợp đồng
                        </Label>
                        <select
                          id="date-end-select"
                          value={date_end_option}
                          onChange={handleDateEndOptionChange}
                          className="border rounded px-3 py-2 w-full"
                        >
                          <option value="default" disabled>
                            Chọn hạn hợp đồng
                          </option>
                          <option value="1month">1 tháng</option>
                          <option value="6months">6 tháng</option>
                          <option value="1year">1 năm</option>
                          <option value="2years">2 năm</option>
                          <option value="3years">3 năm</option>
                          <option value="5years">5 năm</option>
                          <option value="custom">Tự chọn</option>
                        </select>

                        {date_end_option === "custom" && (
                          <Input
                            id="date-end-custom"
                            type="date"
                            value={custom_date_end}
                            onChange={(e) => setCustomDateEnd(e.target.value)}
                            className="col-span-3"
                          />
                        )}
                      </div>

                      {/* Hiển thị ngày kết thúc */}
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="date-display" className="">
                          Ngày kết thúc
                        </Label>
                        <Input
                          id="date-display"
                          type="text"
                          value={formatDateToDDMMYYYY(date_end_option === "custom" ? custom_date_end : date_end)}
                          readOnly
                          className="col-span-3 bg-gray-200"
                        />
                      </div>

                    </div>

                  </CardContent>
                </Card>

                <div className="space-y-4 col-span-2">
                  <EnhancedPreviewCards selectedRoom={selectedRoom} selectedUser={selectedUser} />

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
            Khôi phục
          </Button>
        </div >
      </div >
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
          {Array.isArray(Contracts) && Contracts.map((contract, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell> {/* STT */}
              <TableCell>{contract.id}</TableCell> {/* Mã hợp đồng */}
              <TableCell>{`${contract.name_room} - ${contract.name_building}`}</TableCell> {/* Tên phòng - Tòa nhà */}
              <TableCell>{contract.name_user}</TableCell> {/* Tên Người Dùng */}
              <TableCell>
                {contract.date_start}
              </TableCell>
              <TableCell>
                <Badge
                  variant={contract.status === 'Hết hạn' ? 'success' : 'destructive'}
                >
                  {contract.status}
                </Badge>

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
                          handleRoomChange({ target: { value: contract.id_room } });
                          handleUserChange({ target: { value: contract.id_user } });
                        }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[80vw]">
                      <DialogHeader>
                        <DialogTitle>Sửa Thông Tin Hợp Đồng</DialogTitle>
                        <DialogDescription>Chỉnh sửa thông tin hợp đồng thuê phòng.</DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleEditContracts}>
                        <div className="grid grid-cols-1 h-[70vh] overflow-y-auto md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Thông tin</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {/* Room */}
                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="roomName">Tên Phòng</Label>
                                  <select
                                    id="roomName"
                                    value={selectedContract.id_room}
                                    onChange={(e) => {
                                      handleRoomChange(e);
                                      setSelectedContract({
                                        ...selectedContract,
                                        id_room: parseInt(e.target.value),
                                      })
                                    }
                                    }
                                    className="border rounded px-3 py-2 w-full"
                                    required
                                  >
                                    <option value="">Chọn Phòng</option>
                                    {rooms?.map((room) => (
                                      <option key={room.id} value={room.id}>
                                        {room.ten_phong}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* User */}
                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="userName">Tên khách hàng</Label>
                                  <select
                                    id="userName"
                                    value={selectedContract.id_user}
                                    onChange={(e) => {
                                      handleUserChange(e);
                                      setSelectedContract({
                                        ...selectedContract,
                                        id_user: parseInt(e.target.value),
                                      })
                                    }
                                    }
                                    className="border rounded px-3 py-2 w-full"
                                    required
                                  >
                                    <option value="">Chọn khách hàng</option>
                                    {users?.map((user) => (
                                      <option key={user.id} value={user.id}>
                                        {user.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Status */}
                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="status">Trạng thái</Label>
                                  <Input
                                    id="status"
                                    type="text"
                                    value={selectedContract.status}
                                    onChange={(e) =>
                                      setSelectedContract({ ...selectedContract, status: e.target.value })
                                    }
                                    required
                                  />
                                </div>

                                {/* Date Start */}
                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="date_start">Ngày bắt đầu</Label>
                                  <Input
                                    id="date_start"
                                    type="date"
                                    value={selectedContract.date_start}
                                    onChange={(e) =>
                                      setSelectedContract({ ...selectedContract, date_start: e.target.value })
                                    }
                                    required
                                  />
                                </div>

                                {/* Date End */}
                                <div className="flex flex-col items-start gap-4">
                                  <Label htmlFor="date_end">Ngày kết thúc</Label>
                                  <Input
                                    id="date_end"
                                    type="date"
                                    value={selectedContract.date_end}
                                    onChange={(e) =>
                                      setSelectedContract({ ...selectedContract, date_end: e.target.value })
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <div className="space-y-4 col-span-2">
                            <EnhancedPreviewCards selectedRoom={selectedRoom} selectedUser={selectedUser} />

                          </div>
                        </div>

                        <DialogFooter>
                          <Button type="submit" variant="orange">
                            Cập nhật
                          </Button>
                        </DialogFooter>
                      </form>



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
      <ToastContainer />
    </div >
  )
}