'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User, Send, Zap, Droplet, Phone, Calendar, FileText } from "lucide-react";
import Breadcrumb from './breadcum'

const roomsData = [
  { id: 1, id_room: '101', status: 'vacant', id_user: 'U001', name: 'Nguyen Van A', content: 'Quan tâm đến phòng trọ này', phone: '0123456789' },
  { id: 2, id_room: '102', status: 'vacant', id_user: 'U002', name: 'Tran Thi B', content: 'Cần biết thêm chi tiết', phone: '0987654321' },
  { id: 3, id_room: '103', status: 'occupied', id_user: 'U003', name: 'Le Van C', content: '', phone: '' },
  // More room data...
]
export function RoomManagement() {
  const [activeTab, setActiveTab] = useState('contacts')
  const ContactsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {roomsData
        .filter(room => room.status === 'vacant')
        .map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Phòng {room.id_room}</span>
                <Badge variant="secondary">Trống</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <div>
                <span className='flex items-center gap-2'><User className="h-4 w-4" /><strong>Tên:</strong></span>
                <div className='ml-6 text-sm mt-1'>{room.name}</div>
              </div>
              <div>
                <span className='flex items-center gap-2'> <Phone className="h-4 w-4" /><strong>Điện thoại:</strong></span>
                <div className='ml-6 text-sm mt-1'>{room.phone}</div>
              </div>
              <div>
                <span className='flex items-center gap-2'> <Calendar className="h-4 w-4" /><strong>Ngày gửi:</strong></span>
                <div className='ml-6 text-sm mt-1'>{room.created_at}</div>
              </div>
              <div>
                <span className='flex items-center gap-2'> <Home className="h-4 w-4" /><strong>Nội dung:</strong></span>
                <div className='ml-6 text-sm mt-1'>{room.content}</div>
              </div>
            </CardContent>

            <CardFooter>

            </CardFooter>
          </Card>
        ))}
    </div>
  )
  const ProfilesTab = () => (
    <div className="grid grid-cols-1 gap-4">
      {roomsData
        .filter(room => room.status === 'vacant')
        .map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Phòng {room.id_room}</span>
                <Badge variant="secondary">Phòng có hồ sơ</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <div>
                <span className='flex items-center gap-2'>
                  <User className="h-4 w-4" />
                  <strong>Tên:</strong>
                </span>
                <div className='ml-6 text-sm mt-1'>{room.user?.name}</div> {/* Thay đổi ở đây để hiển thị tên người dùng */}
              </div>
              <div>
                <span className='flex items-center gap-2'>
                  <Calendar className="h-4 w-4" />
                  <strong>Ngày gửi:</strong>
                </span>
                <div className='ml-6 text-sm mt-1'>{room.created_at}</div>
              </div>
              <div>
                <span className='flex items-center gap-2'>
                  <FileText className="h-4 w-4" /> {/* Thêm biểu tượng cho file PDF */}
                  <strong>Hồ sơ PDF:</strong>
                </span>
                <div className='ml-6 text-sm mt-1'>
                  <a href={room.pdf_url} target="_blank" rel="noopener noreferrer">
                    Tải hồ sơ
                  </a> {/* Liên kết đến file PDF */}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              {/* Bạn có thể thêm nội dung footer nếu cần */}
            </CardFooter>
          </Card>
        ))}
    </div>
  );


  const CurrentRoomTab = () => (
    <Card className="border-none w-full">

    </Card>
  )

  return (
    (<div className="container mx-auto px-4 space-y-4 pt-4">
      <Breadcrumb />
      <Tabs value={activeTab} className='bg-white p-2 shadow space-y-4 rounded' onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">Liên hệ</TabsTrigger>
          <TabsTrigger value="profiles">Hồ sơ</TabsTrigger>
          <TabsTrigger value="current">Hợp đồng</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <ContactsTab />
        </TabsContent>
        <TabsContent value="profiles">
          <ProfilesTab />
        </TabsContent>
        <TabsContent value="current">
          <CurrentRoomTab />
        </TabsContent>
      </Tabs>
    </div>)
  );
}