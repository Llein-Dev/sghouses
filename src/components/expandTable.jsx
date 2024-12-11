'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Cookies from 'js-cookie'
import { Dialog, DialogTrigger } from './ui/dialog'

export default function ExpandableTable({ items, handleDeleteContactRoom }) {
    const [expandedRoomId, setExpandedRoomId] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);
    const token = Cookies.get('token');

    const toggleExpand = async (item) => {
        // If the room is already expanded, collapse it by setting expandedRoomId to null
        if (expandedRoomId === item.id) {
            setExpandedRoomId(null);
            setRoomDetails(null); // Clear room details when collapsing
            return;
        }

        setExpandedRoomId(item.id); // Set the new expanded room ID

        try {
            const response = await fetch(`http://localhost:8000/api/phong/${item.id_room}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Failed to fetch room details: ${errorDetails.message || response.statusText}`);
            }

            const data = await response.json();
            setRoomDetails(data);
        } catch (error) {
            console.error('Error fetching room details:', error.message);
        }
    }

    return (
        <div className="overflow-x-auto md:w-full w-[75vw]">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Phòng</TableHead>
                        <TableHead>Số điện thoại</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <React.Fragment key={item.id}> {/* Use a unique key for the fragment */}
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center space-x-2">
                                        <Avatar>
                                            <AvatarImage src={item.avatar_user} alt={item.name} />
                                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{item.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{item.name_room}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleDeleteContactRoom(item.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleExpand(item)}
                                    >
                                        {expandedRoomId === item.id ? ( // Check if the current item is expanded
                                            <ChevronUpIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        )}
                                    </Button>



                                </TableCell>
                            </TableRow>
                            {expandedRoomId === item.id && roomDetails ? ( // Show details if this room is expanded
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="flex-1">
                                                <p className="text-gray-700 p-2 bg-gray-50">{item.content}</p>
                                                <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</span>
                                            </div>
                                            <div className=''>
                                                <div className="flex flex-col items-center mb-4">
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_PATH_FILE}${roomDetails.image.split(';')[0]}`} // Thêm đường dẫn
                                                        alt={roomDetails.name}
                                                        className="w-full h-40 object-cover rounded-lg" // Điều chỉnh kích thước hình ảnh
                                                    />
                                                </div>

                                                <div className="text-sm grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">Tòa nhà:</span>
                                                        <span>{roomDetails.ten_toa_nha}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">Khu vực:</span>
                                                        <span>{roomDetails.ten_khu_vuc}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">Diện tích:</span>
                                                        <span>{roomDetails.dien_tich} m²</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">Giá thuê:</span>
                                                        <span>{roomDetails.gia_thue.toLocaleString()} VND</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">Tiện ích:</span>
                                                        <span>{roomDetails.tien_ich}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">Nội thất:</span>
                                                        <span>{roomDetails.noi_that}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
