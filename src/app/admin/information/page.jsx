"use client"
import { useEffect, useState } from "react"
import { Search, FileText, Trash2 } from "lucide-react"
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
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Infomation() {
    const [infomation, setInfo] = useState([])
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(5); // Số lượng mục mỗi trang
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm


    useEffect(() => {
        const adminToken = Cookies.get('token');
        if (!adminToken) {
            router.push('/');
            return;
        }
        // fetch dữ liệu user

        const fetchDataInfo = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/dang-ky-nhan-tin', {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    // Kiểm tra nếu list_cate_info là mảng hợp lệ
                    if (result && Array.isArray(result.list)) {
                        setInfo(result.list);
                        console.log("Dữ liệu trả về từ API:", result.list);
                    } else {
                        setInfo([]);
                        console.error("list không phải là mảng hợp lệ.");
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


        fetchDataInfo();
    }, [router]);

    const handleDeleteInfo = async (id) => {
        const adminToken = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:8000/api/dang-ky-nhan-tin/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });


            console.log('Delete response status:', response.status);

            if (response.ok) {
                toast.success('Xóa thành công')
                // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
                setInfo((prevInfo) => prevInfo.filter(info => info.id !== id));
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Lỗi khi xóa người dùng");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Có lỗi xảy ra khi xóa người dùng");
        }
    };



    //Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredInfo = Array.isArray(infomation)
        ? infomation.filter((info) =>
            `${info.name} ${info.slug} ${info.status}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        : []; // Nếu không phải mảng, trả về mảng rỗng
    const currentItems = filteredInfo.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(filteredInfo.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRefesh = () => {
        router.push('/admin/information/refesh_info')
    }
    const handleCreateMail = () => {
        router.push('/admin/information/create_mail')
    }
    return (
        <>
            <div className="space-y-4">
                    {/* Cột chứa thanh tìm kiếm */}
                    <div className="flex items-center justify-between w-full">
                        {/* Cột 1 */}
                        <div className="w-1/2 flex items-center space-x-4">
                            <Search className="h-5 w-5 text-gray-500" />
                            <Input
                                placeholder="Tìm kiếm..."
                                className="max-w-sm"
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Cột 2 */}
                        <div className="w-1/2 flex justify-end gap-4">
                            <Button onClick={handleRefesh} variant="blue">
                                <FileText className="mr-2 h-4 w-4" />
                                Khôi phục
                            </Button>
                            <Button onClick={handleCreateMail}  className="bg-green-700 text-white hover:bg-green-600">
                                <FileText className="mr-2 h-4 w-4" />
                                Gửi mail
                            </Button>
                        </div>
                    </div>




                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Ngày tháng</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(currentItems

                        ) && currentItems
                            .length > 0 ? (
                            currentItems
                                .map((info, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{info.id}</TableCell>
                                        <TableCell>{info.email}</TableCell>
                                        <TableCell>{info.status}</TableCell>
                                        <TableCell>{info.date}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="icon" onClick={() => handleDeleteInfo(info.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex justify-center  mt-4">
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
            </div>
            <ToastContainer />
        </>
    )
}