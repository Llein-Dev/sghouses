import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table } from 'lucide-react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const OverdueInvoices = ({ hoa_don_tre_han }) => {
    const [hoadontrehen, setHoadontrehen] = useState([]);
    
    useEffect(() => {
        const updatedHoadontrehen = hoa_don_tre_han.map((invoice) => {
            // Parse the date string into a Date object
            const date = parseDate(invoice.date);

            // Calculate the difference in days
            const today = new Date();
            const diffTime = today - date;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

            return {
                ...invoice,
                overdueDays: isNaN(diffDays) ? 0 : diffDays, // Set to 0 if NaN
            };
        });

        setHoadontrehen(updatedHoadontrehen);
    }, [hoa_don_tre_han]);

    const parseDate = (dateString) => {
        // Split date string into parts
        const parts = dateString.split(' lúc ');
        const datePart = parts[0]; // Get the date part

        // Map Vietnamese month names to numbers
        const monthMap = {
            "Tháng 1": "01",
            "Tháng 2": "02",
            "Tháng 3": "03",
            "Tháng 4": "04",
            "Tháng 5": "05",
            "Tháng 6": "06",
            "Tháng 7": "07",
            "Tháng 8": "08",
            "Tháng 9": "09",
            "Tháng 10": "10",
            "Tháng 11": "11",
            "Tháng 12": "12"
        };

        // Replace the month name with the corresponding number
        for (const [key, value] of Object.entries(monthMap)) {
            if (datePart.includes(key)) {
                datePart.replace(key, value);
                break;
            }
        }

        // Create a standard date string (YYYY-MM-DD)
        const [day, month] = datePart.split(' ');
        const year = new Date().getFullYear(); // Use the current year
        const standardDateString = `${year}-${monthMap[datePart.split(' ')[1]]}-${day.padStart(2, '0')}`;

        return new Date(standardDateString);
    };

    const getRowColor = (days) => {
        if (days <= 5) return 'bg-red-500'; // Overdue by 5 days or less
        if (days <= 10) return 'bg-orange-500'; // Overdue by 6 to 10 days
        if (days <= 15) return 'bg-yellow-500'; // Overdue by 11 to 15 days
        return 'bg-gray-500'; // More than 15 days overdue
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Hóa đơn trễ hẹn</CardTitle>
                <CardDescription>Danh sách hóa đơn trễ hẹn!</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID hợp đồng</TableHead>
                            <TableHead>Ảnh</TableHead>
                            <TableHead>Tên người dùng</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Giá đặt phòng</TableHead>
                            <TableHead>Ngày trễ</TableHead> {/* New column for overdue days */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hoadontrehen.map((invoice) => (
                            <TableRow key={invoice.token} className={getRowColor(invoice.overdueDays)}>
                                <TableCell>{invoice.hop_dong_id}</TableCell>
                                <TableCell>
                                    <img
                                        style={{ height: "50px", width: "50px", objectFit: "cover", borderRadius: "50%" }}
                                        src={`REACT_APP_IMAGE_ERROR/${invoice.avatar_user}`}
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevents repeated calls to onError
                                            e.target.src = "https://vnsteelthanglong.vn/core/img/default_image.png"; // Default image path
                                        }}
                                        alt="Avatar"
                                    />
                                </TableCell>
                                <TableCell>{invoice.name_user}</TableCell>
                                <TableCell>{invoice.email_user}</TableCell>
                                <TableCell>{invoice.total}</TableCell>
                                <TableCell>{invoice.overdueDays} ngày</TableCell> {/* Display overdue days */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default OverdueInvoices;
