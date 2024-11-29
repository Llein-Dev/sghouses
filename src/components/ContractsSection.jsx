import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from 'lucide-react'
import PaymentButton from './payment-button'



export default function ContractPaymentSection({ apiUrl }) {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contract Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin hợp đồng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p><strong>ID Hợp đồng:</strong> {contractData.id}</p>
                            <p><strong>ID Phòng:</strong> {contractData.room_id}</p>
                            <p>
                                <strong>Thời gian thuê:</strong>
                                <span className="flex items-center mt-1">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {contractData.date_start} - {contractData.date_end}
                                </span>
                            </p>
                            <p><strong>Giá:</strong> {contractData.price ? `${contractData.price.toLocaleString()} VND` : 'Chưa có thông tin'}</p>
                            <p><strong>File đính kèm:</strong> {contractData.file ? 'Có file' : 'Không có file'}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin thanh toán</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ngày tạo</TableHead>
                                    <TableHead>Tổng tiền</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead>Chi tiết</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contractData.list_pay.map((payment, index) => (
                                    <TableRow key={payment.token}>
                                        <TableCell>{payment.ngay_tao}</TableCell>
                                        <TableCell>{payment.tong_tien.toLocaleString()} VND</TableCell>
                                        <TableCell>
                                            <Badge variant={payment.trang_thai === "Đã thanh toán" ? "success" : "warning"}>
                                                {payment.trang_thai}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <details>
                                                <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                                                    Xem chi tiết
                                                </summary>
                                                <div className="mt-2 text-sm">
                                                    <p><strong>Hình thức:</strong> {payment.hinh_thuc}</p>
                                                    <p><strong>Tiền thuê:</strong> {payment.tien_thue.toLocaleString()} VND</p>
                                                    <p><strong>Tiền điện:</strong> {payment.tien_dien.toLocaleString()} VND ({payment.so_ki_dien} kWh)</p>
                                                    <p><strong>Tiền nước:</strong> {payment.tien_nuoc.toLocaleString()} VND ({payment.so_khoi_nuoc} m³)</p>
                                                    <p><strong>Tiền xe:</strong> {payment.tien_xe.toLocaleString()} VND ({payment.so_luong_xe} xe)</p>
                                                    <p><strong>Tiền dịch vụ:</strong> {payment.tien_dich_vu.toLocaleString()} VND ({payment.so_luong_nguoi} người)</p>
                                                </div>
                                            </details>
                                        </TableCell>
                                        <TableCell>
                                            {payment.trang_thai !== "Đã thanh toán" && (
                                                <PaymentButton token={payment.token} apiUrl={apiUrl} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

