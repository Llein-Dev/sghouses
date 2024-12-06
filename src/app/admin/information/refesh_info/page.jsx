"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Search, RefreshCcw, FileText } from "lucide-react"
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RefeshInfo() {
    const [deletedInfo, setDeletedInfo] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    // search với fetchdata base
    const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
    const [filteredInfo, setFilteredInfo] = useState([]); // Danh sách user sau khi lọc


    // hàm tiềm kiếm dựa trên dữ liệu được fetch
    const handleSearchChange = (event) => {
        const searchValue = event.target.value; // Nhận giá trị tìm kiếm từ người dùng
        setSearchTerm(searchValue); // Cập nhật `searchTerm` với giá trị tìm kiếm mới

        const filtered = deletedInfo.filter((info) => {
            const lowerCaseSearchValue = searchValue.toLowerCase().trim();
            // Tạo chuỗi kết hợp chứa tên, số điện thoại, ID và email để tìm kiếm toàn diện
            const combinedString = `${info.name.toLowerCase()} ${info.slug} ${info.id} ${info.status.toLowerCase()}`;
            // Kiểm tra xem chuỗi kết hợp có chứa giá trị tìm kiếm không
            return combinedString.includes(lowerCaseSearchValue);
        });
        setFilteredInfo(filtered);
    };


    // Định nghĩa hàm fetchDeletedInfo
    const fetchDeletedInfo = async () => {
        try {
            const adminToken = Cookies.get("token");
            const response = await fetch('http://localhost:8000/api/dang-ky-nhan-tin/list_delete', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setDeletedInfo(result.list || []);
                console.log(result);
                console.log(deletedInfo); // Kiểm tra dữ liệu


            } else {
                setDeletedInfo([])
                setError('Không có quyền truy cập');
            }
        } catch (error) {
            setDeletedInfo([])
            setError('Không thể truy cập dữ liệu');
        }
    };

    // Gọi fetchDeletedInfo trong useEffect khi trang load lần đầu
    useEffect(() => {
        const adminToken = Cookies.get('token');
        if (!adminToken) {
            router.push('/');
            return;
        }
        fetchDeletedInfo(); // Gọi hàm fetchDeletedInfo
    }, [router]);

    useEffect(() => {
        setFilteredInfo(deletedInfo); // Cập nhật  mỗi khi users thay đổi
    }, [deletedInfo]);



    const handleRefesh = async (id) => {
        const adminToken = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:8000/api/dang-ky-nhan-tin/restore/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                await response.json(); // Đợi dữ liệu trả về
                toast.success('Cập nhật thành công')
                fetchDeletedInfo(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang

            } else {
                fetchDeletedInfo()
                const errorData = await response.json();
                setError(errorData.message || "Lỗi khi khôi phục người dùng");
            }
        } catch (error) {
            console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
        }
    };

    const handleReturn = () => {
        router.push('/admin/information')
    }
    return (

        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-gray-500" />
                    <Input
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="max-w-sm"
                    />
                </div>
                <Button onClick={handleReturn} variant="blue">
                    <FileText className="mr-2 h-4 w-4" />
                    Danh mục tin  nhận
                </Button>
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
                    {
                        filteredInfo.length > 0 ? (
                            filteredInfo.map((info, index) => (
                                <TableRow key={index}>
                                    <TableCell>{info.id}</TableCell>
                                    <TableCell>{info.email}</TableCell>
                                    <TableCell>{info.status}</TableCell>
                                    <TableCell>{info.date_delete}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="icon" onClick={() => handleRefesh(info.id)}>
                                                <RefreshCcw className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500">
                                    Danh sách trống
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <ToastContainer />
        </div>

    );
}